import { useCallback, useEffect } from "react";
import useGetNotifications from "./useGetNotifications";
import supabase from "../../services/supabase";
import {
  LIKE_POST_FRIEND_REQUEST,
  NOTIFICATION_REASON_FRIEND_REQUEST,
  NOTIFICATIONS_TABLE_NAME,
} from "../../utils/Constants";
import toast from "react-hot-toast";
import { useUser } from "../auth/useUser";

export default function NotificationsReceived() {
  const { refetch } = useGetNotifications();
  const { user } = useUser();
  const handleInserts = useCallback(
    (data) => {
      const newData = data.new;
      const { reason, additionalData } = newData;

      switch (reason) {
        case NOTIFICATION_REASON_FRIEND_REQUEST:
          toast(`You got a new friend request from ${additionalData.username}`);
          break;
        case LIKE_POST_FRIEND_REQUEST:
          toast(`${additionalData.username} liked your post!`);
      }

      refetch();
    },
    [refetch],
  );
  useEffect(() => {
    if (!user?.id) return;
    const subscription = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: NOTIFICATIONS_TABLE_NAME,
          filter: `userId=eq.${user?.id}`,
        },
        handleInserts,
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [handleInserts, user?.id]);

  return <></>;
}
