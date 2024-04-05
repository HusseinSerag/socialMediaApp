import { useParams } from "react-router-dom";
import { getUser } from "../../services/profileApi";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "../auth/useUser";
export default function useGetUser() {
  const { id } = useParams();

  const { user: loggedInUser } = useUser();

  const passedInID = id || loggedInUser?.id;
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["friend", passedInID],
    queryFn: () => getUser(passedInID),
    retry: false,
  });
  return { error, user, isLoading };
}
