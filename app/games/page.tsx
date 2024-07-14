import React from "react";
import options from "@/app/api/auth/[...nextauth]/options";
import GameLibrary from "@/components/GameLibrary";
import { getUserWithOrganization } from "../util";
import { getServerSession } from "next-auth";

const LibraryPage = async () => {
  const session = await getServerSession(options);
  const user = await getUserWithOrganization(session);
  console.log(user?.organization);
  return (
    <GameLibrary
      useAdminLinks={false}
      borrowedGameIds={
        user?.organization.borrowedGames.map((gi) => gi.game.id) || []
      }
    />
  );
};

export default LibraryPage;
