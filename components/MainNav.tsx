import Link from "next/link";
import React from "react";
import MainNavLinks from "./MainNavLinks";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import { Badge } from "./ui/badge";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { Role } from "@prisma/client";

const MainNav = async () => {
  const session = await getServerSession(options);
  return (
    <nav className="flex items-center justify-between align-middle flex-wrap bg-teal-500 p-6 w-full">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/admin">
          <p className="font-bold text-lg text-yellow-200">
            Let's Play Foundation
          </p>
        </Link>
        {session?.user.role === Role.ADMIN && (
          <Badge
            className="bg-yellow-100 text-teal-700 ml-4"
            variant="secondary"
          >
            ADMIN
          </Badge>
        )}
      </div>
      <MainNavLinks role={session?.user.role} />
      <div className="flex flex-row items-center gap-2">
        {session ? (
          <>
            <Link
              className={`inline-block mt-0 text-teal-200 hover:text-teal-900mr-4 ${buttonVariants(
                { variant: "outline" }
              )}`}
              href="/api/auth/signout?callbackUrl=/"
            >
              Log Out
            </Link>
          </>
        ) : (
          <Link
            className="inline-block mt-0 text-teal-200 hover:text-teal-900 mr-4"
            href="/api/auth/signin"
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
