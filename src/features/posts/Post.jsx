import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";
import { formatDistanceToNow } from "date-fns";
import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import Menu from "../../ui/Menu";
import { MdOutlineDelete } from "react-icons/md";
import { useUser } from "../auth/useUser";
import Modal from "../../ui/Modal";

export default function Post({ post }) {
  const date = new Date(post.created_at);
  const { user } = useUser();
  const isUser = user?.id === post.users.id;
  return (
    <div className="space-y-1 rounded-lg bg-gray-50 p-3">
      <div className="flex  gap-4">
        <Avatar
          size="sm"
          name={post.users.username}
          avatar={post.users.profilePicture}
        />
        <div className="w-full">
          <div className="mb-3 flex items-center gap-2">
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
            <span className="relative ml-auto">
              <Menu.Toggle
                name={post.id}
                render={(onClick) => (
                  <CiMenuKebab
                    className="h-6 w-6 cursor-pointer"
                    onClick={onClick}
                  />
                )}
              />
              <Menu.MenuList name={post.id}>
                {isUser && (
                  <Modal.Toggle
                    opens={post.id}
                    render={(click) => (
                      <Menu.Action onClick={click}>
                        <span className=" flex w-max items-center gap-2 rounded-lg">
                          <MdOutlineDelete className="h-5 w-5 font-semibold" />{" "}
                          <span className="cursor-pointer text-sm font-semibold">
                            {" "}
                            Delete Post
                          </span>
                        </span>
                      </Menu.Action>
                    )}
                  />
                )}
              </Menu.MenuList>
              <Modal.Content name={post.id} />
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
