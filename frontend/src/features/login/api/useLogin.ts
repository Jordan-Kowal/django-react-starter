import { API_ROOT_URL } from "@/api/config";
import { performRequest } from "@/api/utils";
import { routeConfigMap } from "@/router";
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useLocation } from "wouter";

export type LoginRequestData = {
  email: string;
  password: string;
};

type UseLogin = () => UseMutationResult<void, Error, LoginRequestData, unknown>;

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
    // @ts-ignore
    onError: ({ status }) => {
      if (status === 400) {
        toast.error(t("Invalid credentials"));
      }
    },
  });
};
