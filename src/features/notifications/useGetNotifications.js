import { useQuery } from "@tanstack/react-query";

import useGetUser from "../Profile/useGetUser";
import { getNotification } from "../../services/notificationsApi";

export default function useGetNotifications() {
  const { user } = useGetUser();

  const {
    data: notifications,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotification({ id: user?.id }),
  });
  return { notifications, error, isLoading, isError, refetch };
}
