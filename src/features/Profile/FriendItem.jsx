import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";

export default function FriendItem({ friend }) {
  return (
    <Link className="block" to={`/profile/${friend.id}`}>
      <div className="flex cursor-pointer items-center gap-3 p-2 hover:bg-gray-200">
        <Avatar
          size="sm"
          name={friend.username}
          avatar={friend.profilePicture}
        />
        {friend.username}
      </div>
    </Link>
  );
}
