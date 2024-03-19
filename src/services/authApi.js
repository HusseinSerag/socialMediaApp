import { throwError } from "../utils/helpers";
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
    .from("users")
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
    .from("users")
    .select()
    .eq("auth_id", user?.id)
    .single();

  if (currentUserError) {
    throwError(currentUserError.message, 400);
  }
  return currentUser;
}

export async function setBio({ bio, id }) {
  console.log(bio, id);
  const { error, data } = await supabase
    .from("users")
    .update({ bio: bio })
    .eq("id", id)
    .select();
  if (error) {
    throwError(error.message, 400);
  }

  console.log(data);
}
