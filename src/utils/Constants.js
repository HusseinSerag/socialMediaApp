const START = 1;
const CREATE = 2;
const UPLOAD = 3;

const AVATAR_BUCKET_NAME = "avatars";
const USER_TABLE_NAME = "users";
const POSTS_TABLE_NAME = "posts";
const FRIENDS_TABLE_NAME = "friends";

const MAX_CHAR_POST = 80;

const FRIENDS_RETURNED_FRIEND_SEARCH = "accepted";
const PENDING_RETURNED_FRIEND_SEARCH = "pending";
const NOT_FRIENDS_RETURNED_FRIEND_SEARCH = "none";
export {
  START,
  CREATE,
  UPLOAD,
  AVATAR_BUCKET_NAME,
  USER_TABLE_NAME,
  MAX_CHAR_POST,
  POSTS_TABLE_NAME,
  FRIENDS_TABLE_NAME,
  FRIENDS_RETURNED_FRIEND_SEARCH,
  PENDING_RETURNED_FRIEND_SEARCH,
  NOT_FRIENDS_RETURNED_FRIEND_SEARCH,
};
