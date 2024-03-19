import { useForm } from "react-hook-form";
import { useSignup } from "../../contexts/SignUpStage";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { UPLOAD } from "../../utils/Constants";
import { useUser } from "./useUser";
import { PiSkipBackBold } from "react-icons/pi";

export default function CreateBio() {
  const { state, dispatch } = useSignup();
  const { isLoading, user, error } = useUser();
  console.log(user);
  const { handleSubmit, register } = useForm();
  if (isLoading) return;
  if (error) return;

  function skip() {
    dispatch({ type: UPLOAD });
  }
  function onSubmit(data) {
    console.log(data);
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
          <PiSkipBackBold />
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
          <textarea
            className="input w-full"
            placeholder="I like photography!"
          ></textarea>
          <Button type="primary">Next</Button>
        </Form>
      </div>
    </div>
  );
}
