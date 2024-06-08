import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { organizationSchema } from "@/validationSchemas/organizations";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  body.code = body.code.toUpperCase();
  const validation = organizationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format, { status: 400 });
  }

  try {
    const newOrganization = await prisma.organization.create({
      data: {
        ...body,
        internal: false,
      },
    });

    return NextResponse.json(newOrganization, { status: 201 });
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
