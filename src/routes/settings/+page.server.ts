import { auth } from "$lib/auth";
import { db } from "$lib/db";
import { user, session } from "$lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { fail, redirect, error } from "@sveltejs/kit";
import { z } from "zod";
import type { PageServerLoad, Actions } from "./$types";

// Validation schemas
const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  image: z.string().url().optional().or(z.literal(""))
});

const emailSchema = z.object({
  email: z.string().email("Invalid email address")
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export const load: PageServerLoad = async ({ request }) => {
  const sessionData = await auth.api.getSession({ headers: request.headers });

  if (!sessionData || !sessionData.user) {
    throw redirect(302, "/login");
  }

  const userId = sessionData.user.id;

  // Load user sessions
  const sessions = await db
    .select({
      id: session.id,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent
    })
    .from(session)
    .where(eq(session.userId, userId))
    .orderBy(desc(session.createdAt));

  return {
    user: sessionData.user,
    sessions
  };
};

export const actions: Actions = {
  updateProfile: async ({ request, locals }) => {
    const sessionData = await auth.api.getSession({ headers: request.headers });
    if (!sessionData?.user?.id) {
      return fail(401, { error: "Unauthorized" });
    }

    const data = await request.formData();
    const name = data.get("name") as string;
    const image = data.get("image") as string;

    // Validate
    const result = profileSchema.safeParse({ name, image });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return fail(400, { error: "Validation failed", errors });
    }

    try {
      await db
        .update(user)
        .set({
          name: result.data.name,
          image: result.data.image || null,
          updatedAt: new Date()
        })
        .where(eq(user.id, sessionData.user.id));

      return { success: true, message: "Profile updated successfully" };
    } catch (error) {
      console.error("Profile update error:", error);
      return fail(500, { error: "Failed to update profile" });
    }
  },

  updateEmail: async ({ request, locals }) => {
    const sessionData = await auth.api.getSession({ headers: request.headers });
    if (!sessionData?.user?.id) {
      return fail(401, { error: "Unauthorized" });
    }

    const data = await request.formData();
    const email = data.get("email") as string;

    // Validate
    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return fail(400, { error: "Validation failed", errors });
    }

    try {
      // Check if email already exists
      const existingUser = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.email, result.data.email))
        .limit(1);

      if (existingUser.length > 0 && existingUser[0].id !== sessionData.user.id) {
        return fail(400, { error: "Email already in use" });
      }

      // Update email (note: BetterAuth handles email verification if configured)
      await db
        .update(user)
        .set({
          email: result.data.email,
          emailVerified: false,
          updatedAt: new Date()
        })
        .where(eq(user.id, sessionData.user.id));

      return { success: true, message: "Email updated. Please check your inbox for verification." };
    } catch (error) {
      console.error("Email update error:", error);
      return fail(500, { error: "Failed to update email" });
    }
  },

  updatePassword: async ({ request, locals }) => {
    const sessionData = await auth.api.getSession({ headers: request.headers });
    if (!sessionData?.user?.id) {
      return fail(401, { error: "Unauthorized" });
    }

    const data = await request.formData();
    const currentPassword = data.get("currentPassword") as string;
    const newPassword = data.get("newPassword") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    // Validate
    const result = passwordSchema.safeParse({ currentPassword, newPassword, confirmPassword });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return fail(400, { error: "Validation failed", errors });
    }

    try {
      // Use BetterAuth's password change functionality
      const authResult = await auth.api.changePassword({
        body: {
          newPassword: result.data.newPassword,
          currentPassword: result.data.currentPassword,
          revokeOtherSessions: true
        },
        headers: request.headers
      });

      // Check if response indicates error
      if (authResult instanceof Response) {
        const responseData = await authResult.json().catch(() => ({}));
        if (authResult.status >= 400) {
          return fail(400, { error: responseData.message || "Current password is incorrect" });
        }
      }

      return { success: true, message: "Password updated successfully" };
    } catch (error: any) {
      console.error("Password update error:", error);
      return fail(500, { error: error.message || "Failed to update password" });
    }
  },

  revokeSession: async ({ request }) => {
    const sessionData = await auth.api.getSession({ headers: request.headers });
    if (!sessionData?.user?.id) {
      return fail(401, { error: "Unauthorized" });
    }

    const data = await request.formData();
    const sessionId = data.get("sessionId") as string;

    if (!sessionId) {
      return fail(400, { error: "Session ID is required" });
    }

    // Don't allow revoking current session
    const currentSessionId = sessionData.session?.id;
    if (sessionId === currentSessionId) {
      return fail(400, { error: "Cannot revoke current session" });
    }

    try {
      await db
        .delete(session)
        .where(
          and(
            eq(session.id, sessionId),
            eq(session.userId, sessionData.user.id)
          )
        );

      return { success: true, message: "Session revoked successfully" };
    } catch (error) {
      console.error("Revoke session error:", error);
      return fail(500, { error: "Failed to revoke session" });
    }
  },

  deleteAccount: async ({ request, locals }) => {
    const sessionData = await auth.api.getSession({ headers: request.headers });
    if (!sessionData?.user?.id) {
      return fail(401, { error: "Unauthorized" });
    }

    const data = await request.formData();
    const confirmation = data.get("confirmation") as string;

    if (confirmation !== "DELETE") {
      return fail(400, { error: "Please type DELETE to confirm" });
    }

    try {
      // Delete user (cascade will delete sessions, pages, blocks, etc.)
      await db.delete(user).where(eq(user.id, sessionData.user.id));

      // Sign out
      await auth.api.signOut({
        headers: request.headers
      });

      throw redirect(302, "/");
    } catch (err) {
      if (err && typeof err === 'object' && 'status' in err) {
        throw err; // Re-throw redirects
      }
      console.error("Delete account error:", err);
      return fail(500, { error: "Failed to delete account" });
    }
  }
};
