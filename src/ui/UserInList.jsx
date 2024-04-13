import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function UserInList({ user, loggedInUser }) {
  const isUser = user.id === loggedInUser.id;

  return (
    <Link to={isUser ? `/you` : `/profile/${user.id}`}>
      <div className="flex cursor-pointer items-center gap-4 p-3 hover:bg-gray-100">
        <Avatar size="sm" avatar={user.profilePicture} name={user.username} />
        <span>{user.username}</span>
      </div>
    </Link>
  );
}
