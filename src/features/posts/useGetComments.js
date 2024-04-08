import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../services/postsApi";

export function useGetComments(id) {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["postComment", id],
    queryFn: () => getComments({ postId: id }),
  });
  return { comments, isLoading, error };
}
