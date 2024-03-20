import supabase from "../services/supabase";

export function throwError(message, code) {
  throw { message, code };
}

export function getAssetURL(bucketName, path) {
  const { data: absolutePath } = supabase.storage
    .from(bucketName)
    .getPublicUrl(path);
  const { publicUrl } = absolutePath;
  return publicUrl;
}
