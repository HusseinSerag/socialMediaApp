import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import useIfFriends from "../friends/useIfFriends";
import { useUser } from "../auth/useUser";

export default function FriendItem({ friend }) {
  const { user } = useUser();

  const { isLoading, areFriends } = useIfFriends(friend.id);
  if (isLoading) return;

  console.log(areFriends, friend.id);
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

      {user.id !== friend.id && (
        <Button type="primary">{areFriends ? "Friends" : "Add Friend"}</Button>
      )}
    </Link>
  );
}
