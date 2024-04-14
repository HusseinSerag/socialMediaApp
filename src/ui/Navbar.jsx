import { Link, NavLink } from "react-router-dom";
import { useUser } from "../features/auth/useUser";
import Avatar from "./Avatar";

import NavItem from "./NavItem";

import { AiOutlineHome as FaHome } from "react-icons/ai";
import { IoBookmarksOutline } from "react-icons/io5";
import { GrSearch } from "react-icons/gr";
import { MdLogin } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

import { useLogout } from "../features/auth/useLogout";
import useNavigateTo from "../hooks/useNavigateTo";
import useGetNotifications from "../features/notifications/useGetNotifications";

const className = " font-semibold text-sm ";
export default function Navbar({ onClick: close }) {
  const { user, isLoading } = useUser();
  const { logout, isPending } = useLogout();
  const authenticated = Boolean(user?.id);
  const go = useNavigateTo();
  const { notifications: { data = [] } = {} } = useGetNotifications();

  if (isLoading || isPending) return;

  const numberOfNotifications = data?.filter(
    (notify) => notify.read === false,
  ).length;
  function onClick() {
    logout();
    go("/login");
    close();
  }
  return (
    <nav className="fixed bottom-28 z-[30]  order-2  flex rounded-lg bg-white-A700 shadow-sm md:static md:h-max md:w-[30vw] md:max-w-[400px] ">
      <ul className=" flex w-full  flex-col items-center justify-between gap-4 px-4 py-4 md:relative  md:py-10 ">
        {authenticated && (
          <>
            <Link
              className=" mt-0 flex w-auto justify-center rounded-md sm:w-full"
              to={`you`}
              onClick={close}
            >
              <Avatar
                name={user.username}
                avatar={user.profilePicture}
                size="sm"
              />
            </Link>
            <NavLink onClick={close} className={`w-full`} to="/">
              <NavItem className="w-auto rounded-md bg-white-A700 p-4 shadow-md shadow-gray-300 sm:w-full">
                <FaHome className="" />
                <div className={className}>Home</div>
              </NavItem>
            </NavLink>
            <NavLink onClick={close} className="w-full" to="/search">
              <NavItem className="w-auto rounded-md bg-white-A700 p-4 shadow-md shadow-gray-300 sm:w-full">
                <GrSearch className="" />
                <div className={className}>Friends</div>
              </NavItem>
            </NavLink>
            <NavLink onClick={close} className="w-full" to="/saved">
              <NavItem className="rounded-md bg-white-A700 p-4 shadow-md shadow-gray-300 sm:w-full">
                <IoBookmarksOutline />
                <div className={className}>Saved Posts</div>
              </NavItem>
            </NavLink>
            <NavLink onClick={close} className="w-full" to="/notifications">
              <NavItem className="rounded-md bg-white-A700 p-4 shadow-md shadow-gray-300 sm:w-full">
                <div className="relative">
                  {numberOfNotifications > 0 && (
                    <div className="absolute right-[-2px] top-[-8px] flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-red-600 p-[10px] text-sm font-semibold text-white-A700">
                      {numberOfNotifications}
                    </div>
                  )}
                  <FaRegBell className="h-6 w-6" />
                </div>
                <div className={className}>Notifications</div>
              </NavItem>
            </NavLink>

            <NavItem
              onClick={onClick}
              className="w-full  rounded-md bg-white-A700 p-4 shadow-md shadow-gray-300"
            >
              <IoLogOutOutline />
              <div className={className}> Logout</div>
            </NavItem>
          </>
        )}
        {/* {!authenticated && (
          <>
            <Link
              className="w-auto rounded-md bg-white-A700 p-4 shadow-md shadow-gray-300 sm:w-full"
              to="/login"
            >
              <NavItem>
                <MdLogin className="" />
                <div>Login</div>
              </NavItem>
            </Link>
            <Link className="w-auto sm:w-full" to="register">
              <NavItem>
                <IoCreateOutline className="" />
                <div>Register</div>
              </NavItem>
            </Link>
          </>
        )} */}
      </ul>
    </nav>
  );
}
