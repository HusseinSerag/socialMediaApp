import FullPageSpinner from "../../ui/FullPageSpinner";
import { Heading } from "../../ui/Heading";
import { useUser } from "../auth/useUser";
import PostsContainer from "./PostsContainer";
import { useGetSavedPosts } from "./useGetSavedPosts";

export default function SavedPostsWrapper() {
  const { user } = useUser();
  const {
    isLoading: isLoadingSaved,
    posts: savedPosts,
    isFetching,
  } = useGetSavedPosts({
    userId: user.id,
  });

  if (isLoadingSaved || isFetching) return <FullPageSpinner />;
  return (
    <>
      <Heading size="xl" className="mb-4 font-semibold">
        Your Bookmarks
      </Heading>
      <PostsContainer
        noPostMessageForUser={"You dont't have any saved posts yet!"}
        posts={savedPosts}
      />
    </>
  );
}
