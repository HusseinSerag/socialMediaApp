import {
  QueryClient,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getComments } from "../../services/postsApi";
import { useEffect, useState } from "react";
import {
  MIN_NUMBER_OF_COMMENTS,
  NUMBER_OF_INCREMENTS_COMMENTS,
} from "../../utils/Constants";

export function useGetComments(id) {
  const queryClient = useQueryClient();

  const {
    data,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["postComment", id],

    queryFn: ({ pageParam }) => getComments({ postId: id, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const newParam =
        lastPage.data.length < lastPage.count
          ? lastPageParam + NUMBER_OF_INCREMENTS_COMMENTS
          : undefined;

      return newParam;
    },
  });

  function clearCommentsOnClose() {
    queryClient.setQueryData(["postComment", id], (data) => {
      return {
        pages: data.pages.slice(0, 1),
        pageParams: data.pageParams.slice(0, 1),
      };
    });
  }
  const comments = data?.pages[data.pages.length - 1];
  return {
    comments,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    clearCommentsOnClose,
  };
}
