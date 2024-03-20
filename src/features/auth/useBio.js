import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setBio } from "../../services/authApi";
export default function useBio() {
  const queryClient = useQueryClient();
  const {
    isPending,
    error,
    mutate: updateBio,
  } = useMutation({
    mutationFn: setBio,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
    },
  });
  return { isPending, error, updateBio };
}
