import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import FullPageSpinner from "../../ui/FullPageSpinner";
import { Heading } from "../../ui/Heading";
import { FRIENDS_RETURNED_FRIEND_SEARCH } from "../../utils/Constants";
import { useUser } from "../auth/useUser";
import useUserFriend from "../friends/useUserFriends";

export default function UserProfile() {
  const { isLoading, user, error, refetchUser } = useUser();
  const { data: friends, isLoading: isLoadingUserFriend } = useUserFriend(
    FRIENDS_RETURNED_FRIEND_SEARCH,
  );

  console.log(friends);
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
  return (
    <div className=" flex flex-col  items-center bg-gray-200 py-12">
      <div className="flex w-[70%] max-w-[400px] flex-col items-center gap-4 rounded-lg bg-white-A700_cc py-12">
        <Avatar name={user.username} avatar={user.profilePicture} size="lg" />
        <Heading as="h1" size="xl" className=" font-bold">
          {user.username}
        </Heading>
        <Heading as="h2" size="s" className="font-extralight text-gray-600">
          {user.email}
        </Heading>

        <div className="mt-2 flex gap-6">
          <span className="flex gap-2">
            <span className="font-semibold">{user.posts.length}</span>
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
            Friends
          </Heading>
        </div>
      </div>
    </div>
  );
}
