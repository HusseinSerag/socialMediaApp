import { NOTIFICATIONS_TABLE_NAME } from "../utils/Constants";
import { throwError } from "../utils/helpers";
import supabase from "./supabase";

export async function getNotification({ id }) {
  if (!id) return [];
  const { data, error } = await supabase
    .from(NOTIFICATIONS_TABLE_NAME)
    .select("*")
    .eq("userId", id)
    .order("created_at", { ascending: false });

  if (error) {
    throwError(error.message, error.code);
  }

  return data;
}

export async function updateNotification({ obj, id }) {
  const { data, error } = await supabase
    .from(NOTIFICATIONS_TABLE_NAME)
    .update(obj)
    .eq("id", id)
    .select();

  if (error) {
    throwError(error.message, error.code);
  }

  return data;
}

export async function deleteNotification({ id }) {
  const { error } = await supabase
    .from(NOTIFICATIONS_TABLE_NAME)
    .delete()
    .eq("id", id);

  if (error) {
    throwError(error.message, error.code);
  }
}
