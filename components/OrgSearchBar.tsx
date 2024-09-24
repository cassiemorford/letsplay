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
import UpdateBorrowerButton from "./UpdateBorrowerButton";
import { GameInstance, Organization, Prisma } from "@prisma/client";

const gameInstanceWithBorrower =
  Prisma.validator<Prisma.GameInstanceDefaultArgs>()({
    include: { borrower: true },
  });

type GameInstanceWithBorrower = Prisma.GameInstanceGetPayload<
  typeof gameInstanceWithBorrower
>;

interface Props {
  gameInstance: GameInstanceWithBorrower;
}

interface OrganizationSearchResponse {
  data: Organization[];
}
const OrgSearchBar = ({ gameInstance }: Props) => {
  const [queryString, setQueryString] = useState("");
  const [searchResults, setSearchResults] = useState<Organization[]>([]);
  const [selectedItem, setSelectedItem] = useState<Organization>();

  async function handleSearch(queryString: string) {
    setQueryString(queryString);
    if (!queryString) return;
    const resp: OrganizationSearchResponse = await axios.post(
      "/api/organizations/search",
      {
        queryString,
      }
    );
    setSearchResults(resp.data);
  }

  const handleSelection = (selection: Organization) => {
    setQueryString("");
    setSearchResults([]);
    setSelectedItem(selection);
  };

  return (
    <>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search for a organization"
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
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
      {selectedItem && (
        <>
          <div className="flex justify-between align-text-bottom">
            <div>
              <h1>{`old borrower: ${gameInstance.borrower.name}`}</h1>
              <h1>{`new borrower: ${selectedItem.name}`}</h1>
            </div>
            <UpdateBorrowerButton
              gameInstanceId={gameInstance.id}
              borrowerId={selectedItem.id}
            />
          </div>
        </>
      )}
    </>
  );
};

export default OrgSearchBar;
