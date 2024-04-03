import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/authApi";

import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.resetQueries();
      queryClient.removeQueries();

      toast.success("Logged out successfully!");
    },
    onError: (err) => toast.error(err.message),
  });
  return { logout: logoutUser, isPending };
}
