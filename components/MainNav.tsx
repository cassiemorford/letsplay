import Link from "next/link";
import React from "react";
import MainNavLinks from "./MainNavLinks";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

const MainNav = async () => {
  const session = await getServerSession(options);
  return (
    <div className="flex justify-between">
      <p>{JSON.stringify(session)}</p>
      <MainNavLinks role={session?.user.role} />
      <div className="flex flex-row items-center gap-2">
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">Log Out</Link>
        ) : (
          <Link href="/api/auth/signin">Log In</Link>
        )}
      </div>
    </div>
  );
};

export default MainNav;
