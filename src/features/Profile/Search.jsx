import { useState } from "react";
import SmallLoader from "../../ui/SmallLoader";
import useSearch from "./useSearch";
import FriendsSearchContext from "../../contexts/FriendsSearchContext";
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";

export default function Search() {
  return (
    <FriendsSearchContext>
      <div className="space-y-10">
        <SearchBox />
        <SearchResults />
      </div>
    </FriendsSearchContext>
  );
}
