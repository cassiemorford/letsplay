import OrganizationForm from "@/components/OrganizationForm";
import prisma from "@/prisma/db";
import React from "react";

interface Props {
  params: { id: string };
}

const AddNewOrganization = async ({ params }: Props) => {
  const organization = await prisma.organization.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!organization) {
    return <p>organization not found</p>;
  }

  return <OrganizationForm organization={organization} />;
};

export default AddNewOrganization;
