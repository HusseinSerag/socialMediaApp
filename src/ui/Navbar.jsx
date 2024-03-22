import { Link, NavLink } from "react-router-dom";
import { useUser } from "../features/auth/useUser";
import Avatar from "./Avatar";
import FullPageSpinner from "./FullPageSpinner";
import NavItem from "./NavItem";

import { GrSearch } from "react-icons/gr";
import { MdLogin } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { useLogout } from "../features/auth/useLogout";

const className = "hidden sm:block font-semibold text-sm ";
export default function Navbar() {
  const { user, isLoading, error } = useUser();
  const { logout, isPending } = useLogout();
  const authenticated = Boolean(user?.id);

  if (isLoading) return <FullPageSpinner />;

  function onClick() {
    logout();
  }
  return (
    <nav className="order-2 border-r bg-gray-100 dark:border-r-gray-700 dark:bg-gray-900">
      <ul className="flex h-full items-center gap-4 px-4 sm:flex-col sm:items-start sm:py-10">
        {authenticated && (
          <>
            <NavLink className="w-auto sm:w-full" to="/">
              <NavItem>
                <FaHome className="justify-self-center" />
                <div className={className}>Home</div>
              </NavItem>
            </NavLink>
            <NavLink className="w-auto sm:w-full" to="/search">
              <NavItem>
                <GrSearch className="justify-self-center" />
                <div className={className}>Friends Search</div>
              </NavItem>
            </NavLink>

            <Link
              className="ml-auto mt-0 w-auto sm:mt-auto sm:w-full"
              to={`/profile/${user.id}`}
            >
              <NavItem>
                <Avatar
                  name={user.username}
                  avatar={user.profilePicture}
                  size="sm"
                />
                <div className={className}>{user.username}</div>
              </NavItem>
            </Link>
            {/* <NavItem onClick={onClick}>
              <IoLogOutOutline className="justify-self-center" />
              <div className={className}> Logout</div>
            </NavItem> */}
          </>
        )}
        {!authenticated && (
          <>
            <Link className="w-auto sm:w-full" to="/login">
              <NavItem>
                <MdLogin className="justify-self-center" />
                <div>Login</div>
              </NavItem>
            </Link>
            <Link className="w-auto sm:w-full" to="register">
              <NavItem>
                <IoCreateOutline className="justify-self-center" />
                <div>Register</div>
              </NavItem>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
