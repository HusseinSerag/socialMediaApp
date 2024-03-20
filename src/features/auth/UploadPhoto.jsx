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

export default function UploadPhoto() {
  const { dispatch } = useSignup();
  const { isLoading, user, error, refetchUser } = useUser();
  const go = useNavigateTo();
  const { isPending, uploadAvatar } = useUpdatePhoto();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  function skip() {
    go("/");
  }
  function back() {
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
        <Button type="secondary" onClick={handleError}>
          Try Again
        </Button>
      </ErrorMessage>
    );
  }
  return (
    <div className="h-[80vh]   space-y-6 px-4">
      <div className="flex flex-col gap-2 text-center">
        <span className="text-lg font-medium">
          Great to have you on board {user.username}!
        </span>
        <span className="text-xl font-semibold">
          Now upload a photo to make people know who you are!
        </span>
      </div>
      <div className="flex justify-between">
        <Button type="secondary" onClick={skip}>
          <IoArrowBackOutline />
          Skip
        </Button>
        <Button type="secondary" onClick={back}>
          Back
          <IoArrowForward />
        </Button>
      </div>
      <div>
        <Form
          styled={false}
          handleSubmit={handleSubmit}
          title="Upload your photo here"
          onSubmit={onSubmit}
        >
          <Form.Title />
          <Form.Row error={errors?.avatar?.message}>
            <div className="flex flex-col items-center justify-center gap-4">
              <input
                type="file"
                {...register("avatar", {
                  required: "This field is required",
                })}
                accept="image/*"
                className="file:dark:blue:950 text-xs file:rounded-md file:border-0 file:bg-blue-700 file:p-2 file:text-xs file:font-medium file:text-white"
              />
              <Button type="primary" disabled={isPending}>
                {isPending ? <SmallLoader /> : "Upload"}
              </Button>
            </div>
          </Form.Row>
        </Form>
      </div>
    </div>
  );
}
