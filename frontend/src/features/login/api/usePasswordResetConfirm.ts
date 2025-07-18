import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useLocation } from "wouter";
import { API_ROOT_URL } from "@/api/config";
import type { ApiError } from "@/api/types";
import { performRequest } from "@/api/utils";
import { routeConfigMap } from "@/router";

export type PasswordResetConfirmRequestData = {
  password: string;
  confirmPassword: string;
};

type UsePasswordResetConfirm = (
  uid?: string,
  token?: string,
) => UseMutationResult<
  void,
  ApiError,
  PasswordResetConfirmRequestData,
  unknown
>;

export const usePasswordResetConfirm: UsePasswordResetConfirm = (
  uid,
  token,
) => {
  const url = `${API_ROOT_URL}/auth/password_reset_confirm/`;
  const [, navigate] = useLocation();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (
      data: PasswordResetConfirmRequestData,
    ): Promise<void> => {
      await performRequest(url, {
        method: "POST",
        data: { password: data.password, token, uid },
      });
    },
    onSuccess: () => {
      toast.success(t("Password updated. You can now log in."));
      navigate(routeConfigMap.login.path);
    },
    onError: ({ status, errors }) => {
      if (status === 400) {
        if (errors?.password) {
          toast.error(t("Password is too weak"));
        } else {
          toast.error(t("Invalid token"));
        }
      } else {
        toast.error(t("Something went wrong"));
      }
    },
  });
};
