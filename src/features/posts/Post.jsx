import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";
import { formatDistanceToNow } from "date-fns";
import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import Menu from "../../ui/Menu";
import { MdOutlineDelete } from "react-icons/md";
import { useUser } from "../auth/useUser";
import Modal from "../../ui/Modal";
import ConfirmModal from "../../ui/ConfirmModal";
import useDeletePost from "./useDeletePost";
import { useGetLikes } from "./useGetLikes";

export default function Post({ post }) {
  const date = new Date(post.created_at);
  const { user } = useUser();
  const { isPending, mutate: deletePost } = useDeletePost();
  const { isLoading: isLoadingLikes, likes, error } = useGetLikes(post.id);
  if (isLoadingLikes) return;
  const isUser = user?.id === post.users.id;
  const numberOfLikes = likes.length;
  const userLikedThisPost = likes
    .map((post) => post.users.id === user.id)
    .at(0);

  return (
    <div className="space-y-1 rounded-lg bg-gray-50 p-3">
      <div className="flex  gap-4">
        <Avatar
          size="sm"
          name={post.users.username}
          avatar={post.users.profilePicture}
        />
        <div className="w-full">
          <div className="mb-3 flex items-center gap-2">
            <Link to={`/profile/${post.users.id}`}>
              <span className="text-sm font-semibold">
                {post.users.username}
              </span>
            </Link>

            <span className="text-xs font-light text-gray-600">
              {formatDistanceToNow(date, {
                addSuffix: true,
                includeSeconds: true,
              })}
            </span>
            <span className="relative ml-auto">
              <Menu.Toggle name={post.id} />
              <Menu.MenuList name={post.id}>
                {isUser && (
                  <Modal.Toggle
                    opens="delete"
                    render={(click) => (
                      <Menu.Action onClick={click}>
                        <span className=" flex w-max items-center gap-2 rounded-lg">
                          <MdOutlineDelete className="h-5 w-5 font-semibold" />{" "}
                          <span className="cursor-pointer text-sm font-semibold">
                            {" "}
                            Delete Post
                          </span>
                        </span>
                      </Menu.Action>
                    )}
                  />
                )}
              </Menu.MenuList>
            </span>
          </div>
          <span>{post.postContent}</span>
          <div className="mt-4 flex space-x-8">
            <FaRegComment className="h-[17px] w-[17px]" />
            <span className="flex cursor-pointer gap-1">
              {numberOfLikes}
              {userLikedThisPost ? (
                <AiFillLike className="h-[19px] w-[19px]" />
              ) : (
                <BiLike className="h-[19px] w-[19px]" />
              )}
            </span>
            <FaRegBookmark className="h-[17px] w-[17px]" />
          </div>
        </div>
        <Modal.Content
          name="delete"
          render={(close) => (
            <ConfirmModal
              resourceName="post"
              onClose={close}
              disabled={isPending}
              onConfirm={() => {
                deletePost(post.id, {
                  onSuccess: () => {
                    close();
                  },
                });
              }}
            />
          )}
          resourceName={"post"}
        />
      </div>
    </div>
  );
}
