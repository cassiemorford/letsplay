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
import { BookOpenCheck, Icon } from "lucide-react";

interface Props {
  useAdminLinks: boolean;
  borrowedGameIds?: number[];
}

const gameTableHeaders = [
  { displayValue: "Title", dbValue: "title" },
  { displayValue: "Game Instances", dbValue: "gameInstance" },
];

const GameLibrary = async ({ useAdminLinks, borrowedGameIds = [] }: Props) => {
  const gameIdSet = new Set(borrowedGameIds);
  const allGames = await prisma.game.findMany({
    include: {
      _count: { select: { instances: true } },
    },
  });

  return (
    <div className="px-4">
      <Table className="border rounded-t">
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
                <TableCell className="font-bold underline">
                  <Link
                    href={
                      useAdminLinks ? `/admin/games/${g.id}` : `/games/${g.id}`
                    }
                  >
                    {g.title}
                  </Link>
                  {gameIdSet.has(g.id) && (
                    <BookOpenCheck className="ml-4 inline-block" />
                  )}
                </TableCell>
                <TableCell>{g._count.instances}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GameLibrary;
