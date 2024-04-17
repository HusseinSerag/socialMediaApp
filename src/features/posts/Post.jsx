import { Link, useSearchParams } from "react-router-dom";
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
import useUnsavePost from "./useUnsavePost";
import { useEffect, useRef, useState } from "react";
import Comments from "./Comments";

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
  } = useGetSavedPosts({ postId: post.id });
  const { comments, clearCommentsOnClose } = useGetComments(post.id);
  const { mutate: likePost, isPending: isLiking } = useLikePost();
  const { mutate: unlikePost, isPending: isUnliking } = useUnlikePost();

  const { mutate: unsavePost, isPending: isUnsaving } = useUnsavePost();

  const [seeComment, setSeeComment] = useState(false);

  const ref = useRef(null);
  const [params] = useSearchParams();
  const postId = params.get("post");
  const loadingState = isLoadingLikes || isLoadingSaved;

  const refExists = !loadingState;
  useEffect(
    function () {
      if (refExists && ref.current) {
        if (Number(postId) === post.id) {
          window.scrollTo({
            top: ref.current.offsetTop,
            behavior: "smooth",
          });
        }
      }
    },
    [post.id, postId, refExists],
  );
  if (loadingState) return;

  const isUser = user?.id === post.users.id;

  const numberOfLikes = likes.length;
  const numberOfComments = comments?.count;
  const numberOfSavedPosts = savedPosts.length;

  const userLikedThisPost = likes.find((post) => post.users.id === user.id);
  const userSavedThisPost = savedPosts.find(
    (post) => post.users.id === user.id,
  );

  const likedUsers = likes.map((likes) => likes.users);
  const savedUsers = savedPosts.map((saved) => saved.users);

  function openComments() {
    setSeeComment(true);
  }
  function closeComment() {
    setSeeComment(false);
    clearCommentsOnClose();
  }
  function like() {
    if (!isLiking) {
      likePost({
        postId: post.id,
        likedUser: user.id,
        isUser,
        postOwner: post.users.id,
        username: user.username,
      });
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
  function unsave() {
    if (!isUnsaving) {
      unsavePost({ postId: post.id, userId: user.id });
    }
  }
  function popUpAMessage(resource) {
    toast.error(`${resource} has 0 likes! `);
  }

  return (
    <Card>
      <div id={post.id} ref={ref}>
        <div className="flex gap-3">
          <Avatar
            size="sm"
            name={post.users.username}
            avatar={post.users.profilePicture}
          />
          <div className="flex flex-col gap-2">
            <Link to={isUser ? "/you" : `/profile/${post.users.id}`}>
              <span className="text-xs sm:text-sm ">
                <span className=" font-semibold">
                  {isUser ? "You " : post.users.username + " "}
                </span>
                shared a<span className="text-socialBlue"> post</span>
              </span>
            </Link>

            <span className="text-[11px] font-light text-gray-600 sm:text-xs">
              {formatDistanceToNow(date, {
                addSuffix: true,
                includeSeconds: true,
              })}
            </span>
          </div>
          <div className="ml-auto">
            <span className="relative ml-auto">
              {isUser && (
                <>
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
                </>
              )}
            </span>
          </div>
        </div>
        <div className="w-full">
          <div className=" mb-3 flex  flex-col gap-1"></div>

          <div className="my-3">{post.postContent}</div>
          {post?.postPhotos?.length > 0 && (
            <PostImage postPhotos={post.postPhotos} />
          )}
          <div className="mt-4 flex space-x-8">
            <span className="flex cursor-pointer items-center gap-1">
              <span
                onClick={() => {
                  if (seeComment) {
                    closeComment();
                  } else {
                    openComments();
                  }
                }}
              >
                {numberOfComments}
              </span>
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
                    render={() => <ListOfUsersInModal users={likedUsers} />}
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
            <div className="flex cursor-pointer items-center gap-1">
              {isUser && numberOfSavedPosts > 0 && (
                <Modal>
                  <Modal.Toggle
                    opens={`noOfSavedPost${post.id}`}
                    render={(click) => (
                      <div onClick={click} className="hover:underline">
                        {numberOfSavedPosts}
                      </div>
                    )}
                  />
                  <Modal.Content
                    name={`noOfSavedPost${post.id}`}
                    render={() => <ListOfUsersInModal users={savedUsers} />}
                  />
                </Modal>
              )}
              {userSavedThisPost ? (
                <div onClick={unsave}>
                  <PiBookmarkSimpleFill className="h-[19px] w-[19px]" />
                </div>
              ) : (
                <div onClick={save}>
                  <FaRegBookmark className="h-[17px] w-[17px]" />
                </div>
              )}
            </div>
          </div>
          <AddComment toggleOpenComment={openComments} post={post} />
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

      {seeComment && <Comments post={post} />}
    </Card>
  );
}
