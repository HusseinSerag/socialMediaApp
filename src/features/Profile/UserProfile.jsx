import useNavigateTo from "../../hooks/useNavigateTo";
import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import FullPageSpinner from "../../ui/FullPageSpinner";
import { Heading } from "../../ui/Heading";

import FriendIconOnUserProfile from "../friends/FriendIconOnUserProfile";

import { FiEdit2 } from "react-icons/fi";

import { format } from "date-fns";

import PostWrapper from "../posts/PostWrapper";
import {
  FRIENDS_RETURNED_FRIEND_SEARCH,
  PENDING_RETURNED_FRIEND_SEARCH,
  PRIVATE_ACCOUNT_TYPE,
  PUBLIC_ACCOUNT_TYPE,
} from "../../utils/Constants";

import PrivateAccountIndicator from "../../ui/PrivateAccountIndicator";
import Card from "../../ui/Card";
import Menu from "../../ui/Menu";
import { useFriendRequest } from "./useFriendRequest";

import { useState } from "react";
import { Input } from "../../ui/Input";
import useUpdatePhoto from "../auth/useUpdatePhoto";
import toast from "react-hot-toast";
import useBio from "../auth/useBio";
import Loader from "../../ui/Loader";

export default function UserProfile({
  isLoading,
  isLoadingGetUser,
  isLoadingUserFriend,
  error,
  userError,
  refetchUser,
  user,
  isUser,
  friends,
  isLoadingAreFriends,
  usersAreFriends,
  areFriends,
  friend,
  loggedInUser,
}) {
  const goBack = useNavigateTo();
  const { addFriendRequest, respondToFriendRequest } = useFriendRequest({
    areFriends,
    friend,
    user: loggedInUser,
  });

  const Loading =
    isLoading ||
    isLoadingUserFriend ||
    isLoadingGetUser ||
    !user?.id ||
    isLoadingAreFriends;

  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bioUpdate, setBioUpdate] = useState(user?.bio);

  const { isPending: isUploading, uploadAvatar } = useUpdatePhoto();
  const { isPending: isUpdatingBio, updateBio } = useBio();
  function changeBio(e) {
    setBioUpdate(e.target.value);
  }
  function updateUserBio() {
    if (bioUpdate === user.bio) {
      toast.error("Change the bio first please!");
      return;
    }

    const obj = {
      bio: bioUpdate,
    };
    updateBio(
      { id: user.id, obj },
      {
        onSuccess: () => {
          toast.success("Bio successfully updated!");
          setBioUpdate(bioUpdate);
        },
      },
    );
  }
  if (Loading) return <FullPageSpinner />;
  if (error || userError)
    return (
      <div className="flex h-full items-center justify-center">
        <ErrorMessage message={error?.message || userError?.message}>
          <Button onClick={() => refetchUser()} className="rounded-lg p-5">
            retry
          </Button>
        </ErrorMessage>
      </div>
    );

  const hasProfilePicture = user?.profilePicture !== null;
  function update() {
    if (file)
      uploadAvatar(
        {
          id: user.id,
          photoAlreadyExists: hasProfilePicture,
          file,
          photoURLIfExists: hasProfilePicture && user.profilePicture,
        },
        {
          onSuccess: () => {
            toast.success("Profile picture successfully updated!");
            setFile(false);
            setPreview(false);
          },
        },
      );
    else toast.error("Please upload a picture first!");
  }
  function handleInputPhoto(e) {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const photoObj = URL.createObjectURL(file);
      setPreview(photoObj);
    }
  }
  const posts = user?.posts;

  const accountType =
    user?.accountType === PUBLIC_ACCOUNT_TYPE
      ? PUBLIC_ACCOUNT_TYPE
      : PRIVATE_ACCOUNT_TYPE;

  const canSeeAccountPost =
    isUser || accountType === PUBLIC_ACCOUNT_TYPE || usersAreFriends;

  let whoRecievedRequest;
  if (areFriends?.status === PENDING_RETURNED_FRIEND_SEARCH)
    whoRecievedRequest =
      areFriends?.friend1 === loggedInUser?.id ? loggedInUser : friend;

  function openEditMode() {
    setEditMode(true);
  }
  function closeEditMode() {
    setEditMode(false);
  }
  function cancelFileUpload() {
    setFile(null);
    setPreview(null);
  }
  function resetBioToOriginalValue() {
    setBioUpdate(user.bio);
  }
  return (
    <Menu>
      <Card>
        <div className="  flex flex-col  items-center">
          <div className="relative flex w-full  flex-col items-center gap-4 rounded-lg bg-white-A700_cc py-12">
            <Button
              color="gray_500"
              variant="outline"
              className="absolute left-2 top-2 rounded-lg"
              onClick={() => goBack()}
            >
              Back
            </Button>
            {isUser && !editMode && (
              <FiEdit2
                onClick={openEditMode}
                className="absolute right-2 top-2 h-5 w-5 cursor-pointer "
              />
            )}
            {isUser && editMode && (
              <Button
                onClick={closeEditMode}
                size=""
                color=""
                className="absolute right-2 top-2 text-sm font-semibold hover:underline "
              >
                Done
              </Button>
            )}

            <div className="relative">
              <Avatar
                name={user?.username}
                avatar={editMode && preview ? preview : user?.profilePicture}
                size="lg"
              />
              {isUser && editMode && !isUploading && (
                <label className="text-white absolute bottom-0 right-0 text-[1.25rem] font-bold ">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute hidden h-[0.1px] w-[0.1px] appearance-none"
                    onChange={handleInputPhoto}
                  />
                  <div className=" z-10 flex h-[70px] w-[70px] items-center justify-center rounded-full border bg-white-A700">
                    <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-indigo-A200">
                      <span className="text-white-A700">&#43;</span>
                    </div>
                  </div>
                </label>
              )}
              {isUploading && (
                <div className="-z-1 absolute inset-0 flex items-center justify-center rounded-full bg-gray-200 opacity-70">
                  <Loader />
                </div>
              )}
            </div>
            {editMode && file && (
              <div className="flex gap-4">
                <Button
                  size=""
                  color=""
                  className="font-semibold hover:underline"
                  onClick={cancelFileUpload}
                >
                  Cancel
                </Button>{" "}
                <Button
                  size=""
                  color=""
                  className="font-semibold hover:underline"
                  onClick={update}
                  disabled={isUploading}
                >
                  Upload
                </Button>{" "}
              </div>
            )}

            <Heading
              as="h1"
              size="xl"
              className="w-[250px] break-words text-center font-bold"
            >
              {user?.username} {isUser && "(You)"}
            </Heading>
            {!isUser && (
              <Heading as="h2" size="m">
                {!usersAreFriends ? (
                  areFriends.status === PENDING_RETURNED_FRIEND_SEARCH ? (
                    <div className="relative flex flex-col font-semibold">
                      {whoRecievedRequest.id === loggedInUser.id ? (
                        <>
                          <Menu.Toggle
                            customRender={true}
                            name={`cancel_request_${user.id}`}
                            render={(click) => (
                              <div onClick={click} className="font-semibold">
                                Request Sent
                              </div>
                            )}
                          />
                          <Menu.MenuList
                            className="absolute top-10"
                            name={`cancel_request_${user.id}`}
                          >
                            <Menu.Action>
                              <Button
                                size=""
                                color=""
                                className=" rounded-lg bg-red-600 px-2 py-4 text-white-A700"
                                onClick={() => respondToFriendRequest("delete")}
                              >
                                Cancel Request
                              </Button>
                            </Menu.Action>
                          </Menu.MenuList>
                        </>
                      ) : (
                        <>
                          <Menu.Toggle
                            customRender={true}
                            name={`pending_request_${user.id}`}
                            render={(click) => (
                              <div onClick={click} className="font-semibold">
                                Request Pending
                              </div>
                            )}
                          />
                          <Menu.MenuList name={`pending_request_${user.id}`}>
                            <div className="flex flex-col gap-2 rounded-lg">
                              <Menu.Action>
                                <Button
                                  color=""
                                  size=""
                                  className="  rounded-lg bg-green-600 px-4 py-2 text-white-A700 "
                                  onClick={() =>
                                    respondToFriendRequest(
                                      FRIENDS_RETURNED_FRIEND_SEARCH,
                                    )
                                  }
                                >
                                  Accept
                                </Button>
                              </Menu.Action>
                              <Menu.Action>
                                <Button
                                  onClick={() =>
                                    respondToFriendRequest("delete")
                                  }
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
                      )}
                    </div>
                  ) : (
                    <Button
                      size=""
                      onClick={() => addFriendRequest()}
                      color=""
                      className="rounded-lg bg-green-600 p-2 font-semibold text-white-A700"
                    >
                      Add Friend{" "}
                    </Button>
                  )
                ) : (
                  areFriends.status === FRIENDS_RETURNED_FRIEND_SEARCH && (
                    <div className="relative flex flex-col font-semibold">
                      <Menu.Toggle
                        name={`unfriend_${user.id}`}
                        customRender={true}
                        render={(open) => (
                          <span className="bg-gray-100 p-2" onClick={open}>
                            Friends
                          </span>
                        )}
                      />
                      <Menu.MenuList
                        className="absolute top-10"
                        name={`unfriend_${user.id}`}
                      >
                        <Menu.Action>
                          <Button
                            size=""
                            color=""
                            className=" rounded-lg bg-red-600 px-2 py-4 text-white-A700"
                            onClick={() => respondToFriendRequest("delete")}
                          >
                            Unfriend
                          </Button>
                        </Menu.Action>
                      </Menu.MenuList>
                    </div>
                  )
                )}
              </Heading>
            )}
            <Heading as="h2" size="s" className="font-extralight text-gray-600">
              {user?.email}
            </Heading>

            <div className="mt-2 flex gap-6">
              <span className="flex gap-2">
                <span className="font-semibold">{posts?.length}</span>
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
              <span className="text-[13px] text-gray-600">
                {" "}
                {editMode ? (
                  <div className="flex gap-2">
                    <Input
                      size="md"
                      shape="round"
                      color="gray_500"
                      variant="outline"
                      onChange={changeBio}
                      value={bioUpdate}
                      className="grow"
                    />
                    <Button
                      color=""
                      size=""
                      className="font-semibold hover:underline"
                      onClick={updateUserBio}
                      disabled={isUpdatingBio}
                    >
                      Update
                    </Button>
                    <Button
                      color=""
                      size=""
                      className="font-semibold hover:underline"
                      onClick={resetBioToOriginalValue}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : user?.bio ? (
                  user?.bio
                ) : isUser ? (
                  "Hmmmm it seems you don't have a bio yet, edit this and add your bio!"
                ) : (
                  `${user.username} doesn't seem to have a bio at the moment!`
                )}
              </span>
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
                {format(
                  new Date(user?.birthdate || new Date().toISOString()),
                  "dd MMM uuuu",
                )}
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
                {friends.length === 0 && "No Friends"}
                {friends?.map((friend) => (
                  <FriendIconOnUserProfile friend={friend} key={friend.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="sm:p-8">
        <Heading as="h1" className="mb-4 break-words" size="2xl">
          {isUser ? "Your" : `${user?.username}'s`} Posts
        </Heading>
        {canSeeAccountPost ? (
          user?.id && <PostWrapper id={user?.id} />
        ) : (
          <PrivateAccountIndicator username={user?.username} />
        )}
      </div>
    </Menu>
  );
}
