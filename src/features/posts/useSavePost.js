import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savePost } from "../../services/postsApi";
import toast from "react-hot-toast";

export default function useSavePost() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: savePost,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postSave"],
      });

      toast.success("Post saved!");
    },
  });
  return { mutate, isPending };
}
