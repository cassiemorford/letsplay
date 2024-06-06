import React from "react";
import UserTable from "../../../components/UserTable";
import prisma from "@/prisma/db";

const Users = async () => {
  const allUsers = await prisma.user.findMany({
    include: {
      organization: true,
    },
  });
  return (
    <>
      <UserTable users={allUsers} includeOrganizationColumn />
    </>
  );
};

export default Users;
