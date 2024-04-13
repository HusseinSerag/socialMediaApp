const START = 1;
const CREATE = 2;
const UPLOAD = 3;

const AVATAR_BUCKET_NAME = "avatars";
const USER_TABLE_NAME = "users";
const POSTS_TABLE_NAME = "posts";
const FRIENDS_TABLE_NAME = "friends";
const LIKES_TABLE_NAME = "likes";
const COMMENTS_TABLE_NAME = "comments";
const POSTS_PHOTOS_BUCKET_NAME = "posts";
const POSTS_PHOTOS_TABLE_NAME = "postPhotos";
const SAVED_POSTS_TABLE_NAME = "savedPosts";

const MAX_CHAR_POST = 80;

const FRIENDS_RETURNED_FRIEND_SEARCH = "accepted";
const PENDING_RETURNED_FRIEND_SEARCH = "pending";
const NOT_FRIENDS_RETURNED_FRIEND_SEARCH = "none";

const USER_MIN_AGE = 12;

const PUBLIC_ACCOUNT_TYPE = "public";
const PRIVATE_ACCOUNT_TYPE = "private";
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
  SAVED_POSTS_TABLE_NAME,
  COMMENTS_TABLE_NAME,
  LIKES_TABLE_NAME,
  USER_MIN_AGE,
  POSTS_PHOTOS_BUCKET_NAME,
  POSTS_PHOTOS_TABLE_NAME,
  PUBLIC_ACCOUNT_TYPE,
  PRIVATE_ACCOUNT_TYPE,
};
