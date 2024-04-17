import Card from "../../ui/Card";
import {
  COMMENT_POST_REASON,
  LIKE_POST_FRIEND_REQUEST,
  NOTIFICATION_REASON_FRIEND_REQUEST,
} from "../../utils/Constants";
import { IoClose } from "react-icons/io5";
import { useUpdateNotifcations } from "./useUpdateNotification";
import { add, formatDistanceToNow } from "date-fns";
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

  const { created_at } = notify;
  const date = new Date(created_at);
  const time = (
    <div className="text-xs text-gray-800">
      {formatDistanceToNow(date, {
        addSuffix: true,
        includeSeconds: true,
      })}
    </div>
  );
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

          {time}
        </div>
      );
      break;
    case LIKE_POST_FRIEND_REQUEST:
      component = (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center gap-1">
            <span className="flex gap-1 text-sm">
              <Link to={`/profile/${notify.additionalData.sentID}`}>
                <span className="hover:underline">
                  {` ${notify.additionalData.username}`}
                </span>
              </Link>{" "}
              liked your
              <Link
                to={`/profile/${notify.userId}?post=${notify.additionalData.postID}`}
              >
                <span className="text-blue-400 hover:underline">post</span>
              </Link>
            </span>
          </div>

          {time}
        </div>
      );
      break;
    case COMMENT_POST_REASON:
      component = (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm">
              <Link
                to={`/profile/${notify.additionalData.sentID}`}
                className="inline"
              >
                <span className="hover:underline">
                  {` ${notify.additionalData.username}`}
                </span>
              </Link>{" "}
              has commented on your{" "}
              <Link
                to={`/profile/${notify.userId}?post=${notify.additionalData.postID}`}
                className="inline"
              >
                <span className="text-blue-400 hover:underline">post:</span>
              </Link>
              <span className="font-semibold">
                {" "}
                {notify.additionalData.commentContent.length < 10 ? (
                  notify.additionalData.commentContent
                ) : (
                  <span>
                    {notify.additionalData.commentContent.slice(0, 8)}

                    <Link
                      className="inline italic underline "
                      to={`/profile/${notify.userId}?post=${notify.additionalData.postID}`}
                    >
                      {" "}
                      see more...
                    </Link>
                  </span>
                )}
              </span>
            </span>
          </div>

          {time}
        </div>
      );
      break;
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
