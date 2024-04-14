import { useRespondToFriendRequest } from "./useRespondToFriendRequest";
import useSendFriendRequest from "./useSendFriendRequest";

export function useFriendRequest({ user, friend, areFriends }) {
  const { addFriend, isPending } = useSendFriendRequest();

  const { mutate: respond, isPending: isResponding } =
    useRespondToFriendRequest();

  function addFriendRequest() {
    if (!isPending)
      addFriend({ id1: user.id, id2: friend.id, username: user.username });
  }
  function respondToFriendRequest(response) {
    if (!isResponding) {
      respond({ response, requestId: areFriends.requestId });
    }
  }

  return { respondToFriendRequest, addFriendRequest };
}
