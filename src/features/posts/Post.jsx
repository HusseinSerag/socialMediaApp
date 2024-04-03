import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";
import { formatDistanceToNow } from "date-fns";
import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";

export default function Post({ post }) {
  const date = new Date(post.created_at);

  return (
    <div className="space-y-1 rounded-lg bg-gray-50 p-3">
      <div className="flex  gap-4">
        <Avatar
          size="sm"
          name={post.users.username}
          avatar={post.users.profilePicture}
        />
        <div>
          <div className="flex items-center gap-2">
            <Link to={`/profile/${post.users.id}`}>
              <span className="text-sm font-semibold">
                {post.users.username}
              </span>
            </Link>

            <span className="text-xs font-light text-gray-600">
              {formatDistanceToNow(date, {
                addSuffix: true,
                includeSeconds: true,
              })}
            </span>
          </div>
          <span>{post.postContent}</span>
          <div className="mt-4 flex space-x-8">
            <FaRegComment className="h-[17px] w-[17px]" />
            <BiLike className="h-[19px] w-[19px]" />
            <FaRegBookmark className="h-[17px] w-[17px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
