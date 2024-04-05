import { useUser } from "../features/auth/useUser";
import useUserFriend from "../features/friends/useUserFriends";
import useGetUser from "../features/Profile/useGetUser";
import { FRIENDS_RETURNED_FRIEND_SEARCH } from "../utils/Constants";

export default function useIfFriendIsUser() {
  const { isLoading, user: loggedInUser, error, refetchUser } = useUser();
  const { error: userError, user: userFriend, isLoadingGetUser } = useGetUser();
  const user = loggedInUser?.id === userFriend?.id ? loggedInUser : userFriend;
  const { data: friends, isLoading: isLoadingUserFriend } = useUserFriend(
    FRIENDS_RETURNED_FRIEND_SEARCH,
    user,
  );

  return {
    isLoading,
    error,
    refetchUser,
    isLoadingGetUser,
    userError,
    friends,
    isLoadingUserFriend,
    user,
  };
}
