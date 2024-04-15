import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editComment } from "../../services/postsApi";
import toast from "react-hot-toast";

export function useEditComment() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postComment"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { mutate, isPending };
}
