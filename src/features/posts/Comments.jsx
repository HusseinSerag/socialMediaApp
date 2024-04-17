import Button from "../../ui/Button";
import DarkSmallLoader from "../../ui/DarkSmallLoader";
import Loader from "../../ui/Loader";
import Menu from "../../ui/Menu";
import Modal from "../../ui/Modal";
import Comment from "./Comment";
import { useGetComments } from "./useGetComments";

export default function Comments({ post }) {
  const {
    comments: data,
    fetchNextPage,
    isFetchingNextPage,

    hasNextPage,
  } = useGetComments(post.id);
  const comments = data?.data;

  return (
    <Menu>
      <Modal>
        <div className="mt-4 space-y-2">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        <div>
          {hasNextPage && !isFetchingNextPage && (
            <Button
              color=""
              size=""
              onClick={fetchNextPage}
              className="mt-4 text-sm font-semibold hover:underline"
            >
              Load more
            </Button>
          )}

          {isFetchingNextPage && (
            <>
              <DarkSmallLoader />
            </>
          )}
        </div>
      </Modal>
    </Menu>
  );
}
