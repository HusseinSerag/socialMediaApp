import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useUser } from "../features/auth/useUser";
import FullPageSpinner from "./FullPageSpinner";
import NotificationsReceived from "../features/notifications/NotificationsReceived";

import { IoMdMenu } from "react-icons/io";
import { useState } from "react";

export default function LayoutWrapper() {
  const { isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  if (isLoading) return <FullPageSpinner />;
  function close() {
    setIsOpen(false);
  }
  return (
    <>
      <NotificationsReceived />
      <div className=" mx-auto justify-center gap-6 p-4 sm:flex ">
        <div className="fixed bottom-5 left-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-white-A700 shadow-lg  md:hidden">
          <IoMdMenu
            className=" h-10 w-10 cursor-pointer "
            onClick={() => setIsOpen((o) => !o)}
          />
        </div>
        <div className={`${isOpen ? "block" : "hidden"} md:block`}>
          <Navbar onClick={close} />
          {isOpen && (
            <div
              onClick={() => close()}
              className="fixed inset-0 z-20 bg-black opacity-70 md:hidden"
            ></div>
          )}
        </div>
        <main className="order-1 w-full max-w-[600px] overflow-auto sm:order-4 ">
          <Outlet />
        </main>
      </div>
    </>
  );
}
