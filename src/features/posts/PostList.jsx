import { useUser } from "../auth/useUser";
import Post from "./Post";
import { useGetPosts } from "./useGetPosts";

export default function PostList() {
  const { user } = useUser();
  const { posts, isLoading } = useGetPosts(user?.id || "");
  if (isLoading) return;
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
