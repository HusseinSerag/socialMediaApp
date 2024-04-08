import useIfFriendIsUser from "../../hooks/useIfFriendIsUser";
import { useUser } from "../auth/useUser";
import Post from "./Post";
import { useGetPosts } from "./useGetPosts";

export default function PostList({ user, posts }) {
  const { isUser } = useIfFriendIsUser();
  return (
    <div className="flex flex-col gap-4">
      {posts?.length === 0 && (
        <div className="my-2 text-center text-sm font-semibold">
          {isUser ? "You don't have any posts yet!" : "No posts"}
        </div>
      )}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
