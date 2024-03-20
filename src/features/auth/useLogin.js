import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authApi";
export function useLogin() {
  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: login,
  });
  return { login: loginUser, isPending };
}
