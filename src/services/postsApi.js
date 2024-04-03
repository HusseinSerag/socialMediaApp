import { POSTS_TABLE_NAME, USER_TABLE_NAME } from "../utils/Constants";
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

export async function getPosts(id) {
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
