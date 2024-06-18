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

interface BggResponse {
  data: BggSearchItemDto[];
}

const GameSearchBar = () => {
  const [queryString, setQueryString] = useState("");
  const [searchResults, setSearchResults] = useState<BggSearchItemDto[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number>();

  async function handleSearch(queryString: string) {
    setQueryString(queryString);
    const resp: BggResponse = await axios.post("/api/bgg", {
      queryString,
    });
    setSearchResults(resp.data);
  }

  const handleSelection = (id: number) => {
    setSelectedItemId(id);
  };

  return (
    <>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Type a command or search..."
          value={queryString}
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>no results</CommandEmpty>
          <CommandGroup>
            {searchResults?.map((sr) => (
              <CommandItem onSelect={() => handleSelection(sr.id)} key={sr.id}>
                {sr.id}/{sr.name}/{sr.yearpublished}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
      <p>{selectedItemId}</p>
      {selectedItemId && <GameOverviewCard bggId={selectedItemId} />}
    </>
  );
};

export default GameSearchBar;
