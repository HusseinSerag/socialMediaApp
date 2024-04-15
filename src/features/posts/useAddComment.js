import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addComment } from "../../services/postsApi";

export function useAddComment() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postComment"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { mutate, isPending };
}
