import { useQuery } from "@tanstack/react-query";
import { getSaved } from "../../services/postsApi";

export function useGetSavedPosts(id) {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["postSave", id],
    queryFn: () => getSaved({ postId: id }),
  });
  return { posts, isLoading, error };
}
