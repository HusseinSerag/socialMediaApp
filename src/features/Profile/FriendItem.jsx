import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import useIfFriends from "../friends/useIfFriends";
import { useUser } from "../auth/useUser";
import useSendFriendRequest from "./useSendFriendRequest";
import {
  FRIENDS_RETURNED_FRIEND_SEARCH,
  NOT_FRIENDS_RETURNED_FRIEND_SEARCH,
  PENDING_RETURNED_FRIEND_SEARCH,
} from "../../utils/Constants";
import Menu from "../../ui/Menu";
import { useRespondToFriendRequest } from "./useRespondToFriendRequest";

export default function FriendItem({ friend }) {
  const { user } = useUser();

  const { isLoading, areFriends } = useIfFriends(friend.id);

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
  if (isLoading) return;
  if (user.id === friend.id) return;

  const status = areFriends.status;

  let whoSentRequest, whoRecievedRequest;
  if (status === PENDING_RETURNED_FRIEND_SEARCH) {
    whoSentRequest = areFriends.friend1 === user?.id ? user : friend;
    whoRecievedRequest = whoSentRequest.id === user?.id ? friend : user;
  }

  return (
    <>
      <div className="flex cursor-pointer items-center rounded-lg bg-white-A700 p-3 hover:bg-gray-200">
        <Link to={`/profile/${friend.id}`} className="grow">
          <div className="flex items-center gap-2">
            <Avatar
              size="sm"
              name={friend.username}
              avatar={friend.profilePicture}
            />
            <span>{friend.username}</span>
          </div>
        </Link>
        {status === NOT_FRIENDS_RETURNED_FRIEND_SEARCH && (
          <Button
            size=""
            color=""
            className="rounded-lg bg-blue-400 p-2 text-sm font-semibold text-white-A700"
            onClick={addFriendRequest}
          >
            Add Friend
          </Button>
        )}
        {status === FRIENDS_RETURNED_FRIEND_SEARCH && (
          <div className="relative">
            <Menu.Toggle
              name={`already_friends_${friend.id}_${user.id}`}
              customRender={true}
              render={(click) => (
                <span className="font-semibold" onClick={click}>
                  Friends
                </span>
              )}
            />
            <Menu.MenuList name={`already_friends_${friend.id}_${user.id}`}>
              <Menu.Action>
                <Button
                  size=""
                  color=""
                  className="rounded bg-red-600 p-2 text-white-A700"
                  onClick={() => respondToFriendRequest("delete")}
                >
                  Unfriend
                </Button>
              </Menu.Action>
            </Menu.MenuList>
          </div>
        )}
        {status === PENDING_RETURNED_FRIEND_SEARCH && (
          <div className="relative">
            <>
              {whoSentRequest.id === user.id && (
                <>
                  <Menu.Toggle
                    customRender={true}
                    name={`request_sent_${friend.id}_${user.id}`}
                    render={(click) => (
                      <span onClick={click}>Request sent</span>
                    )}
                  />
                  <Menu.MenuList name={`request_sent_${friend.id}_${user.id}`}>
                    <Menu.Action className="w-[200px]">
                      <Button
                        color=""
                        size=""
                        className=" w-full rounded-lg bg-gray-200 px-4 py-2 "
                        onClick={() => respondToFriendRequest("delete")}
                      >
                        Cancel Request
                      </Button>
                    </Menu.Action>
                  </Menu.MenuList>
                </>
              )}
              {whoSentRequest.id === friend.id && (
                <Menu.Toggle
                  name={`pending_request_${friend.id}_${user.id}`}
                  customRender={true}
                  render={(click) => (
                    <Button
                      size=""
                      className="bg-gray-200 p-2 text-sm font-semibold"
                      color=""
                      onClick={click}
                    >
                      Pending Request
                    </Button>
                  )}
                />
              )}
              <Menu.MenuList name={`pending_request_${friend.id}_${user.id}`}>
                <div className="flex flex-col gap-2 rounded-lg">
                  <Menu.Action>
                    <Button
                      color=""
                      size=""
                      className="  rounded-lg bg-green-600 px-4 py-2 text-white-A700 "
                      onClick={() =>
                        respondToFriendRequest(FRIENDS_RETURNED_FRIEND_SEARCH)
                      }
                    >
                      Accept
                    </Button>
                  </Menu.Action>
                  <Menu.Action>
                    <Button
                      onClick={() => respondToFriendRequest("delete")}
                      color=""
                      size=""
                      className=" w-full rounded-lg bg-red-600 px-4 py-2 text-white-A700 "
                    >
                      reject
                    </Button>
                  </Menu.Action>
                </div>
              </Menu.MenuList>
            </>
          </div>
        )}
      </div>
    </>
  );
}
