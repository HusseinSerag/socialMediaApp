import { useState } from "react";
import { MAX_CHAR_POST } from "../../utils/Constants";
import { useUser } from "../auth/useUser";
import useAddPost from "./useAddPost";
import SmallLoader from "../../ui/SmallLoader";

import toast from "react-hot-toast";
export default function AddPost() {
  const { user } = useUser();

  const [text, setText] = useState("");

  const { addPost, isPending } = useAddPost();

  const authenticated = Boolean(user?.id);
  function handleAddPost() {
    if (authenticated) {
      if (text.length === 0) {
        toast.error("Please write something first!");
        return;
      }
      addPost(
        { postOwner: user.id, postContent: text },
        {
          onSuccess: () => {
            setText("");
            toast.success("Post Added");
          },
        },
      );
    }
  }

  return (
    <div className=" py-2">
      <div className=" flex h-[8rem] flex-col rounded-t-lg bg-gray-300 sm:h-[10rem] dark:bg-gray-800">
        <textarea
          maxLength={MAX_CHAR_POST}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="write your post..."
          className=" w-[15rem] flex-1 resize-none rounded-lg  bg-gray-300 p-1 text-sm text-black focus:outline-none sm:w-[30rem] dark:bg-gray-800 dark:text-white"
        ></textarea>
        <div className="p-1 text-right  text-sm font-light text-black dark:text-white">
          {text.length}/{MAX_CHAR_POST}
        </div>
      </div>
      <button className="rounded-b-lg bg-blue-800 p-2" onClick={handleAddPost}>
        {isPending ? <SmallLoader /> : "Post"}
      </button>
    </div>
  );
}
