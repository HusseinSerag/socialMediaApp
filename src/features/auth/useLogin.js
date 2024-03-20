import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/authApi";
export function useLogin() {
  const queryClient = useQueryClient();
  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["user"],
      });
    },
  });
  return { login: loginUser, isPending };
}
