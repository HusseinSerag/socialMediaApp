import FullPageSpinner from "../../ui/FullPageSpinner";
import { useUser } from "../auth/useUser";
import AddPost from "./AddPost";
import PostList from "./PostList";
import { useGetPosts } from "./useGetPosts";

export default function PostWrapper() {
  const { user } = useUser();
  const { posts, isLoading } = useGetPosts(user?.id || "");
  if (isLoading) return <FullPageSpinner />;
  return (
    <>
      <AddPost user={user} />
      <PostList user={user} posts={posts} />
    </>
  );
}
