import { NOTIFICATIONS_TABLE_NAME } from "../utils/Constants";
import { throwError } from "../utils/helpers";
import supabase from "./supabase";

export async function getNotification({ id }) {
  if (!id) return [];
  const { data, error } = await supabase
    .from(NOTIFICATIONS_TABLE_NAME)
    .select("*")
    .eq("userId", id);

  if (error) {
    throwError(error.message, error.code);
  }

  return data;
}
