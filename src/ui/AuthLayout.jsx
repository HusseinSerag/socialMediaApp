import { Outlet } from "react-router-dom";
import { useUser } from "../features/auth/useUser";
import { useEffect } from "react";
import useNavigateTo from "../hooks/useNavigateTo";
export default function AuthLayout() {
  const { user } = useUser();
  const authenticated = user?.id;
  const go = useNavigateTo();
  useEffect(function () {
    if (!authenticated) {
      go("/login");
    }
  });
  return authenticated ? <Outlet /> : null;
}
