import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/db";
import { GameInstance, Organization, Prisma, User } from "@prisma/client";
import Link from "next/link";
import React from "react";

type UserWithOrganization = Prisma.UserGetPayload<{
  include: { organization: true };
}>;

interface Props {
  gameIds: number[];
}

const gameInstanceTableHeaders = [
  { displayValue: "Instance Id", dbValue: "id" },
  { displayValue: "Game Title", dbValue: "game.title" },
  { displayValue: "Borrower", dbValue: "borrower" },
];

const GameInstanceTable = async ({ gameIds }: Props) => {
  const gameInstances = await prisma.gameInstance.findMany({
    where: {
      gameId: {
        in: gameIds,
      },
    },
    include: {
      game: true,
      borrower: true,
    },
  });

  return (
    <div>
      <Table className="rounded-t border">
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            {gameInstanceTableHeaders.map(({ displayValue, dbValue }) => (
              <TableHead key={dbValue}>{displayValue}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {gameInstances.map((i) => (
            <>
              <TableRow key={i.id}>
                <TableCell>{i.id}</TableCell>
                <TableCell>
                  <Link href={`/admin/gameInstances/${i.id}`}>
                    {i.game.title}
                  </Link>
                </TableCell>
                <TableCell>{i.borrower?.name}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GameInstanceTable;
