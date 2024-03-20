import { AVATAR_BUCKET_NAME, USER_TABLE_NAME } from "../utils/Constants";
import { getAssetURL, throwError } from "../utils/helpers";
import supabase from "./supabase";
export async function register({ email, password, username }) {
  const { data: information, error: registerError } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (registerError) {
    throwError(registerError.message, 400);
  }

  const { user, session } = information;

  const { data, error: createUserError } = await supabase
    .from(USER_TABLE_NAME)
    .insert({
      auth_id: user.id,
      username,
    })
    .select();
  if (createUserError) {
    await supabase.auth.signOut();
    throwError(createUserError.message, 400);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throwError(error.message, 400);
  }

  const { user } = data;

  const { data: currentUser, error: currentUserError } = await supabase
    .from(USER_TABLE_NAME)
    .select()
    .eq("auth_id", user?.id)
    .single();

  if (currentUserError) {
    throwError(currentUserError.message, 400);
  }
  return currentUser;
}

export async function setBio({ bio, id }) {
  const { error, data } = await supabase
    .from(USER_TABLE_NAME)
    .update({ bio: bio })
    .eq("id", id)
    .select();
  if (error) {
    throwError(error.message, 400);
  }

  return data;
}

export async function uploadPhoto({ file, id }) {
  const fileName = `${Math.random()}${file.name.replace("/", "")}`;
  const { data: filePath, error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET_NAME)
    .upload(fileName, file);

  if (uploadError) {
    throwError(uploadError.message, uploadError.code);
  }
  const { path } = filePath;
  const absolutePath = getAssetURL(AVATAR_BUCKET_NAME, path);
  await insertPhotoOfUser(absolutePath, id);
}

async function insertPhotoOfUser(url, id) {
  const { error: tableError, data: path } = await supabase
    .from(USER_TABLE_NAME)
    .update({ profilePicture: url })
    .eq("id", id)
    .select();

  if (tableError) {
    throwError(tableError.message, tableError.code);
  }

  return path;
}

export async function login({ email, password }) {
  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (loginError) {
    throwError(loginError.message, loginError.code);
  }
  return data;
}
