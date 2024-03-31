import { useForm } from "react-hook-form";
import { useSignup } from "../../contexts/SignUpStage";
import useNavigateTo from "../../hooks/useNavigateTo";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import Form from "../../ui/Form";
import FullPageSpinner from "../../ui/FullPageSpinner";
import { CREATE } from "../../utils/Constants";

import { useUser } from "./useUser";
import { IoArrowBackOutline, IoArrowForward } from "react-icons/io5";
import useUpdatePhoto from "./useUpdatePhoto";
import SmallLoader from "../../ui/SmallLoader";
import toast from "react-hot-toast";

import Avatar from "../../ui/Avatar";
import { useEffect, useRef, useState } from "react";

export default function UploadPhoto() {
  const { dispatch } = useSignup();
  const { isLoading, user, error, refetchUser } = useUser();
  const go = useNavigateTo();
  const { isPending, uploadAvatar } = useUpdatePhoto();
  const [file, setFile] = useState(null);
  const ref = useRef();

  useEffect(
    function () {
      if (!file) return;
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        ref.current.src = e.target.result;
      });
      reader.readAsDataURL(file);
    },
    [file],
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  function skip(e) {
    e.preventDefault();
    go("/");
  }

  function back(e) {
    e.preventDefault();
    dispatch({ type: CREATE });
  }
  if (isLoading) return <FullPageSpinner />;

  function onSubmit(data) {
    const { avatar } = data;
    const file = avatar[0];

    uploadAvatar(
      { file, id: user.id },
      {
        onSuccess: (data) => {
          toast.success("Avatar uploaded successfully");
          go("/");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  }
  function handleError() {
    if (error) {
      refetchUser();
    }
  }
  if (error) {
    return (
      <ErrorMessage message={error?.message}>
        <Button onClick={handleError}>Try Again</Button>
      </ErrorMessage>
    );
  }

  const prfPic = user.profilePicture || `/defaultPrfPic.jpg`;

  return (
    <>
      <div className="mt-12 h-[80vh] space-y-6 px-4 sm:mt-24">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-lg font-medium">
            Great to have you on board {user.username}!
          </span>
          <span className="text-xl font-semibold">
            Now upload a photo to make people know who you are!
          </span>
        </div>

        <div>
          <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
            <Form.Title />
            <Form.Row>
              <div className="relative flex flex-col items-center justify-center gap-4">
                <div className="relative">
                  <Avatar
                    avatar={prfPic}
                    size="lg"
                    name={`${user.username}`}
                    forwardedRef={ref}
                  />
                  <label className="text-white absolute bottom-0 right-0 text-[1.25rem] font-bold ">
                    <input
                      type="file"
                      {...register("avatar", {
                        required:
                          "Please change the profile picture first before uploading!",
                      })}
                      accept="image/*"
                      className="absolute h-[0.1px] w-[0.1px] appearance-none"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                    <div className=" flex h-[70px] w-[70px] items-center justify-center rounded-full border bg-white-A700">
                      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-indigo-A200">
                        <span className="text-white-A700">&#43;</span>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="text-xs font-medium text-red-500 sm:text-sm">
                  {errors?.avatar?.message}
                </div>
                <Form.ButtonContainer className="w-full max-w-[300px]">
                  <Button
                    type="secondary"
                    size="xl"
                    color="gray_500_33"
                    variant="outline"
                    className="rounded-3xl"
                    onClick={back}
                  >
                    Back
                    <IoArrowForward />
                  </Button>
                  <Button
                    disabled={isPending}
                    size="xl"
                    variant="fill"
                    className="w-full rounded-3xl font-semibold"
                  >
                    {isPending ? <SmallLoader /> : "Upload"}
                  </Button>
                  <Button
                    className="rounded-3xl"
                    size="xl"
                    color="gray_500_33"
                    variant="outline"
                    onClick={skip}
                  >
                    <IoArrowBackOutline />
                    Skip for now
                  </Button>
                </Form.ButtonContainer>
              </div>
            </Form.Row>
          </Form>
        </div>
      </div>
    </>
  );
}
