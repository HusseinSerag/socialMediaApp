import { useMutation, useQueryClient } from "@tanstack/react-query";
import { respondToRequest } from "../../services/friendsApi";

export function useRespondToFriendRequest() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: respondToRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { mutate, isPending };
}
