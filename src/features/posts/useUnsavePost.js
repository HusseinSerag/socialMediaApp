import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unsavePost } from "../../services/postsApi";
import toast from "react-hot-toast";

export default function useUnlikePost() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: unsavePost,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postSave"],
      });

      toast.success("Post unsaved!");
    },
  });
  return { mutate, isPending };
}
