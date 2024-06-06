"use client";
import { Role } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { label: "Home", href: "/admin", roles: [Role.ADMIN, Role.EXTERNAL] },
  { label: "Users", href: "/admin/users", roles: [Role.ADMIN, Role.EXTERNAL] },
  {
    label: "Organizations",
    href: "/admin/organizations",
    roles: [Role.ADMIN, Role.EXTERNAL],
  },
];

interface Props {
  role?: Role;
}

const MainNavLinks = ({ role }: Props) => {
  const currentPath = usePathname();
  return (
    <div className="flex flex-row items-center gap-2 text-md lg:flex-grow">
      {links
        .filter((l) => role && l.roles.includes(role))
        .map(({ label, href }) => {
          return (
            <Link
              key={label}
              href={href}
              className={`navbar-link  inline-block mt-0 text-teal-100 hover:text-white mr-4  ${
                currentPath === href
                  ? "cursor-default text-white hover:text-white font-bold"
                  : ""
              }`}
            >
              {label}
            </Link>
          );
        })}
    </div>
  );
};

export default MainNavLinks;
