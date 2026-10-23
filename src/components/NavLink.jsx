"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, className = "", ...props }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const activeClasses = "text-black bg-secondary/50 text-base  font-semibold";
  const inactiveClasses = "hover:text-primary text-base transition-colors font-medium";

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClasses : inactiveClasses}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
