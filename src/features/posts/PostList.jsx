import useIfFriendIsUser from "../../hooks/useIfFriendIsUser";

import Post from "./Post";

export default function PostList({
  user,
  posts,
  noPostMessageForUser = "",
  noPostMessageForNonUser = "",
}) {
  const { isUser } = useIfFriendIsUser();
  return (
    <div className="flex flex-col gap-4">
      {posts?.length === 0 && (
        <div className="my-2 text-center text-sm font-semibold">
          {isUser ? noPostMessageForUser : noPostMessageForNonUser}
        </div>
      )}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
