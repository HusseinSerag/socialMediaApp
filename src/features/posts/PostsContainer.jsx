import Menu from "../../ui/Menu";
import Modal from "../../ui/Modal";
import PostList from "./PostList";

export default function PostsContainer({
  posts,
  noPostMessageForUser,
  noPostMessageForNonUser,
  fowardedRef = null,
}) {
  return (
    <Modal>
      <Menu>
        <PostList
          noPostMessageForUser={noPostMessageForUser}
          noPostMessageForNonUser={noPostMessageForNonUser}
          posts={posts}
          fowardedRef={fowardedRef}
        />
      </Menu>
    </Modal>
  );
}
