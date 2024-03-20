import { useMutation } from "@tanstack/react-query";
import { uploadPhoto } from "../../services/authApi";
export default function useUpdatePhoto() {
  const { mutate: uploadAvatar, isPending } = useMutation({
    mutationFn: uploadPhoto,
  });
  return { isPending, uploadAvatar };
}
