import GameInstanceTable from "@/components/GameInstanceTable";
import React from "react";

const GameInstancePage = async () => {
  return (
    <>
      <h1 className="text-lg mx-6 pt-6">Library</h1>
      <GameInstanceTable />
    </>
  );
};

export default GameInstancePage;
