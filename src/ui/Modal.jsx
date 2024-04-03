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

function ModalToggle({ render, opens }) {
  const { openModal } = useContext(ModalContext);

  return render(() => {
    openModal(opens);
  });
}

function ModalContent({ name }) {
  const { close, isOpen } = useContext(ModalContext);
  const { ref } = useClickOutsideModal(close);
  return (
    isOpen === name &&
    createPortal(
      <div className="absolute inset-0 z-50   h-screen  opacity-[10] backdrop-blur-sm">
        <div
          ref={ref}
          className="fixed left-[50%] top-[50%] w-[80%] max-w-[600px] translate-x-[-50%] translate-y-[-50%] bg-white-A700 p-6"
        >
          <span className="absolute right-4 top-4">
            <IoMdClose
              className="h-6 w-6 cursor-pointer hover:text-indigo-A200"
              onClick={close}
            />
          </span>
        </div>
      </div>,
      document.body,
    )
  );
}

Modal.Toggle = ModalToggle;
Modal.Content = ModalContent;
