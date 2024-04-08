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
import useLikePost from "./useLikePost";
import useUnlikePost from "./useUnlikePost";
import { useGetComments } from "./useGetComments";
import PostImage from "../../ui/PostImage";
import AddComment from "./AddComment";
import Card from "../../ui/Card";

export default function Post({ post }) {
  const date = new Date(post.created_at);

  const { user } = useUser();
  const { isPending, mutate: deletePost } = useDeletePost();

  const {
    isLoading: isLoadingLikes,
    likes,
    error: postError,
  } = useGetLikes(post.id);
  const {
    isLoading: isLoadingComments,
    comments,
    error: commentError,
  } = useGetComments(post.id);
  const { mutate: likePost, isPending: isLiking } = useLikePost();
  const { mutate: unlikePost, isPending: isUnliking } = useUnlikePost();

  if (isLoadingLikes || isLoadingComments) return;
  const isUser = user?.id === post.users.id;
  const numberOfLikes = likes.length;
  const numberOfComments = comments.length;
  const userLikedThisPost = likes.find((post) => post.users.id === user.id);

  function like() {
    if (!isLiking) {
      likePost({ postId: post.id, likedUser: user.id });
    }
  }
  function dislike() {
    if (!isUnliking) {
      unlikePost({ postId: post.id, likedUser: user.id });
    }
  }
  return (
    <Card>
      <div className="flex gap-3">
        <Avatar
          size="sm"
          name={post.users.username}
          avatar={post.users.profilePicture}
        />
        <div className="w-full">
          <div className=" mb-3 flex  flex-col gap-1">
            <Link to={`/profile/${post.users.id}`}>
              <span className="text-sm ">
                <span className="font-semibold">
                  {isUser ? "You " : post.users.username + " "}
                </span>
                shared a<span className="text-socialBlue"> post</span>
              </span>
            </Link>

            <span className="text-xs font-light text-gray-600">
              {formatDistanceToNow(date, {
                addSuffix: true,
                includeSeconds: true,
              })}
            </span>
          </div>

          <div className="my-3">{post.postContent}</div>
          <PostImage />
          <div className="mt-4 flex space-x-8">
            <Modal.Toggle
              opens={`post_${post.id}`}
              render={(click) => (
                <span
                  className="flex cursor-pointer items-center gap-1"
                  onClick={click}
                >
                  {numberOfComments}
                  <FaRegComment className="h-[17px] w-[17px]" />
                </span>
              )}
            />

            <span className="flex cursor-pointer gap-1">
              {numberOfLikes}
              {userLikedThisPost ? (
                <AiFillLike onClick={dislike} className="h-[19px] w-[19px]" />
              ) : (
                <BiLike onClick={like} className="h-[19px] w-[19px]" />
              )}
            </span>
            <FaRegBookmark className="h-[17px] w-[17px]" />
          </div>
          <AddComment post={post} />
        </div>

        <div>
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
      </div>

      <div>
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
        <Modal.Content name={`post_${post.id}`} render={(close) => {}} />
      </div>
    </Card>
  );
}
