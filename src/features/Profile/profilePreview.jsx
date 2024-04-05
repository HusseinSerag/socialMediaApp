import useIfFriendIsUser from "../../hooks/useIfFriendIsUser";
import UserProfile from "./UserProfile";

export default function ProfilePreview() {
  const {
    isLoading,
    isLoadingGetUser,
    isLoadingUserFriend,
    error,
    userError,
    refetchUser,
    user,
    friends,
  } = useIfFriendIsUser();

  return (
    <UserProfile
      key={user?.id}
      isLoading={isLoading}
      isLoadingGetUser={isLoadingGetUser}
      isLoadingUserFriend={isLoadingUserFriend}
      userError={userError}
      error={error}
      refetchUser={refetchUser}
      user={user}
      friends={friends}
    />
  );
}
