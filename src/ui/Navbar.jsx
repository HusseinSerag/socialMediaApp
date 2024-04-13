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

const className = "hidden sm:block font-semibold text-sm ";
export default function Navbar() {
  const { user, isLoading, error } = useUser();
  const { logout, isPending } = useLogout();
  const authenticated = Boolean(user?.id);

  if (isLoading || isPending) return;

  function onClick() {
    logout();
  }
  return (
    <nav className="order-2  flex h-[100px] rounded-lg  bg-white-A700 shadow-sm sm:h-max">
      <ul className="flex w-full items-center justify-between gap-4 px-4 sm:flex-col sm:items-start sm:py-10">
        {authenticated && (
          <>
            <NavLink className="sm:w-full" to="/">
              <NavItem className="w-auto rounded-md bg-white-A700 p-4 shadow-md shadow-gray-300 sm:w-full">
                <FaHome className="" />
                <div className={className}>Home</div>
              </NavItem>
            </NavLink>
            <NavLink className="sm:w-full" to="/search">
              <NavItem className="w-auto rounded-md bg-white-A700 p-4 shadow-md shadow-gray-300 sm:w-full">
                <GrSearch className="" />
                <div className={className}>Friends</div>
              </NavItem>
            </NavLink>
            <NavLink className="sm:w-full" to="/saved">
              <NavItem className="rounded-md bg-white-A700 p-4 shadow-md shadow-gray-300 sm:w-full">
                <IoBookmarksOutline />
                <div className={className}>Saved Posts</div>
              </NavItem>
            </NavLink>
            <NavLink className="sm:w-full" to="/search">
              <NavItem className="rounded-md bg-white-A700 p-4 shadow-md shadow-gray-300 sm:w-full">
                <FaRegBell className="" />
                <div className={className}>Notifications</div>
              </NavItem>
            </NavLink>

            {/* <Link
              className=" mt-0 w-auto rounded-md bg-white-A700 p-4 shadow-md shadow-gray-300  sm:w-full"
              to={`you`}
            >
              <NavItem>
                <Avatar
                  name={user.username}
                  avatar={user.profilePicture}
                  size="sm"
                />
                <div className={className}>{user.username}</div>
              </NavItem>
            </Link> */}

            <NavItem
              onClick={onClick}
              className="rounded-md  bg-white-A700 p-4 shadow-md shadow-gray-300 sm:w-full"
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
