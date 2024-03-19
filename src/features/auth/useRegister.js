import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/authApi";

export function useRegister() {
  const { isPending, mutate: signup } = useMutation({
    mutationFn: register,
  });

  return { isPending, signup };
}
