import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("cb_auth")?.value;
  const isLoginPage = request.nextUrl.pathname === "/login";

  // If not logged in and not on login page → redirect to login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If logged in and on login page → redirect to dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};