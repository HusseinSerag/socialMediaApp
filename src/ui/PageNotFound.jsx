import useNavigateTo from "../hooks/useNavigateTo";
import Button from "./Button";
import { IoArrowBackOutline } from "react-icons/io5";
export default function PageNotFound({ message }) {
  const go = useNavigateTo();
  return (
    <div className="flex h-screen  items-center justify-center ">
      <div className=" relative flex h-[50%] items-center justify-center px-5 text-xl font-semibold">
        <Button
          type="secondary"
          additionalClass="absolute left-5 top-0"
          onClick={() => go()}
        >
          <IoArrowBackOutline /> Go Back
        </Button>
        <div className="text-sm sm:text-lg">
          {message ||
            "Sorry this page doesn't exist , please go back or contact the developer if you think something is wrong!"}
        </div>
      </div>
    </div>
  );
}
