import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
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
  // return (
  //   <div className="flex w-full flex-row  bg-gray-100">
  //     <div className="relative flex w-full flex-col md:flex-row md:gap-5">
  //       <div className="flex w-full flex-col items-center justify-start md:w-[58%] md:flex-row">
  //         <div className="relative h-screen w-full">
  //           <Img
  //             src="images/img_image.png"
  //             alt="image_one"
  //             className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[100%] w-full justify-center object-cover sm:w-full "
  //           />
  //           <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-max flex-col items-center justify-center">
  //             <Heading
  //               size="2xl"
  //               as="h1"
  //               className="!text-white-A700 text-center"
  //             >
  //               Hello!
  //             </Heading>
  //             <a href="#" className="mt-3">
  //               <Text as="p" className="!text-white-A700 text-center">
  //                 Don’t have an account yet?
  //               </Text>
  //             </a>
  //             <div className="mt-[30px] flex w-full flex-row justify-center">
  //               <Button
  //                 size="7xl"
  //                 className="w-full rounded-[29px] font-bold sm:px-5"
  //               >
  //                 Create an account
  //               </Button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className=" relative flex flex-1 flex-col items-center justify-start py-4 md:ml-0 md:w-full">
  //         <div className="relative h-full w-full ">
  //           <Img
  //             src="images/img_modal_desktop.svg"
  //             alt="modaldesktop"
  //             className="absolute inset-0 m-auto h-screen max-w-[unset] justify-center"
  //           />
  //           <div className="relative z-50 m-auto flex h-max w-max flex-col items-center justify-center py-4">
  //             <Img
  //               src="images/img_standard_collection.svg"
  //               alt="standard_one"
  //               className="h-[41px] w-[41px]"
  //             />
  //             <Heading size="xl" as="h2" className="mt-[50px]">
  //               Welcome Back!{" "}
  //             </Heading>
  //             <Text as="p" className="mt-2">
  //               Sign in to continue{" "}
  //             </Text>
  //             <div className="mt-4 flex w-full flex-col items-start justify-start gap-3">
  //               <Heading
  //                 size="s"
  //                 as="h3"
  //                 className="uppercase tracking-[1.00px]"
  //               >
  //                 Email
  //               </Heading>
  //               <Input
  //                 color="gray_500"
  //                 variant="outline"
  //                 shape="round"
  //                 type="email"
  //                 name="email"
  //                 placeholder="user@mail.com"
  //                 suffix={
  //                   <Img
  //                     src="images/img_icon_checkcircle.svg"
  //                     alt="Icon/Check-Circle"
  //                   />
  //                 }
  //                 className="w-full gap-[35px] sm:w-full"
  //               />
  //             </div>
  //             <div className="mt-8 flex w-full flex-col items-start justify-start gap-3">
  //               <Heading
  //                 size="s"
  //                 as="h4"
  //                 className="uppercase tracking-[1.00px]"
  //               >
  //                 Password
  //               </Heading>
  //               <Input
  //                 color="gray_500"
  //                 variant="outline"
  //                 shape="round"
  //                 type="password"
  //                 name="password"
  //                 placeholder="Password@123"
  //                 suffix={<Img src="images/img_icon_eye.svg" alt="Icon/Eye" />}
  //                 className="w-full gap-[35px] sm:w-full"
  //               />
  //             </div>
  //             <a href="#" className="mt-[23px]">
  //               <Text as="p" className="!text-indigo-A200 !font-normal">
  //                 Forgot Password?
  //               </Text>
  //             </a>
  //             <div className="mt-[31px] flex w-full flex-row justify-center">
  //               <Button
  //                 size="7xl"
  //                 className="w-full rounded-[29px] font-bold sm:px-5"
  //               >
  //                 Login
  //               </Button>
  //             </div>
  //             <Text size="s" as="p" className="mt-8">
  //               Or connect with socials
  //             </Text>

  //             <div className="mt-5 flex w-full flex-row justify-center">
  //               <Button
  //                 color="gray_900"
  //                 size="7xl"
  //                 leftIcon={
  //                   <Img src="images/img_icon_apple.svg" alt="Icon/Apple" />
  //                 }
  //                 className="w-full gap-[5px] rounded-[29px] font-bold sm:px-5"
  //               >
  //                 Connect with Apple
  //               </Button>
  //             </div>
  //             <Button
  //               color="gray_500_66"
  //               size="7xl"
  //               variant="outline"
  //               leftIcon={
  //                 <Img src="images/img_icon_google.svg" alt="Icon/Google" />
  //               }
  //               className="mt-5 w-full gap-1 rounded-[29px] font-bold sm:px-5"
  //             >
  //               Connect with Google+
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <main className="flex h-screen flex-col sm:flex-row">
      <div className="relative flex h-[500px] flex-col items-center justify-center gap-3 sm:h-full sm:w-[500px]">
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
      <div className="w-full">
        <Form
          title="Log Into Your Account"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          styled={true}
        >
          <Form.Title />
          <Form.Row
            label="Email Address"
            id="email"
            error={errors?.email?.message}
          >
            <input
              type="email"
              className="input"
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
              className=" input flex items-center gap-1 [&>div>svg]:h-[1.2rem] [&>div>svg]:w-[1.2rem]"
            >
              <input
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
            <input
              type="password"
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
            <Button
              disabled={isPending}
              type="secondary"
              onClick={(e) => {
                e.preventDefault();
                reset();
              }}
            >
              reset
            </Button>
            <Button disabled={isPending} type="primary">
              {isPending ? <SmallLoader /> : "Login"}
            </Button>
          </Form.ButtonContainer>

          <Form.Footer>
            Don&apos;t have an account?
            <Link to="/register" className="font-semibold underline">
              {" "}
              Sign up!
            </Link>
          </Form.Footer>
        </Form>
      </div>
    </main>
  );
}
