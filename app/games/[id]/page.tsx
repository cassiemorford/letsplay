import React from "react";

import prisma from "@/prisma/db";
import GameOverviewCard from "@/components/BoardGameOverviewCard";
import GameInstanceTable from "@/components/GameInstanceTable";
import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string };
}

const GamePage = async ({ params }: Props) => {
  const session = await getServerSession(options);

  const game = await prisma.game.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!game) return <p>game not found</p>;

  const gameInstancesAtUserLocation = await prisma.gameInstance.findMany({
    where: {
      gameId: game.id,
      borrowerId: session?.user.organizationId,
    },
    include: {
      game: true,
      borrower: true,
    },
  });

  return (
    <>
      <GameOverviewCard bggId={game.bggId} />
      {gameInstancesAtUserLocation.length ? (
        <GameInstanceTable gameInstances={gameInstancesAtUserLocation} />
      ) : (
        <div className="bg-slate-800 p-8 flex justify-center rounded-xl">
          <p>
            Your organization does not currently have any copies of this game
          </p>
        </div>
      )}
    </>
  );
};

export default GamePage;
