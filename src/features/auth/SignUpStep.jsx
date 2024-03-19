import { useSignup } from "../../contexts/SignUpStage";
import { CREATE, START } from "../../utils/Constants";
import CreateBio from "./CreateBio";
import RegisterForm from "./RegisterForm";

export default function SignUpStep() {
  const {
    state: { status },
  } = useSignup();

  if (status === START) {
    return <RegisterForm />;
  }
  if (status === CREATE) {
    return <CreateBio />;
  }
}
