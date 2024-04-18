import Button from "./Button";
import { Heading } from "./Heading";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className=" relative flex h-screen items-center justify-center">
      <Heading size="lg">Something went wrong...</Heading>
      <p>{error.message}</p>
      <Button
        className="absolute left-5 top-8 cursor-pointer hover:underline"
        size=""
        color=""
        onClick={() => resetErrorBoundary()}
      >
        go back home
      </Button>
    </div>
  );
}
