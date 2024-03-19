import { useMutation } from "@tanstack/react-query";
import { setBio } from "../../services/authApi";
export default function useBio() {
  const {
    isPending,
    error,
    mutate: updateBio,
  } = useMutation({
    mutationFn: setBio,
  });
  return { isPending, error, updateBio };
}
