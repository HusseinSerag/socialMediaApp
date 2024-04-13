import FullPageSpinner from "../../ui/FullPageSpinner";
import { useUser } from "../auth/useUser";
import PostsContainer from "./PostsContainer";
import { useGetSavedPosts } from "./useGetSavedPosts";

export default function SavedPostsWrapper() {
  const { user } = useUser();
  const { isLoading: isLoadingSaved, posts: savedPosts } = useGetSavedPosts({
    userId: user.id,
  });
  if (isLoadingSaved) return <FullPageSpinner />;
  return (
    <PostsContainer
      noPostMessageForUser={"You dont't have any saved posts yet!"}
      posts={savedPosts}
    />
  );
}
