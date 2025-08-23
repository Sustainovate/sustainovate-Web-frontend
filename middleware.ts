// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("uid")?.value;

  // Protected routes
  const protectedPaths = ["/profile", "/events", "/leaderboard"];
  const url = req.nextUrl.pathname;

  if (protectedPaths.includes(url) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/events", "/leaderboard"],
};
