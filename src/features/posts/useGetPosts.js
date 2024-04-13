import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/postsApi";

export function useGetPosts({ id, homepage, user }) {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", id, homepage, user],
    queryFn: () => getPosts({ id, homepage, user }),
  });
  return { posts, isLoading };
}
