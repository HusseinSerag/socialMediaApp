import { useUser } from "../features/auth/useUser";

import AddPost from "../features/posts/AddPost";
import PostWrapper from "../features/posts/PostWrapper";

export default function Homepage() {
  const { user } = useUser();
  return (
    <>
      <AddPost />
      <>
        <PostWrapper homepage={true} user={user} />
      </>
    </>
  );
}
