import {
  AVATAR_BUCKET_NAME,
  FRIENDS_TABLE_NAME,
  POSTS_TABLE_NAME,
  USER_TABLE_NAME,
} from "../utils/Constants";
import { getAssetURL, throwError } from "../utils/helpers";
import supabase from "./supabase";
export async function register({ email, password, username }) {
  const { data: exists, error: existError } = await supabase
    .from(USER_TABLE_NAME)
    .select()
    .eq("username", username);

  if (exists.length) {
    throwError("Username already exists", 403);
  }
  if (existError) {
    throwError(existError.message, existError.code);
  }
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
    .select(`*,${POSTS_TABLE_NAME}(*)`)
    .eq("auth_id", user?.id)
    .single();

  if (currentUserError) {
    throwError(currentUserError.message, 400);
  }

  return { ...currentUser, email: user.email };
}

export async function setBio({ bio, id, gender, birthdate }) {
  const { error, data } = await supabase
    .from(USER_TABLE_NAME)
    .update({ bio, gender, birthdate })
    .eq("id", id)
    .select();
  if (error) {
    throwError(error.message, 400);
  }

  return data;
}

export async function uploadPhoto({
  file,
  id,
  photoAlreadyExists = false,
  photoURLIfExists = "",
}) {
  if (photoAlreadyExists) {
    const photoName = photoURLIfExists.split(`/${AVATAR_BUCKET_NAME}/`)[1];

    const { error } = await supabase.storage
      .from(AVATAR_BUCKET_NAME)
      .remove([photoName]);
    if (error) {
      throwError(error.message, error.code);
    }
  }

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

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throwError(error.message, error.code);
  }
}
