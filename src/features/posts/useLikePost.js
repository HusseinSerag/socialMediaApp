import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../../services/postsApi";
import toast from "react-hot-toast";

export default function useLikePost() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: likePost,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postLike"],
      });

      toast.success("Post liked!");
    },
  });
  return { mutate, isPending };
}
