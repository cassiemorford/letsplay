import prisma from "@/prisma/db";
import { gameCreationSchema } from "@/validationSchemas/games";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = gameCreationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format, { status: 400 });
  }

  try {
    const newGame = await prisma.game.create({
      data: {
        title: body.name,
        bggId: body.bggId,
      },
    });
    return NextResponse.json(newGame, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 200 });
  }
}
