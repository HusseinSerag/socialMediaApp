import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { Link } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { useRegister } from "./useRegister";
import { useSignup } from "../../contexts/SignUpStage";
import { CREATE } from "../../utils/Constants";
import SmallLoader from "../../ui/SmallLoader";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();
  const { dispatch } = useSignup();
  const { isPending, signup } = useRegister();
  function onSubmit(data) {
    const { password, email, username } = data;
    console.log(password, email);
    signup(
      { email, password, username },
      {
        onSuccess: () => {
          dispatch({ type: CREATE });
        },
        onError: (err) => {},
      },
    );
  }

  const [passwordHidden, togglePasswordVisibility] = usePasswordVisibility();
  return (
    <Form
      title="Sign Up For New Account"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      <Form.Title />
      <Form.Row label="Email Address" id="email" error={errors?.email?.message}>
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
        label="Username"
        id="username"
        error={errors?.username?.message}
      >
        <input
          type="text"
          className="input"
          {...register("username", {
            required: "This field is required",
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
              value === getValues().password ? true : "Passwords don't match!",
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
        <Button type="primary" disabled={isPending}>
          {!isPending ? "Sign up" : <SmallLoader />}
        </Button>
      </Form.ButtonContainer>
      <Form.Footer>
        Already have an account?
        <Link to="/login" className="font-semibold underline">
          {" "}
          Login!
        </Link>
      </Form.Footer>
    </Form>
  );
}
