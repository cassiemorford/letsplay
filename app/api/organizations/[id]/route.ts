import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { organizationSchema } from "@/validationSchemas/organizations";
import { Prisma } from "@prisma/client";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  body.code = body.code.toUpperCase();

  const validation = organizationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const organization = await prisma.organization.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!organization) {
    return NextResponse.json(
      { error: "Organization not found" },
      { status: 404 }
    );
  }

  try {
    const updatedorganization = await prisma.organization.update({
      where: { id: organization.id },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updatedorganization);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        // too hacky, but don't know a better way to get field name
        const fieldAffected = e.meta?.target?.toString().split("_")[1];
        return NextResponse.json(
          {
            clientDisplayError: `Organization ${fieldAffected} is already claimed`,
          },
          { status: 422 }
        );
      }
    }
    throw e;
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const organization = await prisma.organization.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!organization) {
    return NextResponse.json(
      { error: "organization not found" },
      { status: 404 }
    );
  }

  await prisma.organization.delete({
    where: { id: organization.id },
  });

  return NextResponse.json({ message: "organization Deleted" });
}
