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
import { Heading } from "../../ui/Heading";
import { Textarea } from "../../ui/Textarea";
import HeroSection from "../../ui/HeroSection";

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
    <>
      <HeroSection title="Tell us more about yourself." />
      <div className="mx-8 mt-32 space-y-8 md:mx-16">
        <div className="flex items-center  justify-between gap-3">
          <div>
            <Heading size="lg" as="h1">
              Tell us more about yourself!
            </Heading>
          </div>
          {/* <Button onClick={skip} type="secondary">
          <IoArrowBackOutline />
          Skip
        </Button> */}
        </div>
        <div className="space-y-4">
          <Heading as="h2" size="md">
            Write something about yourself!
          </Heading>
          <Form
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            title=""
            styled={false}
          >
            <Form.Row error={errors?.bio?.message} id="bio">
              <Textarea
                id="bio"
                color="gray_500"
                variant="outline"
                shape="round"
                {...register("bio", {
                  required: "This field is required",
                })}
                className="input w-full"
                placeholder="I like photography!"
              ></Textarea>
              <Form.ButtonContainer>
                <Button type="primary">{BioError ? "Retry" : "Next"}</Button>
              </Form.ButtonContainer>
            </Form.Row>
          </Form>
        </div>
      </div>
    </>
  );
}
