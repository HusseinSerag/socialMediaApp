import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";
import { formatDistanceToNow } from "date-fns";
import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { PiBookmarkSimpleFill } from "react-icons/pi";

import Menu from "../../ui/Menu";
import { useUser } from "../auth/useUser";
import Modal from "../../ui/Modal";
import ConfirmModal from "../../ui/ConfirmModal";

import useDeletePost from "./useDeletePost";
import { useGetLikes } from "./useGetLikes";
import useLikePost from "./useLikePost";
import useUnlikePost from "./useUnlikePost";

import { useGetComments } from "./useGetComments";

import PostImage from "./PostImage";
import AddComment from "./AddComment";
import Card from "../../ui/Card";
import ListOfUsersInModal from "../../ui/ListOfUsersInModal";

import toast from "react-hot-toast";
import useSavePost from "./useSavePost";
import { useGetSavedPosts } from "./useGetSavedPosts";

export default function Post({ post }) {
  const date = new Date(post.created_at);

  const { user } = useUser();
  const { isPending, mutate: deletePost } = useDeletePost();
  const { isPending: isSaving, mutate: savePost } = useSavePost();

  const {
    isLoading: isLoadingLikes,
    likes,
    error: postError,
  } = useGetLikes(post.id);
  const {
    isLoading: isLoadingSaved,
    posts: savedPosts,
    error: savedError,
  } = useGetSavedPosts(post.id);
  const {
    isLoading: isLoadingComments,
    comments,
    error: commentError,
  } = useGetComments(post.id);
  const { mutate: likePost, isPending: isLiking } = useLikePost();
  const { mutate: unlikePost, isPending: isUnliking } = useUnlikePost();

  if (isLoadingLikes || isLoadingComments || isLoadingSaved) return;

  const isUser = user?.id === post.users.id;

  const numberOfLikes = likes.length;
  const numberOfComments = comments.length;
  const numberOfSavedPosts = isUser && savePost.length;

  const userLikedThisPost = likes.find((post) => post.users.id === user.id);
  const userSavedThisPost = savedPosts.find(
    (post) => post.users.id === user.id,
  );

  const likedUsers = likes.map((likes) => likes.users);

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
  function save() {
    if (!isSaving) {
      savePost({ postId: post.id, userId: user.id });
    }
  }
  function unsave() {}
  function popUpAMessage(resource) {
    toast.error(`${resource} has 0 likes! `);
  }

  console.log(numberOfSavedPosts);
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
            <Link to={isUser ? "/you" : `/profile/${post.users.id}`}>
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
          {post?.postPhotos?.length > 0 && (
            <PostImage postPhotos={post.postPhotos} />
          )}
          <div className="mt-4 flex space-x-8">
            <span className="flex cursor-pointer items-center gap-1">
              {numberOfComments}
              <FaRegComment className="h-[17px] w-[17px]" />
            </span>

            <span className="flex cursor-pointer gap-1">
              {numberOfLikes > 0 ? (
                <Modal>
                  <Modal.Toggle
                    opens={`noOfLikesPost${post.id}`}
                    render={(open) => (
                      <div onClick={open} className="hover:underline">
                        {numberOfLikes}
                      </div>
                    )}
                  />
                  <Modal.Content
                    name={`noOfLikesPost${post.id}`}
                    render={() => (
                      <ListOfUsersInModal
                        users={likedUsers}
                        loggedInUser={user}
                      />
                    )}
                  />
                </Modal>
              ) : (
                <div onClick={() => popUpAMessage("Post")}>
                  {" "}
                  {numberOfLikes}
                </div>
              )}

              {userLikedThisPost ? (
                <AiFillLike onClick={dislike} className="h-[19px] w-[19px]" />
              ) : (
                <BiLike onClick={like} className="h-[19px] w-[19px]" />
              )}
            </span>
            <div className="cursor-pointer">
              {userSavedThisPost ? (
                <div>
                  <PiBookmarkSimpleFill className="h-[17px] w-[17px]" />
                </div>
              ) : (
                <div onClick={save}>
                  <FaRegBookmark className="h-[17px] w-[17px]" />
                </div>
              )}
            </div>
          </div>
          <AddComment user={user} post={post} />
        </div>

        <div>
          <span className="relative ml-auto">
            <Menu.Toggle name={post.id} />
            <Menu.MenuList name={post.id}>
              {isUser && (
                <Modal.Toggle
                  opens={"delete" + post.id}
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
          name={"delete" + post.id}
          render={(close) => (
            <ConfirmModal
              resourceName="post"
              onClose={close}
              disabled={isPending}
              onConfirm={() => {
                deletePost(
                  { id: post.id },
                  {
                    onSuccess: () => {
                      close();
                    },
                  },
                );
              }}
            />
          )}
          resourceName={"post"}
        />
      </div>
    </Card>
  );
}
