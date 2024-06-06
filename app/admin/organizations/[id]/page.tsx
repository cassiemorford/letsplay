import UserTable from "@/components/UserTable";
import prisma from "@/prisma/db";
import React from "react";

interface Props {
  params: { id: string };
}

const OrganizationPage = async ({ params }: Props) => {
  const organization = await prisma.organization.findUnique({
    where: { id: parseInt(params.id) },
    include: { members: true },
  });

  if (!organization) {
    return <p>Organization not found</p>;
  }

  return (
    <div>
      <h1>{organization.name}</h1>
      <p>{`Organization join code: ${organization.code}`}</p>
      <h3>Organization Members</h3>
      <UserTable users={organization.members} />
    </div>
  );
};

export default OrganizationPage;
