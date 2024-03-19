import SignUpStage from "../contexts/SignUpStage";
import SignUpStep from "../features/auth/SignUpStep";

export default function Register() {
  return (
    <SignUpStage>
      <SignUpStep />
    </SignUpStage>
  );
}
