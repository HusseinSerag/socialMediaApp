import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateNotification } from "../../services/notificationsApi";

export function useUpdateNotifcations() {
  const queryClient = useQueryClient();
  const { mutate: update, isPending } = useMutation({
    mutationFn: updateNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      toast.success("Notification updated");
    },
    onError: (error) => toast.error(error.message),
  });
  return { update, isPending };
}
