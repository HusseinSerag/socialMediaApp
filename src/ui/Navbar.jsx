import { Link, NavLink } from "react-router-dom";
import { useUser } from "../features/auth/useUser";
import Avatar from "./Avatar";
import FullPageSpinner from "./FullPageSpinner";
import NavItem from "./NavItem";

import { GrSearch } from "react-icons/gr";

const className = "hidden sm:block font-semibold text-sm ";
export default function Navbar() {
  const { user, isLoading, error } = useUser();
  const authenticated = Boolean(user?.id);
  if (isLoading) return <FullPageSpinner />;
  return (
    <nav className="order-2 border-r bg-gray-100 dark:border-r-gray-700 dark:bg-gray-900">
      <ul className="flex h-full items-center gap-4 px-4 sm:flex-col sm:items-start sm:py-6">
        <NavLink>
          <NavItem>
            <GrSearch className="justify-self-center" />
            <div className={className}>Friends Search</div>
          </NavItem>
        </NavLink>
        <Link>
          <NavItem>
            <Avatar name={user.username} avatar={user.profilePicture} />
            <div className={className}>{user.username}</div>
          </NavItem>
        </Link>
      </ul>
    </nav>
  );
}
