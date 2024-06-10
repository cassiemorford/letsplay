import React from "react";
import UserTable from "../../../components/UserTable";
import prisma from "@/prisma/db";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Users = async () => {
  const allUsers = await prisma.user.findMany({
    include: {
      organization: true,
    },
  });
  return (
    <>
      <div className="flex justify-end">
        <Link
          className={`${buttonVariants({ variant: "default" })} mt-6 mb-6 mr-6`}
          href="/admin/users/new"
        >
          Add New User
        </Link>
      </div>
      <UserTable users={allUsers} includeOrganizationColumn />
    </>
  );
};

export default Users;
