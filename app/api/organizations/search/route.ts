import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { organizationSchema } from "@/validationSchemas/organizations";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  // const validation = organizationSchema.safeParse(body);

  // if (!validation.success) {
  //   return NextResponse.json(validation.error.format, { status: 400 });
  // }

  try {
    const organizations = await prisma.organization.findMany({
      where: {
        name: { contains: body.queryString },
      },
    });

    return NextResponse.json(organizations, { status: 200 });
  } catch (e) {
    throw e;
  }
}
