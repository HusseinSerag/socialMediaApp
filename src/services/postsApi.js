import {
  LIKES_TABLE_NAME,
  POSTS_TABLE_NAME,
  USER_TABLE_NAME,
} from "../utils/Constants";
import { throwError } from "../utils/helpers";
import supabase from "./supabase";

export async function createPost({ postOwner, postContent }) {
  const { data, error } = await supabase
    .from(POSTS_TABLE_NAME)
    .insert({ postOwner, postContent });

  if (error) {
    throw throwError(error.message, error.code);
  }
  return data;
}

export async function getPosts({ id }) {
  if (id) {
    const { data, error } = await supabase
      .from(`${POSTS_TABLE_NAME}`)
      .select(`*,${USER_TABLE_NAME}("*")`)
      .eq("postOwner", id);
    if (error) {
      throwError(error.message, error.code);
    }

    return data;
  } else {
    return [];
  }
}

export async function deletePost(id) {
  const { error } = await supabase.from(POSTS_TABLE_NAME).delete().eq("id", id);
  if (error) {
    throwError(error.message, error.code);
  }
}

export async function likePost({ postId, likedUser }) {
  const { data, error } = await supabase
    .from(LIKES_TABLE_NAME)
    .insert([{ postId, likedUser }])
    .select();

  if (error) {
    throwError(error.message, error.code);
  }
  return data;
}
export async function getLikes({ postId }) {
  const { data, error } = await supabase
    .from(LIKES_TABLE_NAME)
    .select(`*,${USER_TABLE_NAME}(*),${POSTS_TABLE_NAME}(*)`)
    .eq("postId", postId);
  if (error) {
    if (error.code === "400") {
      return 0;
    }
    throwError(error.message, error.code);
  }

  return data;
}
