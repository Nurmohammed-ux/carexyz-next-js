"use client";

import Link from "next/link";
import NavLink from "../NavLink";
import Image from "next/image";
import AuthButton from "../buttons/AuthButton";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink href="/">হোম</NavLink>
      </li>
      <li>
        <NavLink href="/services">সকল সার্ভিস</NavLink>
      </li>
      <li>
        <NavLink href="/my-bookings">আমার বুকিং</NavLink>
      </li>
      <li>
        <NavLink href="/about">আমাদের সম্পর্কে</NavLink>
      </li>
      <li>
        <NavLink href="/contact">যোগাযোগ</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 lg:px-8">
      {/* Navbar Start: Mobile Menu & Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            aria-label="মেনু খুলুন"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 w-52 p-2 shadow-lg"
          >
            {links}
          </ul>
        </div>

        {/* Brand Logo */}
        <Link href="/" className="px-2">
          <Image
            src="/carexyzlogo.png"
            height={100}
            width={100}
            alt="Care.xyz Logo"
            priority
          />
        </Link>
      </div>

      {/* Navbar Center: Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
      </div>

      {/* Navbar End: Action Buttons */}
      <div className="navbar-end gap-2">
        <AuthButton />
        <Link
          href="/services"
          className="btn btn-primary text-base btn-sm px-6 py-4 text-white font-semibold"
        >
          কেয়ার বুক করুন
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
