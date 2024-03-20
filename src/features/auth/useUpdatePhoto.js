import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadPhoto } from "../../services/authApi";
export default function useUpdatePhoto() {
  const queryClient = useQueryClient();
  const { mutate: uploadAvatar, isPending } = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
    },
  });
  return { isPending, uploadAvatar };
}
