import { useUser } from "../features/auth/useUser";
import UserInList from "./UserInList";

export default function ListOfUsersInModal({ users }) {
  const { user: loggedInUser } = useUser();
  return (
    <div className="mr-4 h-52 space-y-3 overflow-y-auto p-2">
      {users.map((user) => (
        <UserInList user={user} loggedInUser={loggedInUser} key={user.id} />
      ))}
    </div>
  );
}
