import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { API_ROOT_URL } from "@/api/config";
import type { ApiError } from "../types";
import { performRequest } from "../utils";

export type Self = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type ApiSelf = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

type UseSelfReturn = {
  isPending: boolean;
  isError: boolean;
  error: ApiError | null;
  data?: Self;
};

export const deserializeSelf = (data: ApiSelf): Self => ({
  id: data.id,
  firstName: data.first_name,
  lastName: data.last_name,
  email: data.email,
});

export const useSelf = (): UseSelfReturn => {
  const url = `${API_ROOT_URL}/self/account/`;
  const { isPending, isError, error, data } = useQuery<ApiSelf, ApiError, Self>(
    {
      queryKey: ["self"],
      queryFn: () => performRequest(url, { method: "GET" }),
      select: deserializeSelf,
    },
  );

  return useMemo(
    () => ({
      isPending,
      isError,
      error,
      data,
    }),
    [isPending, isError, error, data],
  );
};
