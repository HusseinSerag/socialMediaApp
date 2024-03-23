import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/postsApi";
export function useGetPosts() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  return { posts, isLoading };
}
