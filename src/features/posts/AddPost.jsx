import { useEffect, useState } from "react";
import { MAX_CHAR_POST } from "../../utils/Constants";

import useAddPost from "./useAddPost";
import SmallLoader from "../../ui/SmallLoader";
import { BsPeople } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMood, MdPhotoCamera } from "react-icons/md";

import toast from "react-hot-toast";
import Card from "../../ui/Card";
import { useUser } from "../auth/useUser";
import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import PostImagePreview from "../../ui/PostImagePreview";
import Modal from "../../ui/Modal";
export default function AddPost() {
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState([]);
  const { addPost, isPending } = useAddPost();
  const { user } = useUser();

  function handleFileInputChange(e) {
    const files = e.target.files;

    setPhotos(files);
    const arrayOfFiles = Array.from(files);
    const preview = arrayOfFiles.map((file) => URL.createObjectURL(file));
    setPreview(preview);
  }
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

  function getImageIndex(src) {
    return preview.findIndex((item) => item === src);
  }
  function sortBefore(source, destination) {
    if (source === destination) return;
    const element = preview[source];
    const fileEl = Array.from(photos)[source];
    const newArr = preview.slice();
    const filesArr = Array.from(photos).slice();

    console.log(filesArr);
    if (destination === preview.length - 1) {
      newArr.splice(destination + 1, 0, element);
      filesArr.splice(destination + 1, 0, fileEl);
    } else {
      newArr.splice(destination, 0, element);
      filesArr.splice(destination, 0, fileEl);
    }
    if (source < destination) {
      newArr.splice(source, 1);
      filesArr.splice(source, 1);
    } else {
      newArr.splice(source + 1, 1);
      filesArr.splice(source + 1, 1);
    }

    setPreview(newArr);
    setPhotos(filesArr);
  }
  function removeImage(src) {
    const index = preview.findIndex((item) => item === src);
    if (index !== -1) {
      console.log(index);
      setPhotos((photos) => [
        ...Array.from(photos).filter((_, indexNo) => indexNo !== index),
      ]);
      setPreview((photos) => [
        ...photos.slice().filter((_, indexNo) => indexNo !== index),
      ]);
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
