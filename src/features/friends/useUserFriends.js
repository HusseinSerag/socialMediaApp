import { userFriends } from "../../services/friendsApi";
import { useUser } from "../auth/useUser";
import { useQuery } from "@tanstack/react-query";

export default function useUserFriend(status) {
  const { user } = useUser();
  const { isLoading, data } = useQuery({
    queryKey: [`UserFriend`, user?.id],
    queryFn: () => userFriends({ id: user?.id, status }),
    retry: false,
  });
  return { isLoading, data };
}
