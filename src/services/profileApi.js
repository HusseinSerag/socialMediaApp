import { FRIENDS_TABLE_NAME, USER_TABLE_NAME } from "../utils/Constants";
import { throwError } from "../utils/helpers";
import supabase from "./supabase";

export async function searchFriend(username) {
  let query = supabase.from(USER_TABLE_NAME).select();

  let response;

  if (username !== "") {
    response = await query.ilike("username", `%${username}%`);
    const { data, error } = response;

    if (error) {
      throwError(error.message, error.code);
    }
    return data;
  } else {
    return [];
  }
}

export async function getUser(id) {
  const { data, error } = await supabase
    .from(USER_TABLE_NAME)
    .select()
    .eq("id", id)
    .single();
  if (error) {
    throwError(error.message, error.code);
  }
  return data;
}
