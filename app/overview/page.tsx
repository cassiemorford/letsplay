import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import React from "react";
import options from "../api/auth/[...nextauth]/options";
import prisma from "@/prisma/db";
import GameInstanceTable from "@/components/GameInstanceTable";

const OverViewPage = async () => {
  const session = await getServerSession(options);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
    include: {
      organization: {
        include: {
          borrowedGames: {
            include: {
              game: true,
              borrower: true,
            },
          },
        },
      },
    },
  });

  return (
    <div>
      <h1 className="text-lg mx-6 pt-8 pb-8">{`${user?.organization.name} currently has the following titles:`}</h1>
      <GameInstanceTable gameInstances={user?.organization.borrowedGames} />
    </div>
  );
};

export default OverViewPage;
