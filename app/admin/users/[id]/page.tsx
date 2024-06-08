import options from "@/app/api/auth/[...nextauth]/options";
import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import React from "react";

interface Props {
  params: { id: string };
}

const EditUser = async ({ params }: Props) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!user) {
    return <p>User not found</p>;
  }

  user.password = "";

  return (
    <div className="mx-8">
      <UserForm user={user} />
    </div>
  );
};

export default EditUser;
