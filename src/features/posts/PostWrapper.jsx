import FullPageSpinner from "../../ui/FullPageSpinner";
import { useUser } from "../auth/useUser";
import AddPost from "./AddPost";
import PostList from "./PostList";
import { useGetPosts } from "./useGetPosts";

export default function PostWrapper() {
  const { posts, isLoading: isLoadingPosts } = useGetPosts();
  // const { posts, isLoading } = useGetPosts(user?.id || "");
  if (isLoadingPosts) return <FullPageSpinner />;
  return (
    <>
      <PostList posts={posts} />
    </>
  );
}
