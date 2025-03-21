import { API_ROOT_URL } from "@/api/config";
import { useQuery } from "@tanstack/react-query";
import { type KeysToSnakeCase, keysToCamel } from "jkscript";
import { useMemo } from "react";
import type { ApiError } from "../types";
import { performRequest } from "../utils";

export type Self = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  profile: {
    user: number;
  };
};

type ApiSelf = KeysToSnakeCase<Self>;

type UseSelfReturn = {
  isPending: boolean;
  isError: boolean;
  error: ApiError | null;
  data?: Self;
};

export const useSelf = (): UseSelfReturn => {
  const url = `${API_ROOT_URL}/self/`;
  const { isPending, isError, error, data } = useQuery<ApiSelf, ApiError, Self>(
    {
      queryKey: ["self"],
      queryFn: () => performRequest(url, { method: "GET" }),
      select: (data: ApiSelf) => keysToCamel(data) as Self,
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
