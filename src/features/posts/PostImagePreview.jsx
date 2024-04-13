import { IoClose } from "react-icons/io5";
import Modal from "../../ui/Modal";
import { useEffect, useRef } from "react";
import ClickOnImagePreview from "../../ui/ClickOnImagePreview";

export default function PostImagePreview({
  src,
  removeImage,
  index,
  getImageIndex,
  sortBefore,
}) {
  const ref = useRef();
  function handleRemoveImage() {
    removeImage(src);
  }

  useEffect(
    function () {
      const container = ref.current;
      function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const found = e.dataTransfer.getData("text/plain");

        const newImageIndex = getImageIndex(found);
        sortBefore(newImageIndex, index);
      }

      container.addEventListener("drop", handleDrop);
      return () => container.removeEventListener("drop", handleDrop);
    },
    [index],
  );

  useEffect(
    function () {
      const container = ref.current;
      function handleDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.clearData();

        e.dataTransfer.setData("text/plain", index);
      }

      container.addEventListener("dragover", handleDrag);
      return () => container.removeEventListener("dragover", handleDrag);
    },
    [index],
  );

  return (
    <div className="relative" draggable ref={ref}>
      <div className="absolute cursor-pointer bg-red-500 ">
        <IoClose onClick={handleRemoveImage} className="h-[20px] w-[20px]" />
      </div>
      <Modal.Toggle
        opens={src}
        render={(toggle) => (
          <div className=" h-[100px] w-[100px]" onClick={toggle}>
            <img
              src={src}
              className="h-full w-full cursor-pointer object-cover"
            />
          </div>
        )}
      />
      <Modal.Content
        name={src}
        render={() => <ClickOnImagePreview src={src} />}
      />
    </div>
  );
}
