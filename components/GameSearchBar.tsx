"use client";
import axios from "axios";
import { BggSearchDto } from "boardgamegeekclient/dist/esm/dto";
import React, { useState } from "react";

interface BggResponse {
  data: BggSearchDto[];
}
const GameSearchBar = () => {
  const [queryString, setQueryString] = useState("");
  const [searchResults, setSearchResults] = useState<BggSearchDto[]>([]);

  async function handleSearch(queryString: string) {
    setQueryString(queryString);
    const resp: BggResponse = await axios.post("/api/bgg", {
      queryString,
    });
    setSearchResults(resp.data);
  }

  return (
    <div>
      <input
        placeholder="Type a command or search..."
        value={queryString}
        onChange={(ev) => handleSearch(ev.target.value)}
      />

      {!searchResults?.length && <p>no results</p>}
      <ul>
        {searchResults &&
          searchResults[0]?.items.map((sr) => (
            <div key="sr.id">
              <div key={sr.id}>{sr.name}</div>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default GameSearchBar;
