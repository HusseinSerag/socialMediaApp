import { useForm } from "react-hook-form";
import { useSignup } from "../../contexts/SignUpStage";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { UPLOAD } from "../../utils/Constants";
import { useUser } from "./useUser";

import useBio from "./useBio";
import toast from "react-hot-toast";
import FullPageSpinner from "../../ui/FullPageSpinner";

import ErrorMessage from "../../ui/ErrorMessage";
import { IoArrowBackOutline } from "react-icons/io5";

export default function CreateBio() {
  const { dispatch } = useSignup();
  const { isLoading, user, error, refetchUser } = useUser();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });
  const { isPending, updateBio, error: BioError } = useBio();

  if (isLoading || isPending || user === null) return <FullPageSpinner />;

  function skip() {
    dispatch({ type: UPLOAD });
  }
  function onSubmit(data) {
    const { bio } = data;
    updateBio(
      { bio, id: user.id },
      {
        onSuccess: () => {
          toast.success("Bio updated successfully!");
          dispatch({ type: UPLOAD });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
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
  function handleError() {
    if (error) {
      refetchUser();
    }
  }
  return (
    <div className="flex min-h-[80vh] w-[90%] max-w-[600px] flex-col  gap-20">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold sm:text-4xl">
            Welcome {user.username}!
          </h1>
        </div>
        <Button onClick={skip} type="secondary">
          <IoArrowBackOutline />
          Skip
        </Button>
      </div>
      <div className="space-y-4">
        <h2 className="px-4 font-semibold">Write something about yourself!</h2>
        <Form
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          title=""
          styled={false}
        >
          <Form.Row error={errors?.bio?.message} id="bio">
            <textarea
              id="bio"
              {...register("bio", {
                required: "This field is required",
              })}
              className="input w-full"
              placeholder="I like photography!"
            ></textarea>
            <Form.ButtonContainer>
              <Button type="primary">{BioError ? "Retry" : "Next"}</Button>
            </Form.ButtonContainer>
          </Form.Row>
        </Form>
      </div>
    </div>
  );
}
