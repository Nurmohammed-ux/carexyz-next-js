
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function proxy(req) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  const privateRoutes = [
    "/my-bookings",
    "/dashboard",
    "/booking",
  ];

  const isPrivate = privateRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!token && isPrivate) {
    const loginUrl = new URL("/login", req.url);

    // Preserve the requested path and its query parameters.
    loginUrl.searchParams.set(
      "callbackUrl",
      `${pathname}${req.nextUrl.search}`
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my-bookings/:path*",
    "/dashboard/:path*",
    "/booking/:path*",
  ],
};
