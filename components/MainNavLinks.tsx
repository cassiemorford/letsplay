"use client";
import { Role } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { label: "Users", href: "/admin/users", roles: [Role.ADMIN, Role.EXTERNAL] },
  {
    label: "Oganizations",
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
    <div className="flex flex-row items-center gap-2">
      {links
        .filter((l) => role && l.roles.includes(role))
        .map(({ label, href }) => {
          return (
            <Link
              key={label}
              href={href}
              className={`navbar-link ${
                currentPath === href ? "cursor-default text-primary/70" : ""
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
