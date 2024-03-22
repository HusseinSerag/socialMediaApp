import { useEffect } from "react";
import { useUser } from "../auth/useUser";
import useNavigateTo from "../../hooks/useNavigateTo";
import FullPageSpinner from "../../ui/FullPageSpinner";
import Avatar from "../../ui/Avatar";
import { useParams } from "react-router-dom";
import useGetUser from "./useGetUser";
import Button from "../../ui/Button";
import { FaEdit } from "react-icons/fa";

export default function ProfilePreview() {
  const { isLoading, user } = useGetUser();
  const { id } = useParams();

  const { isLoading: isLoadinUser, user: LoggedInUser } = useUser();
  const authenticated = Boolean(LoggedInUser?.id);
  const go = useNavigateTo();

  useEffect(
    function () {
      if (!authenticated) {
        go("/");
      }
    },
    [authenticated],
  );

  if (isLoading || isLoadinUser) return <FullPageSpinner />;

  const isUser = +id === LoggedInUser.id;
  const haveBio = user.bio?.length;
  return (
    <div className=" relative flex flex-col items-center items-center justify-center gap-2 space-y-5  px-8 py-16  ">
      {isUser && (
        <div className="absolute left-10 top-10">
          <Button type="primary">
            {" "}
            <FaEdit /> Edit
          </Button>
        </div>
      )}
      <Avatar avatar={user?.profilePicture} name={user?.username} size="lg" />
      <div className="flex flex-col text-sm">
        <span>
          Username: <strong>{user.username}</strong>
        </span>
        {isUser && (
          <span>
            Email: <strong>{LoggedInUser.email}</strong>
          </span>
        )}
      </div>
      <div>
        <h1 className=" text-lg font-medium">
          About {isUser ? "you" : user.username}
        </h1>
        {haveBio && user.bio}
        {!haveBio && isUser && (
          <div className="flex flex-col gap-4">
            Hmmmm... it seems that you don't have a bio yet! Add your bio now!
          </div>
        )}
      </div>
    </div>
  );
}
