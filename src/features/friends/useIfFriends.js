import { areFriends } from "../../services/friendsApi";
import { useUser } from "../auth/useUser";
import { useQuery } from "@tanstack/react-query";

export default function useIfFriends(id) {
  const { user } = useUser();
  const { isLoading, data } = useQuery({
    queryKey: ["ifFriends", user?.id, id],
    queryFn: () => areFriends(user?.id, id),
    retry: false,
  });
  return { isLoading, areFriends: data };
}
