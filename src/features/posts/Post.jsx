import postcss from "postcss";
import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";
import { formatDistanceToNow } from "date-fns";

export default function Post({ post }) {
  const date = new Date(post.created_at);
  console.log(post);
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-4">
        <Avatar
          size="sm"
          name={post.users.username}
          avatar={post.users.profilePicture}
        />
        <Link to={`profile/${post.users.id}`}>{post.users.username}</Link>
        {formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })}
      </div>
      {post.postContent}
      <button>like</button>
    </div>
  );
}
