import prisma from "@/prisma/db";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const gameTableHeaders = [
  { displayValue: "Title", dbValue: "title" },
  { displayValue: "Game Instances", dbValue: "gameInstance" },
];

const LibraryPage = async () => {
  const allGames = await prisma.game.findMany({
    include: {
      _count: { select: { GameInstance: true } },
    },
  });

  return (
    <div>
      <Table className="rounded-t border">
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            {gameTableHeaders.map(({ displayValue, dbValue }) => (
              <TableHead key={dbValue}>{displayValue}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allGames.map((g) => (
            <>
              <TableRow key={g.id}>
                <TableCell>
                  <Link href={`/admin/games/${g.id}`}>{g.title}</Link>
                </TableCell>
                <TableCell>{g._count.GameInstance}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LibraryPage;
