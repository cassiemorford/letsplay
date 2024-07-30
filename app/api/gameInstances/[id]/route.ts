import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  // const validation = userSchema.safeParse(body);

  // if (!validation.success) {
  //   return NextResponse.json(validation.error.format(), { status: 400 });
  // }

  const gameInstance = await prisma.gameInstance.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!gameInstance) {
    return NextResponse.json(
      { error: "Game Instance not found" },
      { status: 404 }
    );
  }

  const updatedUser = await prisma.gameInstance.update({
    where: { id: +params.id },
    data: {
      ...body,
      organization: {
        connect: {
          id: body.borrowerId,
        },
      },
    },
  });

  return NextResponse.json(updatedUser);
}
