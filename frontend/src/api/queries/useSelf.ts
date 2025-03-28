import { API_ROOT_URL } from "@/api/config";
import { useQuery } from "@tanstack/react-query";
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

export type ApiSelf = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  profile: {
    user: number;
  };
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
  isActive: data.is_active,
  isStaff: data.is_staff,
  isSuperuser: data.is_superuser,
  profile: {
    user: data.profile.user,
  },
});

export const useSelf = (): UseSelfReturn => {
  const url = `${API_ROOT_URL}/self/`;
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
