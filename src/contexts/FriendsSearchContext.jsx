import { createContext, useContext, useState } from "react";
import useSearch from "../features/Profile/useSearch";
import { throwError } from "../utils/helpers";

const Friends = createContext();
export default function FriendsSearchContext({ children }) {
  const [search, setSearch] = useState("");
  const { error, isLoading, users } = useSearch(search);
  function onSearch(e) {
    setSearch(e.target.value);
  }
  return (
    <Friends.Provider value={{ search, onSearch, users, error, isLoading }}>
      {children}
    </Friends.Provider>
  );
}

export function useSearchFriend() {
  const context = useContext(Friends);
  if (context === undefined) {
    throwError("Cannot use search hook outside of the context", 403);
  }
  return context;
}
