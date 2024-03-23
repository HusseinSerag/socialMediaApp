import { useMutation } from "@tanstack/react-query";

import { createPost } from "../../services/postsApi";
export default function useAddPost() {
  const { mutate: addPost, isPending } = useMutation({
    mutationFn: createPost,
  });
  return { addPost, isPending };
}
