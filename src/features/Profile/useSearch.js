import { searchFriend } from "../../services/profileApi";

import { useQuery } from "@tanstack/react-query";
export default function useSearch(key) {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["search", key],
    queryFn: () => searchFriend(key),
    retry: false,
  });
  return { error, users, isLoading };
}
