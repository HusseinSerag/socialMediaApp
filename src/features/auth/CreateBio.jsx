import { useSignup } from "../../contexts/SignUpStage";
import { UPLOAD } from "../../utils/Constants";
import { useUser } from "./useUser";

export default function CreateBio() {
  const { state, dispatch } = useSignup();
  const { isLoading, user, error } = useUser();
  console.log(user);
  if (isLoading) return;
  if (error) return;
  return (
    <div>
      <button onClick={() => dispatch({ type: UPLOAD })}>skip</button>
      welcome {user.username}
      create your bio
    </div>
  );
}
