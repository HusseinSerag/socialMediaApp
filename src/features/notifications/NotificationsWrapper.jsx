import FullPageSpinner from "../../ui/FullPageSpinner";
import { Heading } from "../../ui/Heading";
import useGetNotifications from "./useGetNotifications";

export default function NotificationsWrapper() {
  const { notifications, isLoading } = useGetNotifications();
  if (isLoading) return <FullPageSpinner />;
  return (
    <div>
      <Heading size="xl" className="mb-4 font-semibold">
        Your notifications
      </Heading>
      {notifications.map((notify) => notify.id)}
    </div>
  );
}
