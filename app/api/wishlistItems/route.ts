import prisma from "@/prisma/db";
import { wishlistItemCreationSchema } from "@/validationSchemas/wishlist";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = wishlistItemCreationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format, { status: 400 });
  }

  try {
    const newWishlistItem = await prisma.wishlistItem.create({
      data: {
        organizationId: body.organizationId,
        gameId: body.gameId,
      },
    });
    return NextResponse.json(newWishlistItem, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e, body }, { status: 500 });
  }
}
