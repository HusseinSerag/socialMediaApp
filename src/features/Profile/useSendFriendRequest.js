import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "../../services/friendsApi";
export default function useSendFriendRequest() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id1, id2, username }) =>
      sendFriendRequest(id1, id2, username),
    onSettled: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });
  return { addFriend: mutate, isPending };
}
