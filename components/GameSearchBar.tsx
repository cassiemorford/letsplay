"use client";
import axios from "axios";
import { BggSearchDto } from "boardgamegeekclient/dist/esm/dto";
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

interface BggResponse {
  data: BggSearchItemDto[];
}

const GameSearchBar = () => {
  const [queryString, setQueryString] = useState("");
  const [searchResults, setSearchResults] = useState<BggSearchItemDto[]>([]);

  async function handleSearch(queryString: string) {
    setQueryString(queryString);
    const resp: BggResponse = await axios.post("/api/bgg", {
      queryString,
    });
    setSearchResults(resp.data);
  }

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
              <CommandItem key={sr.id}>
                {sr.id}/{sr.name}/{sr.yearpublished}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
};

export default GameSearchBar;
