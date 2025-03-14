import { performRequest } from "@/api/utils";
import { API_ROOT_URL } from "@/config/api";
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export type LoginRequestData = {
  email: string;
  password: string;
};

type UseLogin = () => UseMutationResult<void, Error, LoginRequestData, unknown>;

export const useLogin: UseLogin = () => {
  const url = `${API_ROOT_URL}/auth/login/`;
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (data: LoginRequestData): Promise<void> =>
      await performRequest(url, { method: "POST", data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appConfig"] });
      queryClient.invalidateQueries({ queryKey: ["self"] });
    },
    // @ts-ignore
    onError: ({ status }) => {
      const message =
        status === 400 ? t("Invalid credentials") : t("Something went wrong");
      toast.error(message);
    },
  });
};
