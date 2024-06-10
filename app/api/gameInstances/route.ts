import prisma from "@/prisma/db";
import { gameInstanceCreationSchema } from "@/validationSchemas/gameInstances";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = gameInstanceCreationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format, { status: 400 });
  }

  const internalOrganization = await prisma.organization.findFirst({
    where: { code: "LPF" },
  });

  if (!internalOrganization) {
    return NextResponse.json({
      message: "Default Borrower not found",
      status: 500,
    });
  }

  const newGameInstanceData = {
    ...body,
    organizationId: internalOrganization.id,
  };

  try {
    const newGameInstance = await prisma.gameInstance.create({
      data: {
        game: { connect: { id: body.gameId } },
        borrower: { connect: { id: internalOrganization.id } },
      },
    });
    return NextResponse.json(newGameInstance, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e, newGameInstanceData },
      { status: 200 }
    );
  }
}
