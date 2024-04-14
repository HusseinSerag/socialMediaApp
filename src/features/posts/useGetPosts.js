import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/postsApi";

export function useGetPosts({ id, homepage, user }) {
  const {
    data: posts,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["posts", id, homepage, user],
    queryFn: () => getPosts({ id, homepage, user }),
  });
  return { posts, isLoading, isFetching };
}
