import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";
import { env } from "$env/dynamic/private";

// Optional: Skip email verification with environment variable
const skipEmailVerification = env.SKIP_EMAIL_VERIFICATION === "true";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
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
