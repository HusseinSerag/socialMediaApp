import { FRIENDS_TABLE_NAME } from "../utils/Constants";
import { throwError } from "../utils/helpers";
import supabase from "./supabase";

export async function areFriends(userID, ID) {
  const query = `and(friend1.eq.${userID},friend2.eq.${ID}),and(friend1.eq.${ID},friend2.eq.${userID})`;

  console.log(query);
  const { data, error } = await supabase
    .from(FRIENDS_TABLE_NAME)
    .select("*")
    .eq("requestStatus", "accepted")
    .or(query);

  console.log(data);
  if (error) {
    throwError(error.message, error.code);
  }

  const result = data.length === 0 ? false : true;
  return Boolean(result);
}
