import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export const checkForDuplicateFields = async (body: {
  code: string;
  name: string;
}) => {
  const duplicateName = await prisma.organization.findUnique({
    where: { name: body.name },
  });

  if (duplicateName) {
    return NextResponse.json(
      { clientDisplayError: "Organization name is already claimed" },
      { status: 409 }
    );
  }

  const duplicateCode = await prisma.organization.findUnique({
    where: { code: body.code },
  });

  if (duplicateCode) {
    return NextResponse.json(
      { clientDisplayError: "Organization code is already claimed" },
      { status: 409 }
    );
  }
};
