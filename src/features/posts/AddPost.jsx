import { useState } from "react";
import { MAX_CHAR_POST } from "../../utils/Constants";

import useAddPost from "./useAddPost";
import SmallLoader from "../../ui/SmallLoader";

import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMood, MdPhotoCamera } from "react-icons/md";

import toast from "react-hot-toast";
import Card from "../../ui/Card";
import { useUser } from "../auth/useUser";
import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import PostImagePreview from "./PostImagePreview";
import Modal from "../../ui/Modal";
import useHandlePhotos from "./useHandlePhotos";
export default function AddPost() {
  const [text, setText] = useState("");
  const {
    getImageIndex,
    handleFileInputChange,
    preview,
    removeImage,
    sortBefore,
    photos,
  } = useHandlePhotos();
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
        { postOwner: user.id, postContent: text, photos },
        {
          onSuccess: () => {
            setText("");
            setPreview("");
            setPhotos([]);
            toast.success("Post Added");
          },
        },
      );
    }
  }

  return (
    <Card>
      <div className="flex gap-2">
        <Avatar name={user?.username} size="sm" avatar={user?.profilePicture} />
        <textarea
          placeholder={`What's on your mind ${user?.username}?`}
          maxLength={MAX_CHAR_POST}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className=" dark:text-white  h-14 grow  resize-none rounded-lg p-3"
        />
      </div>
      {preview.length !== 0 && (
        <div className="my-4 flex flex-wrap gap-4">
          <Modal>
            {preview.map((file, index) => (
              <PostImagePreview
                src={file}
                key={file}
                removeImage={removeImage}
                index={index}
                getImageIndex={getImageIndex}
                sortBefore={sortBefore}
              />
            ))}
          </Modal>
        </div>
      )}
      <div className="mt-2 flex items-center gap-5">
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
        <div>
          <Button color="" size="">
            <label
              htmlFor="file"
              className="relative flex cursor-pointer gap-1 [&>svg]:h-5 [&>svg]:w-5"
            >
              <MdPhotoCamera />
              <input
                type="file"
                className="absolute h-[1px] w-[1px] appearance-none"
                id="file"
                multiple
                accept="image/*"
                onChange={handleFileInputChange}
              />
              Photos
            </label>
          </Button>
        </div>
        <div className="ml-auto">
          <Button
            size=""
            color=""
            className="rounded-md  bg-socialBlue px-6 py-1 text-white-A700"
            onClick={handleAddPost}
            disabled={isPending}
          >
            {isPending ? <SmallLoader /> : "Share"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
