import { useEffect, useRef } from "react";
import Avatar from "../../ui/Avatar";

export default function AddComment({ post, user }) {
  const commentRef = useRef(null);
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
    <div className="mt-4 flex gap-3">
      <div>
        <Avatar avatar={user.profilePicture} name={user.username} size="sm" />
      </div>
      <textarea
        ref={commentRef}
        className="h-12 grow resize-none overflow-hidden rounded-full border border-gray-400 px-4 py-3 "
        placeholder="leave a comment"
      />
    </div>
  );
}
