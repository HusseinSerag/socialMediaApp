import { useQuery } from "@tanstack/react-query";

import { getNotification } from "../../services/notificationsApi";
import { useUser } from "../auth/useUser";

export default function useGetNotifications() {
  const { user } = useUser();

  const {
    data: notifications,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => getNotification({ id: user?.id }),
  });
  return { notifications, error, isLoading, isError, refetch };
}
