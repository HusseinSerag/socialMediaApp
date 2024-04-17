import { useEffect, useRef, useState } from "react";
import Avatar from "../../ui/Avatar";
import { VscSend } from "react-icons/vsc";
import { useAddComment } from "./useAddComment";
import { useUser } from "../auth/useUser";
import toast from "react-hot-toast";

export default function AddComment({ post, toggleOpenComment }) {
  const { mutate: addComment, isPending: isAddingComment } = useAddComment();
  const [text, setText] = useState("");
  const { user } = useUser();
  const isUser = user?.id === post.users.id;
  function add() {
    if (text.length === 0) {
      toast.error("Cannot have an empty comment!");
      return;
    }
    if (!isAddingComment) {
      addComment(
        {
          obj: {
            postId: post.id,
            commentedUser: user.id,
            commentContent: text,
          },
          isUser,
          username: user.username,
          postOwner: post.users.id,
        },
        {
          onSuccess: () => {
            toast.success("Comment added!");
            setText("");
          },
        },
      );
    }
  }
  const commentRef = useRef(null);

  function onClick() {
    toggleOpenComment();
  }
  useEffect(function () {
    const textarea = commentRef.current;

    function changeTextAreaHeight(e) {
      if (e.target.value.length < 60) {
        textarea.style.height = "3rem";
        textarea.style.borderRadius = "9999px";
      } else {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.borderRadius = "10px";
      }
    }
    textarea.addEventListener("input", changeTextAreaHeight);

    return () => textarea.removeEventListener("input", changeTextAreaHeight);
  }, []);
  return (
    <div className="mt-4 flex items-center gap-3">
      <div>
        <Avatar avatar={user.profilePicture} name={user.username} size="sm" />
      </div>
      <textarea
        onClick={onClick}
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={commentRef}
        className="h-12 grow resize-none overflow-hidden rounded-full border border-gray-400 px-4 py-3 "
        placeholder="leave a comment"
      />
      <VscSend className="h-8 w-8 cursor-pointer" onClick={add} />
    </div>
  );
}
