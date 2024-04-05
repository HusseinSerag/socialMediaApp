import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/postsApi";

export function useGetPosts({ id }) {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPosts({ id }),
  });
  return { posts, isLoading };
}
