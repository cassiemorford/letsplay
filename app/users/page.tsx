import UserForm from "@/components/UserForm";
import React from "react";
import DataTableSimple from "./DataTableSimple";
import prisma from "@/prisma/db";
import { Role } from "@prisma/client";

const Users = async () => {
  return (
    <>
      <UserForm />
    </>
  );
};

export default Users;
