import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useLocation } from "wouter";
import { API_ROOT_URL } from "@/api/config";
import type { ApiError } from "@/api/types";
import { performRequest } from "@/api/utils";
import { routeConfigMap } from "@/router";

export type PasswordResetRequestData = {
  email: string;
};

type UsePasswordReset = () => UseMutationResult<
  void,
  ApiError,
  PasswordResetRequestData,
  unknown
>;

export const usePasswordReset: UsePasswordReset = () => {
  const url = `${API_ROOT_URL}/auth/password_reset/`;
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  return useMutation({
    mutationFn: async (data: PasswordResetRequestData): Promise<void> =>
      await performRequest(url, { method: "POST", data }),
    onSuccess: () => {
      toast.success(t("An email has been sent to reset your password"));
      navigate(routeConfigMap.login.path);
    },
    onError: () => {
      toast.error(t("Something went wrong"));
    },
  });
};
