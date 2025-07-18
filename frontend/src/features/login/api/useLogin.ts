import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useLocation } from "wouter";
import { API_ROOT_URL } from "@/api/config";
import type { ApiError } from "@/api/types";
import { performRequest } from "@/api/utils";
import { routeConfigMap } from "@/router";

export type LoginRequestData = {
  email: string;
  password: string;
};

type UseLogin = () => UseMutationResult<
  void,
  ApiError,
  LoginRequestData,
  unknown
>;

export const useLogin: UseLogin = () => {
  const url = `${API_ROOT_URL}/auth/login/`;
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  return useMutation({
    mutationFn: async (data: LoginRequestData): Promise<void> =>
      await performRequest(url, { method: "POST", data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appConfig"] });
      queryClient.invalidateQueries({ queryKey: ["self"] });
      navigate(routeConfigMap.homepage.path);
    },
    onError: ({ status }) => {
      if (status === 400) {
        toast.error(t("Invalid credentials"));
      } else {
        toast.error(t("Something went wrong"));
      }
    },
  });
};
