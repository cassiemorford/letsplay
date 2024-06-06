import prisma from "@/prisma/db";
import { userSchema } from "@/validationSchemas/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

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

  const newUser = await prisma.user.create({ data: { ...body } });

  return NextResponse.json(newUser, { status: 201 });
}