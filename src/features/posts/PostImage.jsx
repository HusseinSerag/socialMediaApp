import { useEffect, useRef, useState } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import Modal from "../../ui/Modal";
import ClickOnImagePreview from "../../ui/ClickOnImagePreview";

export default function PostImage({ postPhotos }) {
  const [currentImg, setCurrentImg] = useState(0);

  function next() {
    setCurrentImg((curr) => (curr === postPhotos.length - 1 ? 0 : ++curr));
  }
  function previous() {
    setCurrentImg((curr) => (curr === 0 ? postPhotos.length - 1 : --curr));
  }

  const src = postPhotos[currentImg].photo;
  const id = postPhotos[currentImg].id;
  return (
    <div className="relative flex justify-center overflow-hidden rounded-lg">
      {postPhotos.length > 1 && (
        <MdOutlineNavigateBefore
          onClick={previous}
          className="absolute left-0 top-[50%]  h-12 w-12 cursor-pointer"
        />
      )}
      <div className="h-[500px] max-h-[500px] ">
        <img
          src={src}
          className=" h-full w-full min-w-[300px] max-w-full cursor-pointer object-scale-down "
        />
      </div>
      {postPhotos.length > 1 && (
        <MdOutlineNavigateNext
          onClick={next}
          className="absolute right-0 top-[50%] h-12 w-12 cursor-pointer"
        />
      )}
    </div>
  );
}
