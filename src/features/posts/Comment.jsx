import { formatDistanceToNow } from "date-fns";
import { useUser } from "../auth/useUser";
import Avatar from "../../ui/Avatar";
import Menu from "../../ui/Menu";
import Button from "../../ui/Button";

import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { Input } from "../../ui/Input";
import { useEditComment } from "./useEditComment";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import ConfirmModal from "../../ui/ConfirmModal";
import { useDeleteComment } from "./useDeleteComment";

export default function Comment({ comment }) {
  const { user } = useUser();
  const [editMode, setEditMode] = useState(false);
  const isUser = user.id === comment.users.id;
  const isUserPostOwner = comment.posts.postOwner === user.id;
  const [text, setText] = useState(comment.commentContent);

  const { mutate: editComment, isPending: isEditing } = useEditComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
  function writeText(text) {
    setText(text);
  }
  function deleteTheComment() {
    deleteComment({ id: comment.id });
  }
  function edit() {
    if (text === comment.commentContent) {
      toast.error("Please change the comment first");
      return;
    } else if (text.length === 0) {
      toast.error("Cannot have an empty comment");
      return;
    }
    if (!isEditing)
      editComment(
        { commentContent: text, id: comment.id },
        {
          onSuccess: () => {
            toast.success("Comment edited!");
            closeEditMode();
          },
        },
      );
  }
  function openEditMode() {
    setEditMode(true);
  }
  function closeEditMode() {
    setEditMode(false);
    setText(comment.commentContent);
  }
  return (
    <div className="mt-3" key={comment.id}>
      <div className="flex gap-2">
        <Avatar avatar={comment.users.profilePicture} size="sm" />
        <div className="flex flex-col">
          <div className="text-xs font-semibold sm:text-sm">
            {isUser ? "You" : comment.users.username}
          </div>

          <div className="text-[11px] font-light text-gray-600 sm:text-xs">
            {formatDistanceToNow(new Date(comment.created_at), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </div>
          {comment.isEdited && (
            <div className="text-[11px] font-light text-gray-600 sm:text-xs">
              (edited)
            </div>
          )}
        </div>
        {(isUser || isUserPostOwner) && (
          <div className="relative ml-auto">
            <Menu.Toggle name={`menu_toggle_${comment.id}`} />
            <Menu.MenuList
              className="absolute left-[-50px] top-[30px] z-10 rounded-lg bg-white-A700 p-2 shadow-md"
              name={`menu_toggle_${comment.id}`}
            >
              <Menu.Action>
                <Modal.Toggle
                  opens={`modal_toggle_${comment.id}`}
                  render={(click) => (
                    <Button
                      className="flex items-center gap-2 text-sm font-semibold"
                      size=""
                      color=""
                      onClick={click}
                    >
                      <MdDeleteOutline className="h-4 w-4" /> Delete
                    </Button>
                  )}
                />{" "}
              </Menu.Action>
              {isUser && (
                <Menu.Action onClick={openEditMode}>
                  <Button
                    className="flex items-center gap-2 text-sm font-semibold"
                    size=""
                    color=""
                  >
                    <FiEdit2 /> Edit
                  </Button>
                </Menu.Action>
              )}
            </Menu.MenuList>
            <Modal.Content
              render={(close) => (
                <ConfirmModal
                  onClose={close}
                  disabled={isDeleting}
                  onConfirm={deleteTheComment}
                  resourceName="comment"
                />
              )}
              name={`modal_toggle_${comment.id}`}
            />
          </div>
        )}
      </div>
      {!editMode && (
        <div className="mt-2 text-sm">{comment.commentContent}</div>
      )}
      {editMode && (
        <div className="my-2 flex gap-2">
          <Input
            shape="round"
            color="gray_500"
            variant="outline"
            className="grow"
            size="md"
            value={text}
            onChange={(e) => writeText(e.target.value)}
          />
          <Button
            size=""
            color=""
            className="text-sm text-gray-600 hover:underline"
            onClick={edit}
          >
            send
          </Button>
          <Button
            size=""
            color=""
            className="text-sm text-gray-600 hover:underline"
            onClick={closeEditMode}
          >
            cancel
          </Button>
        </div>
      )}
    </div>
  );
}
