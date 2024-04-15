import Menu from "../../ui/Menu";
import Modal from "../../ui/Modal";
import Comment from "./Comment";

export default function Comments({ comments }) {
  return (
    <Menu>
      <Modal>
        <div className="mt-4 space-y-2">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </Modal>
    </Menu>
  );
}
