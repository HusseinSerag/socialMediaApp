import { useForm } from "react-hook-form";
import { useSignup } from "../../contexts/SignUpStage";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { UPLOAD } from "../../utils/Constants";
import { useUser } from "./useUser";

import useBio from "./useBio";
import toast from "react-hot-toast";
import FullPageSpinner from "../../ui/FullPageSpinner";

import { motion } from "framer-motion";
import ErrorMessage from "../../ui/ErrorMessage";
import { IoArrowBackOutline } from "react-icons/io5";
import { Heading } from "../../ui/Heading";
import { Textarea } from "../../ui/Textarea";
import HeroSection from "../../ui/HeroSection";
import { useState } from "react";

const activeClass = "border-black cursor-pointer bg-gray-800 text-white-A700";
export default function CreateBio() {
  const { dispatch } = useSignup();
  const { isLoading, user, error, refetchUser } = useUser();
  const [gender, setGender] = useState("");

  function onChangeGender(chosenGender) {
    const value = gender === chosenGender ? "" : chosenGender;

    setGender(value);
  }
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
    if (!gender) {
      toast.error("Please indicate a gender!");

      return;
    }
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
      <div className="mx-8  space-y-8 md:mx-16">
        <div className="flex items-center  justify-between gap-3">
          {/* <Button onClick={skip} type="secondary">
          <IoArrowBackOutline />
          Skip
        </Button> */}
        </div>
        <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
          <div className="mx-auto max-w-[600px] space-y-3">
            <div>
              <Heading as="h1" size="lg">
                What&apos;s your gender?{" "}
                <span className="text-[11px] font-light text-red-500">
                  {" "}
                  * required
                </span>
              </Heading>
              <div className="flex space-x-4 p-2">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  onClick={() => onChangeGender("male")}
                  className={` 
                  ${gender === "male" && activeClass}  rounded-lg border border-black p-4 hover:cursor-pointer 
                hover:bg-gray-800
                hover:text-white-A700`}
                >
                  Male
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  onClick={() => onChangeGender("female")}
                  className={`
                  ${gender === "female" && activeClass}
                  rounded-lg  border border-black p-4 hover:cursor-pointer hover:border-gray-700 hover:bg-gray-800
                hover:text-white-A700
                `}
                >
                  Female
                </motion.span>
              </div>
            </div>
            <div>
              <Heading as="h1" size="lg">
                Add a bio about yourself so people can know more about you!
              </Heading>
              <Form.Row error={errors?.bio?.message} id="bio">
                <Textarea
                  textareaSize="120px"
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
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
