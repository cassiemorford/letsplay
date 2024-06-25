import { getServerSession } from "next-auth";
import React from "react";
import options from "../api/auth/[...nextauth]/options";
import prisma from "@/prisma/db";
import GameInstanceTable from "@/components/GameInstanceTable";
import GameWishlistTable from "@/components/GameWishlistTable";

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

  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-between">
      <div className="basis-2/5">
        <h1 className="text-lg mx-6 pt-8 pb-8">{`Borrowed Titles`}</h1>
        <GameInstanceTable gameInstances={user.organization.borrowedGames} />
      </div>
      <div className="basis-2/5 pl-4">
        <h1 className="text-lg mx-6 pt-8 pb-8">{`Wishlist`}</h1>
        <GameWishlistTable organizationId={user.organization.id} />
      </div>
    </div>
  );
};

export default OverViewPage;
