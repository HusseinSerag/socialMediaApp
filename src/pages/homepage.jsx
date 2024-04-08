import AddPost from "../features/posts/AddPost";
import PostWrapper from "../features/posts/PostWrapper";
import Card from "../ui/Card";

export default function Homepage() {
  return (
    <>
      <AddPost />
      <Card>
        {/* <PostWrapper id="" /> */}
        Hello
      </Card>
    </>
  );
}
