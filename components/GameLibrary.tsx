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

interface Props {
  useAdminLinks: boolean;
}

const gameTableHeaders = [
  { displayValue: "Title", dbValue: "title" },
  { displayValue: "Game Instances", dbValue: "gameInstance" },
];

const GameLibrary = async ({ useAdminLinks }: Props) => {
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