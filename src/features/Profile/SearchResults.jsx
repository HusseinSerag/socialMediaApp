import { useSearchFriend } from "../../contexts/FriendsSearchContext";
import ErrorMessage from "../../ui/ErrorMessage";
import Loader from "../../ui/Loader";
import FriendItem from "./FriendItem";

export default function SearchResults() {
  const { users, isLoading, error, search } = useSearchFriend();
  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!users?.length && search !== "")
    return <h2 className="text-lg font-medium">No users found!</h2>;
  if (search === "") {
    return (
      <h2 className="text-lg font-medium">Start searching for friends now!</h2>
    );
  }
  return (
    <div className="space-y-2">
      {users.map((friend) => (
        <FriendItem friend={friend} key={friend.id} />
      ))}
    </div>
  );
}
