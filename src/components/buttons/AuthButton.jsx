"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const privateRoutes = ["/my-bookings", "/dashboard", "/booking"];

const isPrivateRoute = (pathname) =>
  privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

const AuthButton = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="w-20 h-8 bg-base-300 animate-pulse rounded-md hidden sm:inline-block" />
    );
  }

  if (status === "authenticated" && session) {
    const handleLogout = async () => {
      // Get the current URL, including query parameters.
      const query = window.location.search;
      const currentUrl = `${pathname}${query}`;

      const callbackUrl = isPrivateRoute(pathname)
        ? `/login?callbackUrl=${encodeURIComponent(currentUrl)}`
        : currentUrl;

      await signOut({
        callbackUrl,
      });
    };

    return (
      <button
        onClick={handleLogout}
        className="btn btn-primary btn-outline px-6 py-2 btn-sm font-semibold text-base hidden sm:inline-flex"
      >
        Logout
      </button>
    );
  }

  const loginUrl = isPrivateRoute(pathname)
    ? `/login?callbackUrl=${encodeURIComponent(pathname)}`
    : "/login";

  return (
    <Link
      href={loginUrl}
      className="btn btn-primary btn-outline px-6 py-2 btn-sm font-semibold text-base hidden sm:inline-flex"
    >
      Log In
    </Link>
  );
};

export default AuthButton;
