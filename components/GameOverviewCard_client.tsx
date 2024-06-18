import React, { useEffect, useState } from "react";
import { BggClient } from "boardgamegeekclient";
const client = BggClient.Create();

import { BggThingDto } from "boardgamegeekclient/dist/esm/dto";
import { Backpack, Clock, Users } from "lucide-react";
import BggLogo from "./svg/navbar-logo-bgg-b2.svg";
import Link from "next/link";
import axios from "axios";

interface Props {
  bggId: number | string;
}

const GameOverviewCard = ({ bggId }: Props) => {
  const [gameData, setGameData] = useState<BggThingDto | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.post(`/api/bgg/games/`, { bggId });
      setGameData(resp.data);
    };

    fetchData().catch(console.error);
  }, [bggId]);

  return (
    <>
      {gameData ? (
        <div className="flex mb-12">
          <div className="w-1/2 border border-teal-900 bg-teal-900 p-8 flex justify-center rounded-tl-xl rounded-bl-xl">
            <img src={gameData.image} className="max-w-1/2 max-h-64" />
          </div>
          <div className="w-1/2 border border-teal-900 r rounded-tr-xl rounded-br-xl p-12">
            <h2 className="text-3xl mb-4">{gameData.name}</h2>
            <p className="my-4">
              <Users className="inline mr-4" /> {gameData.minplayers}-
              {gameData.maxplayers} players
            </p>
            <p className="my-4">
              <Clock className="inline mr-4" /> {gameData.playingtime} minutes
            </p>
            <p className="my-4">
              <Backpack className="inline mr-4" />
              minimum recommended age: {gameData.minage}
            </p>
            <div className=" flex justify-around align-middle rounded-xl bg-slate-900 p-2 mt-8">
              <Link
                target="_blank"
                href={`https://boardgamegeek.com/boardgame/${bggId}`}
              >
                <BggLogo />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GameOverviewCard;
