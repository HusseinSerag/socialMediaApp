import { throwError } from "../utils/helpers";
import supabase from "./supabase";
export async function register({ email, password }) {
  const { data: information, error: registerError } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (registerError) {
    throwError(registerError.message, 400);
  }

  console.log(information);
}
