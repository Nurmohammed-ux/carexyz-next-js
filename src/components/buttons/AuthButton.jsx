"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Swal from "sweetalert2";

const AuthButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-20 h-8 bg-base-300 animate-pulse rounded-md hidden sm:inline-block"></div>
    );
  }

  // যদি ইউজার লগইন করা থাকে (authenticated)
  if (status === "authenticated" || session) {
    const handleLogout = async () => {
      await signOut({ callbackUrl: "/login" });
      Swal.fire({
        icon: "success",
        title: "লগআউট সফল হয়েছে",
        timer: 1500,
        showConfirmButton: false,
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

  // যদি লগইন করা না থাকে (unauthenticated)
  return (
    <Link
      href="/login"
      className="btn btn-primary btn-outline px-6 py-2 btn-sm font-semibold text-base hidden sm:inline-flex"
    >
      Log In
    </Link>
  );
};

export default AuthButton;
