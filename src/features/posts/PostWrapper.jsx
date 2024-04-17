import FullPageSpinner from "../../ui/FullPageSpinner";
import PostsContainer from "./PostsContainer";
import { useGetPosts } from "./useGetPosts";

export default function PostWrapper({ id = "", homepage = false, user = {} }) {
  const {
    posts,
    isLoading: isLoadingPosts,
    isFetching,
  } = useGetPosts({
    id,
    homepage,
    user,
  });

  if (isLoadingPosts) return <FullPageSpinner />;
  return (
    <PostsContainer
      noPostMessageForUser={"It seems that there are no posts here!"}
      noPostMessageForNonUser={"No posts"}
      posts={posts}
    />
  );
}
