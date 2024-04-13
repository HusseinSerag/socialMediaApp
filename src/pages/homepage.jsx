import { useUser } from "../features/auth/useUser";
import AddPost from "../features/posts/AddPost";
import PostWrapper from "../features/posts/PostWrapper";
import Card from "../ui/Card";

export default function Homepage() {
  const { user } = useUser();
  return (
    <>
      <AddPost />
      <Card>
        <PostWrapper homepage={true} user={user} />
      </Card>
    </>
  );
}
