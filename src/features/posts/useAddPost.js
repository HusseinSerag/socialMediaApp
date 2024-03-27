import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPost } from "../../services/postsApi";
export default function useAddPost() {
  const queryClient = useQueryClient();
  const { mutate: addPost, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
  return { addPost, isPending };
}
