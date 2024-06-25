import options from "@/app/api/auth/[...nextauth]/options";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";

const wishlistItemWithGame = Prisma.validator<Prisma.WishlistItemDefaultArgs>()(
  {
    include: { game: true },
  }
);

type WishlistItemWithGame = Prisma.WishlistItemGetPayload<
  typeof wishlistItemWithGame
>;

interface Props {
  organizationId: number;
}

const GameWishlistTableHeaders = [
  { displayValue: "Game Title", dbValue: "game.title" },
];

const GameWishlistTable = async ({ organizationId }: Props) => {
  const wishlistItems: WishlistItemWithGame[] =
    await prisma.wishlistItem.findMany({
      where: {
        organizationId: organizationId,
      },
      include: {
        game: true,
      },
    });

  return (
    <div>
      <Table className="rounded-t border">
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            {GameWishlistTableHeaders.map(({ displayValue, dbValue }) => (
              <TableHead key={dbValue}>{displayValue}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {wishlistItems.map((i) => (
            <>
              <TableRow key={i.id}>
                <TableCell className="font-bold underline">
                  <Link href={`/games/${i.game.id}`}>{i.game.title}</Link>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GameWishlistTable;
