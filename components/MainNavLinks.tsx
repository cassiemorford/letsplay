"use client";
import { Role } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Link {
  label: string;
  href: string;
  roles: Role[];
}

const links: Link[] = [
  { label: "Overview", href: "/overview", roles: [Role.EXTERNAL] },
  { label: "Admin Home", href: "/admin/", roles: [Role.ADMIN] },
  { label: "Users", href: "/admin/users", roles: [Role.ADMIN] },
  {
    label: "Organizations",
    href: "/admin/organizations",
    roles: [Role.ADMIN],
  },
  {
    label: "Games",
    href: "/admin/games",
    roles: [Role.ADMIN],
  },
  {
    label: "Games",
    href: "/games",
    roles: [Role.EXTERNAL],
  },
  {
    label: "Game Instances",
    href: "/admin/gameInstances",
    roles: [Role.ADMIN],
  },
];

interface Props {
  role?: Role;
}

const MainNavLinks = ({ role }: Props) => {
  const currentPath = usePathname();
  return (
    <div className="flex flex-row flex-wrap items-center gap-2 text-md lg:flex-grow">
      {links
        .filter((l) => role && l.roles.includes(role))
        .map(({ label, href }) => {
          return (
            <Link
              key={label}
              href={href}
              className={`navbar-link  inline-block mt-0 text-teal-700 hover:text-teal-900 mr-4  ${
                currentPath === href
                  ? "cursor-default text-teal-900 hover:text-teal-900 font-bold"
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
