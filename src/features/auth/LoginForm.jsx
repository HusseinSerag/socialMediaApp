import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Button from "../../ui/Button";
import SmallLoader from "../../ui/SmallLoader";
import Form from "../../ui/Form";

import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { useLogin } from "./useLogin";
import useNavigateTo from "../../hooks/useNavigateTo";
import Img from "../../ui/Img";
import { Text } from "../../ui/Text";
import { Heading } from "../../ui/Heading";
import { Input } from "../../ui/Input";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();
  const { login, isPending } = useLogin();

  const go = useNavigateTo();
  const [passwordHidden, togglePasswordVisibility] = usePasswordVisibility();

  function onSubmit(data) {
    const { password, email } = data;
    login(
      { password, email },
      {
        onSuccess: (data) => {
          go("/");
          toast.success("Logged in successfully!");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  }
  return (
    <main className="flex  flex-col md:flex-row">
      <div className="relative flex h-[500px] flex-col items-center justify-center gap-3 md:h-auto md:w-[500px]">
        <Img
          src="images/img_image.png"
          alt="modaldesktop"
          className="absolute inset-0 -z-10 h-full w-full justify-center bg-center  object-cover"
        />
        <Heading size="2xl" as="h1" className="text-white-A700 text-center">
          Hello!
        </Heading>

        <Text as="p" size="md" className="!text-white-A700 text-center">
          Don’t have an account yet?
        </Text>

        <motion.div whileTap={{ scale: 1.2 }}>
          <Button size="7xl" className=" rounded-[29px] font-bold sm:px-5">
            <Link to="/register">Create an account</Link>
          </Button>
        </motion.div>
      </div>
      <div className="mx-auto mt-6 w-full max-w-[600px] md:mt-32  md:min-h-screen ">
        <Form
          title="login"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          styled={true}
        >
          <Form.Title>
            <Heading as="div" size="xl" className=" text-center">
              Welcome Back!
            </Heading>{" "}
            <Text as="p" className="mt-2 text-center">
              Sign in to continue{" "}
            </Text>
          </Form.Title>
          <Form.Row label="Email" id="email" error={errors?.email?.message}>
            <Input
              color="gray_500"
              variant="outline"
              shape="round"
              type="email"
              name="email"
              placeholder="user@mail.com"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address!",
                },
              })}
            />
          </Form.Row>

          <Form.Row
            label="Password"
            id="password"
            error={errors?.password?.message}
          >
            <div
              tabIndex="0"
              className=" flex items-center gap-1 rounded-lg border border-solid border-gray-500 px-2 text-gray-500"
            >
              <Input
                type={passwordHidden ? "password" : "text"}
                className="dark:text-gray-300; flex-1 text-sm  focus:outline-none dark:bg-gray-700
              "
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Password must be atleast 8 characters long!",
                  },
                })}
              />
              <div onClick={togglePasswordVisibility}>
                {!passwordHidden ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </div>
            </div>
          </Form.Row>
          <Form.Row
            label="Confirm Password"
            id="c-password"
            error={errors?.cpassword?.message}
          >
            <Input
              type="password"
              color="gray_500"
              variant="outline"
              shape="round"
              className="input"
              {...register("cpassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password
                    ? true
                    : "Passwords don't match!",
              })}
            />
          </Form.Row>
          <Form.ButtonContainer>
            {/* <Button
              disabled={isPending}
              type="secondary"
              onClick={(e) => {
                e.preventDefault();
                reset();
              }}
            >
              reset
            </Button> */}

            <Button
              disabled={isPending}
              className="mx-auto w-[80%] max-w-[400px] rounded-full font-bold"
              size="7xl"
              color="indigo_A200"
              variant="fill"
            >
              {isPending ? <SmallLoader /> : "Login"}
            </Button>
            <Text className="my-4 text-center">Or connect with socials</Text>
            <Button
              color="gray_900"
              size="7xl"
              leftIcon={
                <Img src="images/img_icon_apple.svg" alt="Icon/Apple" />
              }
              className="mx-auto w-[80%] max-w-[400px] gap-4 rounded-full font-bold"
            >
              Connect with Apple
            </Button>
            <Button
              color="gray_500_66"
              size="7xl"
              variant="outline"
              leftIcon={
                <Img src="images/img_icon_google.svg" alt="Icon/Google" />
              }
              className="mx-auto mt-4 w-[80%] max-w-[400px] gap-4 rounded-full font-bold"
            >
              Connect with Google+
            </Button>
          </Form.ButtonContainer>
        </Form>
      </div>
    </main>
  );
}
