import Card from "../../ui/Card";
import { NOTIFICATION_REASON_FRIEND_REQUEST } from "../../utils/Constants";
import { IoClose } from "react-icons/io5";
import { useUpdateNotifcations } from "./useUpdateNotification";
import { formatDistanceToNow } from "date-fns";
import { useDeleteNotifcations } from "./useDeleteNotification";

export default function Notify({ notify }) {
  const { update, isPending } = useUpdateNotifcations();

  const { deleteNotify, isDeleting } = useDeleteNotifcations();
  function updateNotification() {
    if (!isPending && !notify.read) {
      const { id } = notify;
      const updatedObject = {
        read: true,
      };
      update({ obj: updatedObject, id });
    }
  }
  function deleteNotification(e) {
    e.stopPropagation();
    if (!isDeleting) {
      const { id } = notify;
      deleteNotify({ id });
    }
  }

  const { created_at } = notify;
  const date = new Date(created_at);
  switch (notify.reason) {
    case NOTIFICATION_REASON_FRIEND_REQUEST:
      return (
        <Card
          className={`cursor-pointer hover:bg-gray-200 ${notify.read ? "bg-gray-200" : "bg-white-A700"}`}
        >
          <div className="flex justify-between" onClick={updateNotification}>
            <div className="flex flex-col gap-2">
              <div>
                You got a friend request from {notify.additionalData.username}
              </div>
              <div className="text-sm text-gray-800">
                {formatDistanceToNow(date, {
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </div>
            </div>
            <IoClose
              onClick={deleteNotification}
              className="h-6 w-6 cursor-pointer  hover:text-gray-800"
            />
          </div>
        </Card>
      );
  }
}
