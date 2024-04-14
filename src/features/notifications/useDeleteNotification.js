import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteNotification } from "../../services/notificationsApi";

export function useDeleteNotifcations() {
  const queryClient = useQueryClient();
  const { mutate: deleteNotify, isPending: isDeleting } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      toast.success("Notification deleted");
    },
    onError: (error) => toast.error(error.message),
  });
  return { deleteNotify, isDeleting };
}
