import { useState } from "react";
import { MAX_CHAR_POST } from "../../utils/Constants";

import useAddPost from "./useAddPost";
import SmallLoader from "../../ui/SmallLoader";
import { BsPeople } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMood } from "react-icons/md";

import toast from "react-hot-toast";
import Card from "../../ui/Card";
import { useUser } from "../auth/useUser";
import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
export default function AddPost() {
  const [text, setText] = useState("");

  const { addPost, isPending } = useAddPost();
  const { user } = useUser();

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
    <Card>
      <div className="flex gap-2">
        <Avatar name={user.username} size="sm" avatar={user.profilePicture} />
        <textarea
          placeholder={`What's on your mind ${user.username}?`}
          maxLength={MAX_CHAR_POST}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className=" dark:text-white  h-14 grow  resize-none rounded-lg p-3"
        />
      </div>
      <div className="mt-2 flex items-center gap-5">
        <div>
          <Button className="gap-2 [&>svg]:h-5 [&>svg]:w-5" color="" size="">
            <BsPeople />
            People
          </Button>
        </div>
        <div>
          <Button className="gap-2 [&>svg]:h-5 [&>svg]:w-5" color="" size="">
            <CiLocationOn />
            Check in
          </Button>
        </div>
        <div>
          <Button className="gap-2 [&>svg]:h-5 [&>svg]:w-5" color="" size="">
            <MdOutlineMood />
            Mood
          </Button>
        </div>
        <div className="ml-auto">
          <Button
            size=""
            color=""
            className="bg-socialBlue  rounded-md px-6 py-1 text-white-A700"
            onClick={handleAddPost}
          >
            Share
          </Button>
        </div>
      </div>
      {/* <div className=" flex h-[8rem] flex-col rounded-t-lg bg-gray-300 sm:h-[10rem] dark:bg-gray-800">
        <div className="dark:text-white p-1  text-right text-sm font-light text-black">
          {text.length}/{MAX_CHAR_POST}
        </div>
      </div>
      <button className="rounded-b-lg bg-blue-800 p-2" onClick={handleAddPost}>
        {isPending ? <SmallLoader /> : "Post"}
      </button> */}
    </Card>
  );
}
