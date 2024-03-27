import AddPost from "../features/posts/AddPost";
import PostList from "../features/posts/PostList";

export default function Homepage() {
  return (
    <div className="mx-auto max-w-[600px] px-10   ">
      <AddPost />
      <PostList />
    </div>
  );
}
