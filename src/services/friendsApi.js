import {
  FRIENDS_RETURNED_FRIEND_SEARCH,
  FRIENDS_TABLE_NAME,
  NOT_FRIENDS_RETURNED_FRIEND_SEARCH,
  NOTIFICATION_REASON_FRIEND_REQUEST,
  NOTIFICATIONS_TABLE_NAME,
  PENDING_RETURNED_FRIEND_SEARCH,
  USER_TABLE_NAME,
} from "../utils/Constants";
import { throwError } from "../utils/helpers";
import supabase from "./supabase";

export async function areFriends(userID, ID) {
  if (!ID) return {};
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

export async function userFriends({ id, status }) {
  if (!id) return [];
  const query = `friend1.eq.${id},friend2.eq.${id}`;
  const { data, error } = await supabase
    .from(FRIENDS_TABLE_NAME)
    .select(`friend1,friend2`)
    .eq("requestStatus", status)
    .or(query);

  if (error) {
    throwError(error.message, error.code);
  }

  const friendsData = Promise.all(
    data.map(async (item) => {
      if (item.friend1 === id) {
        let { data, error } = await supabase
          .from(USER_TABLE_NAME)
          .select("*")
          .eq("id", item.friend2);

        if (error) {
          throwError(error.message, error.code);
        }

        return data;
      } else if (item.friend2 === id) {
        let { data, error } = await supabase
          .from(USER_TABLE_NAME)
          .select("*")
          .eq("id", item.friend1);

        if (error) {
          throwError(error.message, error.code);
        }

        return data;
      }
    }),
  );

  return (await friendsData).flat();
}
export async function sendFriendRequest(id1, id2, username) {
  const { data, error } = await supabase
    .from(FRIENDS_TABLE_NAME)
    .insert({ friend1: id1, friend2: id2, requestStatus: "pending" })
    .select()
    .single();
  if (error) {
    throwError(error.message, error.code);
  }
  await supabase.from(NOTIFICATIONS_TABLE_NAME).insert({
    userId: id2,
    read: false,
    reason: NOTIFICATION_REASON_FRIEND_REQUEST,
    additionalData: {
      username,
    },
  });
  return data;
}
