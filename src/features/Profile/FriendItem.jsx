import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import useIfFriends from "../friends/useIfFriends";
import { useUser } from "../auth/useUser";
import useSendFriendRequest from "./useSendFriendRequest";

export default function FriendItem({ friend }) {
  const { user } = useUser();

  const { isLoading, areFriends } = useIfFriends(friend.id);

  const { addFriend, isPending } = useSendFriendRequest();

  function addFriendRequest() {
    addFriend({ id1: user.id, id2: friend.id });
  }
  if (isLoading) return;
  if (user.id === friend.id) return;
  const friendsAdded = areFriends === "accepted";
  const pending = areFriends === "pending";
  const notFriends = areFriends === "none" && friend.id !== user.id;

  return (
    <>
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
      {notFriends && (
        <Button onClick={addFriendRequest} type="primary">
          Add Friend
        </Button>
      )}
      {friendsAdded && <Button type="primary">Friends</Button>}
      {pending && <Button type="primary">Request Sent</Button>}
    </>
  );
}
