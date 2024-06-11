import prisma from "@/prisma/db";
import { gameTitleCreationSchema } from "@/validationSchemas/gameTitles";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = gameTitleCreationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format, { status: 400 });
  }

  const newGameTitleData = {
    ...body,
    gameInstances: [],
  };

  try {
    const newGameTitle = await prisma.game.create({
      data: {
        title: body.title,
        bggId: body.bggId,
      },
    });
    return NextResponse.json(newGameTitle, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e, newGameTitleData },
      { status: 200 }
    );
  }
}
