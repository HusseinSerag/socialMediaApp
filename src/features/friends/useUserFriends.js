import { userFriends } from "../../services/friendsApi";

import { useQuery } from "@tanstack/react-query";

export default function useUserFriend(status, user) {
  const { isLoading, data } = useQuery({
    queryKey: [`UserFriend`, user?.id],
    queryFn: () => userFriends({ id: user?.id, status }),
    retry: false,
  });
  return { isLoading, data };
}
