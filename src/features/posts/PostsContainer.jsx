import Menu from "../../ui/Menu";
import Modal from "../../ui/Modal";
import PostList from "./PostList";

export default function PostsContainer({
  posts,
  noPostMessageForUser,
  noPostMessageForNonUser,
}) {
  return (
    <Modal>
      <Menu>
        <PostList
          noPostMessageForUser={noPostMessageForUser}
          noPostMessageForNonUser={noPostMessageForNonUser}
          posts={posts}
        />
      </Menu>
    </Modal>
  );
}
