import { useUser } from "../features/auth/useUser";
import useIfFriends from "../features/friends/useIfFriends";
import useUserFriend from "../features/friends/useUserFriends";
import useGetUser from "../features/Profile/useGetUser";
import { FRIENDS_RETURNED_FRIEND_SEARCH } from "../utils/Constants";

export default function useIfFriendIsUser() {
  const { isLoading, user: loggedInUser, error, refetchUser } = useUser();
  const { error: userError, user: userFriend, isLoadingGetUser } = useGetUser();
  const userObject =
    loggedInUser?.id === userFriend?.id
      ? { user: loggedInUser, isUser: true }
      : { user: userFriend, isUser: false };
  const { user, isUser } = userObject;
  const { data: friends, isLoading: isLoadingUserFriend } = useUserFriend(
    FRIENDS_RETURNED_FRIEND_SEARCH,
    user,
  );
  const { isLoadingAreFriends, areFriends } = useIfFriends(user?.id ?? "");

  const usersAreFriends = areFriends?.status === FRIENDS_RETURNED_FRIEND_SEARCH;
  return {
    isLoading,
    error,
    refetchUser,
    isLoadingGetUser,
    userError,
    friends,
    isLoadingUserFriend,
    user,
    isUser,
    isLoadingAreFriends,
    usersAreFriends,
  };
}
