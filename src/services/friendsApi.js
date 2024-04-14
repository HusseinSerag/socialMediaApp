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
  if (!ID) return { status: "wrongValue" };
  const query = `and(friend1.eq.${userID},friend2.eq.${ID}),and(friend1.eq.${ID},friend2.eq.${userID})`;

  const { data, error } = await supabase
    .from(FRIENDS_TABLE_NAME)
    .select("*")
    .or(query);
  if (error) {
    throwError(error.message, error.code);
  }

  if (data.length === 0) return { status: NOT_FRIENDS_RETURNED_FRIEND_SEARCH };
  else {
    if (data[0].requestStatus === FRIENDS_RETURNED_FRIEND_SEARCH) {
      return { status: FRIENDS_RETURNED_FRIEND_SEARCH, requestId: data[0].id };
    } else if (data[0].requestStatus === PENDING_RETURNED_FRIEND_SEARCH) {
      return {
        status: PENDING_RETURNED_FRIEND_SEARCH,
        friend1: data[0].friend1,
        friend2: data[0].friend2,
        requestId: data[0].id,
      };
    }
    return data;
  }
}

export async function respondToRequest({ response, requestId }) {
  if (response === "delete") {
    const { error } = await supabase
      .from(FRIENDS_TABLE_NAME)
      .delete()
      .eq("id", requestId);
    if (error) {
      throwError(error.message, error.code);
    }

    console.log(requestId);
    return;
  }
  const { data, error } = await supabase
    .from(FRIENDS_TABLE_NAME)
    .update({ requestStatus: response })
    .eq("id", requestId);
  if (error) {
    throwError(error.message, error.code);
  }
  return data;
}

export async function userFriends({ id, status }) {
  if (!id) return [];
  const query = `friend1.eq.${id},friend2.eq.${id}`;
  const { data, error } = await supabase
    .from(FRIENDS_TABLE_NAME)
    .select(`*`)
    .eq("requestStatus", status)
    .or(query);

  if (error) {
    throwError(error.message, error.code);
  }

  const friendsData = Promise.all([
    ...data.map(async (item) => {
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
  ]);

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
      sentID: id1,
      acceptID: data.id,
    },
  });
  return data;
}
