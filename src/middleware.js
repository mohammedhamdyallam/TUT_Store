// NextJs
import { NextResponse } from "next/server";

// Check user token
export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  console.log(req.nextUrl.pathname);

  if (req.nextUrl.pathname.startsWith("/api/users/profile/")) {
    if (!token) {
      return NextResponse.json(
        { message: "No token provided, access denied" },
        { status: 401 },
      );
    }
  }

  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register")
  ) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*", "/login", "/register"],
};
