import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../services/postsApi";
import toast from "react-hot-toast";
export default function useDeletePost() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      toast.success("Post successfully deleted!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isPending, mutate };
}
