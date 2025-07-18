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

export type RegisterRequestData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type UseRegister = () => UseMutationResult<
  void,
  ApiError,
  RegisterRequestData,
  unknown
>;

export const useRegister: UseRegister = () => {
  const url = `${API_ROOT_URL}/auth/register/`;
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  return useMutation({
    mutationFn: async (data: RegisterRequestData): Promise<void> => {
      await performRequest(url, {
        method: "POST",
        data: {
          email: data.email,
          password: data.password,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appConfig"] });
      queryClient.invalidateQueries({ queryKey: ["self"] });
      toast.success(t("Account created successfully"));
      navigate(routeConfigMap.homepage.path);
    },
    onError: ({ status, errors }) => {
      if (status === 400) {
        if (errors?.email) {
          toast.error(t("Email already taken"));
        } else if (errors?.password) {
          toast.error(t("Password is too weak"));
        } else {
          toast.error(t("Registration failed"));
        }
      } else {
        toast.error(t("Something went wrong"));
      }
    },
  });
};
