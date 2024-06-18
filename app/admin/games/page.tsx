import React from "react";
import GameLibrary from "@/components/GameLibrary";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const LibraryPage = async () => {
  return (
    <>
      <div className="flex justify-end">
        <Link
          className={`${buttonVariants({ variant: "default" })} mt-6 mb-6 mr-6`}
          href="/admin/games/new"
        >
          Add New Game
        </Link>
      </div>
      <GameLibrary useAdminLinks={true} />
    </>
  );
};

export default LibraryPage;
