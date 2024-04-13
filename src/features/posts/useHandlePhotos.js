import { useState } from "react";

export default function useHandlePhotos() {
  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState([]);

  function handleFileInputChange(e) {
    const files = e.target.files;

    setPhotos(files);
    const arrayOfFiles = Array.from(files);
    const preview = arrayOfFiles.map((file) => URL.createObjectURL(file));
    setPreview(preview);
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
  return {
    removeImage,
    sortBefore,
    getImageIndex,
    handleFileInputChange,
    preview,
  };
}
