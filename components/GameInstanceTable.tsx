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
import { Game, GameInstance, Prisma, Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const gameInstanceWithGameAndBorrower =
  Prisma.validator<Prisma.GameInstanceDefaultArgs>()({
    include: { game: true, borrower: true },
  });

type GameInstanceWithGameAndBorrower = Prisma.GameInstanceGetPayload<
  typeof gameInstanceWithGameAndBorrower
>;

interface Props {
  gameIds?: number[];
  gameInstances?: GameInstanceWithGameAndBorrower[];
}

interface SelectObject {
  include: { game: true; borrower: true };
  where?: { gameId: { in: number[] } };
}

const gameInstanceTableHeaders = [
  { displayValue: "Instance Id", dbValue: "id" },
  { displayValue: "Game Title", dbValue: "game.title" },
  { displayValue: "Borrower", dbValue: "borrower" },
];

const GameInstanceTable = async ({ gameIds, gameInstances }: Props) => {
  const session = await getServerSession(options);
  const isAdmin = session?.user.role === Role.ADMIN;

  if (!gameInstances) {
    let selectObject: SelectObject = {
      include: {
        game: true,
        borrower: true,
      },
    };

    if (gameIds) {
      selectObject.where = {
        gameId: {
          in: gameIds,
        },
      };
    }

    gameInstances = (await prisma.gameInstance.findMany(
      selectObject
    )) as GameInstanceWithGameAndBorrower[];
  }

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
                <TableCell className="font-bold underline">
                  <Link
                    href={
                      isAdmin
                        ? `/admin/games/${i.game.id}`
                        : `/games/${i.game.id}`
                    }
                  >
                    {i.game.title}
                  </Link>
                </TableCell>
                <TableCell>{i.borrower.name}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GameInstanceTable;
