import { useSignup } from "../../contexts/SignUpStage";
import { CREATE, START, UPLOAD } from "../../utils/Constants";
import CreateBio from "./CreateBio";
import RegisterForm from "./RegisterForm";
import UploadPhoto from "./UploadPhoto";

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
  if (status === UPLOAD) {
    return <UploadPhoto />;
  }
}
