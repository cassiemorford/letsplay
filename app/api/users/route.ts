import prisma from "@/prisma/db";
import { userSchema } from "@/validationSchemas/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  const organizationCode = body.organizationCode;
  delete body.organizationCode;

  if (!validation.success) {
    return NextResponse.json(validation.error.format, { status: 400 });
  }

  const duplicate = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (duplicate) {
    return NextResponse.json(
      { message: "email is already taken" },
      { status: 409 }
    );
  }

  const hashPassword = await bcrypt.hash(body.password, 10);
  body.password = hashPassword;

  try {
    const newUser = await prisma.user.create({
      data: {
        ...body,
        organization: { connect: { code: organizationCode } },
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (e) {
    return NextResponse.json({ e, body }, { status: 200 });
  }
}
