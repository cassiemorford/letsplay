import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const wishlistItem = await prisma.wishlistItem.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!wishlistItem) {
    return NextResponse.json(
      { error: "wishlist item not found" },
      { status: 404 }
    );
  }

  await prisma.wishlistItem.delete({
    where: { id: wishlistItem.id },
  });

  return NextResponse.json({ message: "Wishlist Item Deleted" });
}
