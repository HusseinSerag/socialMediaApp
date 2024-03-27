import {
  FRIENDS_RETURNED_FRIEND_SEARCH,
  FRIENDS_TABLE_NAME,
  NOT_FRIENDS_RETURNED_FRIEND_SEARCH,
  PENDING_RETURNED_FRIEND_SEARCH,
} from "../utils/Constants";
import { throwError } from "../utils/helpers";
import supabase from "./supabase";

export async function areFriends(userID, ID) {
  const query = `and(friend1.eq.${userID},friend2.eq.${ID}),and(friend1.eq.${ID},friend2.eq.${userID})`;

  const { data, error } = await supabase
    .from(FRIENDS_TABLE_NAME)
    .select("*")
    .or(query);

  if (error) {
    throwError(error.message, error.code);
  }

  if (data.length === 0) return NOT_FRIENDS_RETURNED_FRIEND_SEARCH;
  else {
    if (data[0].requestStatus === FRIENDS_RETURNED_FRIEND_SEARCH) {
      return FRIENDS_RETURNED_FRIEND_SEARCH;
    } else if (data[0].requestStatus === PENDING_RETURNED_FRIEND_SEARCH) {
      return PENDING_RETURNED_FRIEND_SEARCH;
    }
    return data;
  }
}

export async function sendFriendRequest(id1, id2) {
  const { data, error } = await supabase
    .from(FRIENDS_TABLE_NAME)
    .insert({ friend1: id1, friend2: id2, requestStatus: "pending" })
    .select()
    .single();
  if (error) {
    throwError(error.message, error.code);
  }
  return data;
}
