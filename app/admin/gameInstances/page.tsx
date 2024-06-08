import GameInstanceTable from "@/components/GameInstanceTable";
import React from "react";

const GameInstancePage = async () => {
  return (
    <>
      <h1 className="text-lg mx-6 py-6">Library</h1>
      <div className="px-4">
        <GameInstanceTable />
      </div>
    </>
  );
};

export default GameInstancePage;
