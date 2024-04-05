import { useQuery } from "@tanstack/react-query";
import { getLikes } from "../../services/postsApi";

export function useGetLikes(id) {
  if (!id) return;
  const {
    data: likes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["postLike", id],
    queryFn: () => getLikes({ postId: id }),
  });
  return { likes, isLoading, error };
}
