import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useLocation } from "wouter";
import { API_ROOT_URL } from "@/api/config";
import { performRequest } from "@/api/utils";
import { routeConfigMap } from "@/router";
import type { ApiError } from "../types";

type UseLogout = () => UseMutationResult<void, ApiError, void, unknown>;

export const useLogout: UseLogout = () => {
  const url = `${API_ROOT_URL}/auth/logout/`;
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  return useMutation({
    mutationFn: async (): Promise<void> =>
      await performRequest(url, { method: "POST" }),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["self"] });
      navigate(routeConfigMap.login.path);
    },
  });
};
