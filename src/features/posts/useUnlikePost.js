import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikePost } from "../../services/postsApi";
import toast from "react-hot-toast";

export default function useUnlikePost() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: unlikePost,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postLike"],
      });

      toast.success("Post unliked!");
    },
  });
  return { mutate, isPending };
}
