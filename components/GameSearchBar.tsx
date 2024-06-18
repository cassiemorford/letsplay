"use client";
import axios from "axios";
import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { BggSearchItemDto } from "boardgamegeekclient/dist/esm/dto/concrete/subdto";
import GameOverviewCard from "./GameOverviewCard_client";
import AddGameButton from "./AddGameButton";

interface BggResponse {
  data: BggSearchItemDto[];
}

const GameSearchBar = () => {
  const [queryString, setQueryString] = useState("");
  const [searchResults, setSearchResults] = useState<BggSearchItemDto[]>([]);
  const [selectedItem, setSelectedItem] = useState<BggSearchItemDto>();

  async function handleSearch(queryString: string) {
    if (!queryString) return;
    setQueryString(queryString);
    const resp: BggResponse = await axios.post("/api/bgg/search", {
      queryString,
    });
    setSearchResults(resp.data);
  }

  const handleSelection = (selection: BggSearchItemDto) => {
    setQueryString("");
    setSearchResults([]);
    setSelectedItem(selection);
  };

  return (
    <>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search for a game"
          value={queryString}
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>{selectedItem ? "" : "no results"}</CommandEmpty>
          <CommandGroup>
            {searchResults?.map((sr) => (
              <CommandItem onSelect={() => handleSelection(sr)} key={sr.id}>
                <div className="flex justify-between w-full">
                  <span className="text-lg">{sr.name}</span>
                  <span className="text-teal-300 text-lg">
                    {sr.yearpublished}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
      {selectedItem && (
        <>
          <div className="flex justify-end">
            <AddGameButton name={selectedItem.name} bggId={selectedItem.id} />
          </div>
          <GameOverviewCard bggId={selectedItem.id} />
        </>
      )}
    </>
  );
};

export default GameSearchBar;
