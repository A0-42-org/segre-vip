import { auth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";
import { redirect, error } from "@sveltejs/kit";

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/editor', '/settings', '/analytics', '/create'];

const authGuard: Handle = async ({ event, resolve }) => {
  const pathname = event.url.pathname;

  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const session = await event.locals.auth.api.getSession({
      headers: event.request.headers
    });

    if (!session) {
      // Redirect to login with return URL
      const returnTo = encodeURIComponent(pathname);
      throw redirect(302, `/login?returnTo=${returnTo}`);
    }

    // Attach session to locals for use in load functions
    event.locals.session = session;
  }

  return resolve(event);
};

export const handle: Handle = sequence(
  authGuard,
  async ({ event, resolve }) => {
    event.locals.auth = auth;
    const response = await svelteKitHandler({
      auth,
      event,
      resolve,
      building: false,
    });
    return response;
  }
);
