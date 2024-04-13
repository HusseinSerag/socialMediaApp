import { useQuery } from "@tanstack/react-query";
import { getSaved } from "../../services/postsApi";

export function useGetSavedPosts({ postId = "", userId = "" }) {
  const inputID = {
    id: postId || userId,
    isPost: postId !== "",
  };
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["postSave", inputID.id],
    queryFn: () => getSaved(inputID),
  });
  return { posts, isLoading, error };
}
