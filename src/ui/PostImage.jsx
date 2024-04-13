import { useEffect, useRef, useState } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

export default function PostImage({ postPhotos }) {
  const [currentImg, setCurrentImg] = useState(0);

  function next() {
    setCurrentImg((curr) => (curr === postPhotos.length - 1 ? 0 : ++curr));
  }
  function previous() {
    setCurrentImg((curr) => (curr === 0 ? postPhotos.length - 1 : --curr));
  }

  // useEffect(function () {
  //   const container = divRef.current;

  //   function onFocus() {}
  //   container.addEventListener("focus", onFocus);

  //   return () => container.removeEventListener("focus", onFocus);
  // });

  return (
    <div className="relative flex justify-center overflow-hidden rounded-lg">
      {postPhotos.length > 1 && (
        <MdOutlineNavigateBefore
          onClick={previous}
          className="absolute left-0 top-[50%] z-10 h-12 w-12 cursor-pointer"
        />
      )}
      <img
        src={postPhotos[currentImg].photo}
        className="h-full max-h-[500px] min-h-[500px] w-full object-cover"
      />
      {postPhotos.length > 1 && (
        <MdOutlineNavigateNext
          onClick={next}
          className="absolute right-0 top-[50%] z-10 h-12 w-12 cursor-pointer"
        />
      )}
    </div>
  );
}
