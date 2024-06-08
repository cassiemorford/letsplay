import options from "@/app/api/auth/[...nextauth]/options";
import AddGameInstanceButton from "@/components/AddGameInstanceButton";
import GameInstanceTable from "@/components/GameInstanceTable";
import prisma from "@/prisma/db";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";

import React from "react";

interface Props {
  params: { id: string };
}

const GamePage = async ({ params }: Props) => {
  const session = await getServerSession(options);
  if (session?.user.role !== Role.ADMIN) {
    return <p>Admin Access Required</p>;
  }

  const game = await prisma.game.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!game) {
    return <p>Game not found</p>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg mx-6 pt-8 pb-8">{game.title}</h1>
        <AddGameInstanceButton gameId={game.id} />
      </div>
      <GameInstanceTable gameIds={[game.id]} />
    </div>
  );
};

export default GamePage;
