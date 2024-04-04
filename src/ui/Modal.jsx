import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import useClickOutsideModal from "../hooks/useClickOutsideModal";

const ModalContext = createContext();
export default function Modal({ children }) {
  const [isOpen, setOpen] = useState("");
  function close() {
    setOpen("");
  }
  function openModal(name) {
    setOpen(name);
  }
  return (
    <ModalContext.Provider value={{ isOpen, openModal, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function ModalToggle({ opens, render }) {
  const { openModal } = useContext(ModalContext);

  function toggle() {
    openModal(opens);
  }
  return render(toggle);
}

function ModalContent({ name, render }) {
  const { close, isOpen } = useContext(ModalContext);

  return (
    isOpen === name &&
    createPortal(
      <div className="absolute inset-0 h-screen  opacity-[10] backdrop-blur-sm">
        <div className="fixed left-[50%] top-[50%] w-[80%] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-white-A700 p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <span className="absolute right-4 top-4">
            <IoMdClose
              className="h-6 w-6 cursor-pointer hover:text-indigo-A200"
              onClick={close}
            />
          </span>
          {render(close)}
        </div>
      </div>,
      document.body,
    )
  );
}

Modal.Toggle = ModalToggle;
Modal.Content = ModalContent;
