import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.SUPABASE_PROJECT_URL!,
    process.env.SUPABASE_API_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.delete(name);
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.delete({
            name,
            ...options,
          });
        },
      },
    }
  );

  // Get the pathname from the request
  const path = request.nextUrl.pathname;

  // Skip auth checks for API auth routes
  if (path.startsWith("/api/auth/")) {
    return response;
  }

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("session: ", session);

  // Define public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/register", "/terms", "/privacy"];
  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );

  // Define onboarding routes
  const onboardingRoutes = ["/onboarding"];
  const isOnboardingRoute = onboardingRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );

  // If the user is authenticated and trying to access login or register
  if (session && (path === "/login" || path === "/register" || path === "/")) {
    // Redirect to the dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is not authenticated and trying to access a protected route
  if (!session && !isPublicRoute && !isOnboardingRoute) {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
