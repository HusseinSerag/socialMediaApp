import Avatar from "../../ui/Avatar";

export default function FriendIconOnUserProfile({ friend }) {
  return (
    <div>
      <Avatar avatar={friend.profilePicture} name={friend.username} size="sm" />
    </div>
  );
}
