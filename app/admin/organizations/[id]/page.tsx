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
      <div className="px-4">
        <div className="flex justify-between border-b pb-4 mb-4">
          <h1 className="text-xl">{organization.name}</h1>
          <p>
            {`Organization join code: `}
            <span className="text-yellow-300">{organization.code}</span>
          </p>
        </div>
        <h3 className="mb-4">Organization Members:</h3>
      </div>
      <UserTable users={organization.members} />
    </div>
  );
};

export default OrganizationPage;
