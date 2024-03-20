import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../../services/authApi";

export function useRegister() {
  const queryClient = useQueryClient();
  const { isPending, mutate: signup } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { isPending, signup };
}
