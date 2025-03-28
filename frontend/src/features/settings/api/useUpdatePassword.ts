import { API_ROOT_URL } from "@/api/config";
import type { ApiError } from "@/api/types";
import { performRequest } from "@/api/utils";
import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export type UpdatePasswordRequestData = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

type UseUpdatePassword = () => UseMutationResult<
  void,
  ApiError,
  UpdatePasswordRequestData,
  unknown
>;

export const useUpdatePassword: UseUpdatePassword = () => {
  const { t } = useTranslation();
  const url = `${API_ROOT_URL}/self/update_password/`;
  return useMutation({
    mutationFn: async (data: UpdatePasswordRequestData): Promise<void> => {
      await performRequest(url, {
        method: "POST",
        data: {
          current_password: data.currentPassword,
          password: data.password,
          confirm_password: data.confirmPassword,
        },
      });
    },
    onSuccess: () => {
      toast.success(t("Password updated"));
    },
    onError: ({ status, errors }) => {
      if (status === 400) {
        if (errors?.current_password) {
          toast.error(t("Invalid current password"));
        } else if (errors?.password) {
          toast.error(t("Password is too weak"));
        }
      } else {
        toast.error(t("Something went wrong"));
      }
    },
  });
};
