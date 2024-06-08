import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { organizationSchema } from "@/validationSchemas/organizations";
import { checkForDuplicateFields } from "./util";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = organizationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format, { status: 400 });
  } else await checkForDuplicateFields(body);

  try {
    const newOrganization = await prisma.organization.create({
      data: {
        ...body,
        internal: false,
      },
    });

    return NextResponse.json(newOrganization, { status: 201 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}
5;
