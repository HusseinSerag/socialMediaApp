import useNavigateTo from "../../hooks/useNavigateTo";
import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import FullPageSpinner from "../../ui/FullPageSpinner";
import { Heading } from "../../ui/Heading";
import { FRIENDS_RETURNED_FRIEND_SEARCH } from "../../utils/Constants";

import { useUser } from "../auth/useUser";
import FriendIconOnUserProfile from "../friends/FriendIconOnUserProfile";
import useUserFriend from "../friends/useUserFriends";
import { FiEdit2 } from "react-icons/fi";

import { LiaUserFriendsSolid } from "react-icons/lia";
import { format } from "date-fns";

import PostWrapper from "../posts/PostWrapper";

export default function UserProfile() {
  const { isLoading, user, error, refetchUser } = useUser();
  const { data: friends, isLoading: isLoadingUserFriend } = useUserFriend(
    FRIENDS_RETURNED_FRIEND_SEARCH,
  );

  const goBack = useNavigateTo();

  if (isLoading || isLoadingUserFriend) return <FullPageSpinner />;
  if (error)
    return (
      <div className="flex h-full items-center justify-center">
        <ErrorMessage message={error.message}>
          <Button onClick={() => refetchUser()} className="rounded-lg p-5">
            retry
          </Button>
        </ErrorMessage>
      </div>
    );

  const posts = user.posts;

  return (
    <>
      <div className=" flex flex-col  items-center bg-gray-200 py-12">
        <div className="relative flex w-[70%] max-w-[400px] flex-col items-center gap-4 rounded-lg bg-white-A700_cc py-12">
          <Button
            color="gray_500"
            variant="outline"
            className="absolute left-2 top-2 rounded-lg"
            onClick={() => goBack()}
          >
            Back
          </Button>
          <FiEdit2 className="absolute right-2 top-2 h-5 w-5 cursor-pointer" />
          <Avatar name={user.username} avatar={user.profilePicture} size="lg" />
          <Heading as="h1" size="xl" className=" font-bold">
            {user.username}
          </Heading>
          <Heading as="h2" size="s" className="font-extralight text-gray-600">
            {user.email}
          </Heading>

          <div className="mt-2 flex gap-6">
            <span className="flex gap-2">
              <span className="font-semibold">{posts.length}</span>
              <span className="text-gray-500">Posts</span>
            </span>
            <span className="flex gap-2">
              <span className="font-semibold">{friends?.length}</span>
              <span className="text-gray-500">
                Friend{friends?.length > 1 ? "s" : ""}
              </span>
            </span>
          </div>
          <div className="mt-4 w-full px-4">
            <Heading
              as="h2"
              size="lg"
              className="mb-2 font-semibold uppercase tracking-wide"
            >
              About
            </Heading>
            <p className="text-[13px] text-gray-600">
              {user.bio
                ? user.bio
                : "Hmmmm it seems you don't have a bio yet, edit this and add your bio!"}
            </p>
          </div>
          <div className="mt-4 w-full px-4">
            <Heading
              as="h2"
              size="lg"
              className="mb-2 font-semibold uppercase tracking-wide"
            >
              Birthday
            </Heading>
            <p className="text-[13px] text-gray-600">
              {format(new Date(user.birthdate), "dd MMM uuuu")}
            </p>
          </div>
          <div className="mt-4 w-full px-4">
            <Heading
              as="h2"
              size="lg"
              className="mb-2 font-semibold uppercase tracking-wide"
            >
              Friends
            </Heading>
            <div className="flex flex-wrap space-x-3">
              {friends.map((friend) => (
                <FriendIconOnUserProfile friend={friend} key={friend.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <Heading as="h1" className="mb-4" size="2xl">
          Your Posts
        </Heading>
        <PostWrapper />
      </div>
    </>
  );
}
