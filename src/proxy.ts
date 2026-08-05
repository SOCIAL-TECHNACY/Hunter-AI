import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Route proxy — Next.js 16+ convention.
 * Placeholder for future auth-protected routes.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Future: Uncomment and implement when Supabase Auth is enabled
  // const sessionCookie = request.cookies.get("sb-access-token");
  // if (!sessionCookie && pathname.startsWith("/admin")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
