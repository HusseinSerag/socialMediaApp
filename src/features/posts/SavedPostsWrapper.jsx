import PostsContainer from "./PostsContainer";

export default function SavedPostsWrapper() {
  return (
    <PostsContainer
      noPostMessageForUser={"You dont't have any saved posts yet!"}
      posts={[]}
    />
  );
}
