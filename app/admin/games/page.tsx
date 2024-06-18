import React from "react";
import GameLibrary from "@/components/GameLibrary";

const LibraryPage = async () => {
  return <GameLibrary useAdminLinks={true} />;
};

export default LibraryPage;
