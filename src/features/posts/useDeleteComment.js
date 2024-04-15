import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../services/postsApi";
import toast from "react-hot-toast";

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postComment"],
      });
      toast.success("Comment deleted!");
    },
    onError: (error) => toast.error(error.message),
  });

  return { mutate, isPending };
}
