import FullPageSpinner from "../../ui/FullPageSpinner";
import { Heading } from "../../ui/Heading";
import Notify from "./Notify";
import useGetNotifications from "./useGetNotifications";

export default function NotificationsWrapper() {
  const { notifications, isLoading } = useGetNotifications();
  if (isLoading) return <FullPageSpinner />;
  return (
    <div>
      <Heading size="xl" className="mb-4 font-semibold">
        Your notifications
      </Heading>

      {notifications.length === 0 && (
        <>
          <div className="text-center text-sm text-gray-900 ">
            You haven&apos;t recieved any notifications
          </div>
        </>
      )}

      {notifications.map((notify) => (
        <Notify notify={notify} key={notify.id} />
      ))}
    </div>
  );
}
