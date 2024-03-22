import { useParams } from "react-router-dom";
import { getUser } from "../../services/profileApi";

import { useQuery } from "@tanstack/react-query";
export default function useGetUser() {
  const { id } = useParams();

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["friend", id],
    queryFn: () => getUser(id),
    retry: false,
  });
  return { error, user, isLoading };
}
