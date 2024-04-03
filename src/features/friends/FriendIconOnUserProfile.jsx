import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";

export default function FriendIconOnUserProfile({ friend }) {
  return (
    <Link to={`/profile/${friend.id}`}>
      <Avatar avatar={friend.profilePicture} name={friend.username} size="sm" />
    </Link>
  );
}
