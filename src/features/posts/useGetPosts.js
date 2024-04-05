import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/postsApi";
import { useUser } from "../auth/useUser";
export function useGetPosts() {
  const { user } = useUser();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", user?.id],
    queryFn: () => getPosts({ id: user?.id }),
  });
  return { posts, isLoading };
}
