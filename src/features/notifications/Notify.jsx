import Card from "../../ui/Card";
import { NOTIFICATION_REASON_FRIEND_REQUEST } from "../../utils/Constants";
import { IoClose } from "react-icons/io5";
import { useUpdateNotifcations } from "./useUpdateNotification";
import { formatDistanceToNow } from "date-fns";
import { useDeleteNotifcations } from "./useDeleteNotification";
import { IoCloseSharp } from "react-icons/io5";

import { ImCheckmark } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

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

  console.log(notify);
  const { created_at } = notify;
  const date = new Date(created_at);
  let component;
  switch (notify.reason) {
    case NOTIFICATION_REASON_FRIEND_REQUEST:
      component = (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center gap-1">
            <span className="flex gap-1 text-sm">
              You got a friend request from{" "}
              <Link to={`/profile/${notify.additionalData.sentID}`}>
                <span className="hover:underline">
                  {` ${notify.additionalData.username}`}
                </span>
              </Link>
            </span>
          </div>

          <div className="text-xs text-gray-800">
            {formatDistanceToNow(date, {
              addSuffix: true,
              includeSeconds: true,
            })}
          </div>
        </div>
      );
  }
  return (
    <Card
      className={`cursor-pointer hover:bg-gray-200 ${notify.read ? "bg-gray-200" : "bg-white-A700"}`}
    >
      <div
        className="flex items-center justify-between"
        onClick={updateNotification}
      >
        {component}
        <IoClose
          onClick={deleteNotification}
          className="h-6 w-6 cursor-pointer  hover:text-gray-800"
        />
      </div>
    </Card>
  );
}
