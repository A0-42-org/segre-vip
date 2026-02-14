import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";
import { env } from "$env/dynamic/private";
import bcrypt from "bcryptjs";

// Optional: Skip email verification with environment variable
const skipEmailVerification = env.SKIP_EMAIL_VERIFICATION === "true";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    // Use environment variable to control email verification
    requireEmailVerification: !skipEmailVerification,
    autoSignInAfterSignUp: true,
    // Configure bcryptjs for password hashing and verification
    password: {
      hash: async (password: string) => {
        return await bcrypt.hash(password, 10);
      },
      verify: async ({ hash, password }: { hash: string; password: string }) => {
        return await bcrypt.compare(password, hash);
      },
    },
    sendResetPassword: async ({ user, url }: { user: any; url: string }) => {
      console.log("📧 PASSWORD RESET EMAIL", user.email, url);
    },
    sendVerificationEmail: async ({ user, url }: { user: any; url: string }) => {
      console.log("📧 VERIFICATION EMAIL", user.email, url);
    },
  },
  baseURL: env.BETTER_AUTH_URL || "http://localhost:5173",
  secret: env.BETTER_AUTH_SECRET,
});
