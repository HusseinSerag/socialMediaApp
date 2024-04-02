import { useUser } from "../features/auth/useUser";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import FullPageSpinner from "../ui/FullPageSpinner";
import { Heading } from "../ui/Heading";

export default function UserPage() {
  const { isLoading, user, error, refetchUser } = useUser();
  console.log(user);

  if (isLoading) return <FullPageSpinner />;
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
      <div className="flex w-[70%] max-w-[400px] flex-col items-center rounded-lg bg-white-A700_cc py-12">
        <Avatar name={user.username} avatar={user.profilePicture} size="lg" />
        <Heading as="h1" size="xl" className="mt-4 font-bold">
          {user.username}
        </Heading>
        <Heading as="h2" size="s" className="font-extralight text-gray-600">
          {user.email}
        </Heading>
      </div>
    </div>
  );
}
