import { useSignup } from "../../contexts/SignUpStage";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import FullPageSpinner from "../../ui/FullPageSpinner";
import { UPLOAD } from "../../utils/Constants";
import { useUser } from "./useUser";

export default function UploadPhoto() {
  const { dispatch } = useSignup();
  const { isLoading, user, error, refetchUser } = useUser();
  function skip() {
    dispatch({ type: UPLOAD });
  }
  if (isLoading) return <FullPageSpinner />;

  function handleError() {
    if (error) {
      refetchUser();
    }
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
  return (
    <div className="h-[80vh] space-y-6">
      <div className="flex flex-col gap-2 px-4 text-center">
        <span className="text-lg font-medium">
          Great to have you on board {user.username}!
        </span>
        <span className="text-xl font-semibold">
          Now upload a photo to make people know who you are!
        </span>
      </div>
    </div>
  );
}
