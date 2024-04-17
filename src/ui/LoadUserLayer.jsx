import { Outlet } from "react-router-dom";
import { useUser } from "../features/auth/useUser";
import FullPageSpinner from "./FullPageSpinner";

export default function LoadUserLayer() {
  const { isLoading } = useUser();
  if (isLoading) return <FullPageSpinner />;
  return <Outlet />;
}
