import FullPageSpinner from "../../ui/FullPageSpinner";
import Menu from "../../ui/Menu";
import Modal from "../../ui/Modal";
import { useUser } from "../auth/useUser";
import AddPost from "./AddPost";
import PostList from "./PostList";
import { useGetPosts } from "./useGetPosts";

export default function PostWrapper({ id }) {
  const { posts, isLoading: isLoadingPosts } = useGetPosts({ id });

  if (isLoadingPosts) return <FullPageSpinner />;
  return (
    <Modal>
      <Menu>
        <PostList posts={posts} />
      </Menu>
    </Modal>
  );
}
