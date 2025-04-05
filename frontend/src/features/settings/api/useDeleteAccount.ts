import { API_ROOT_URL } from "@/api/config";
import type { ApiError } from "@/api/types";
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

type UseDeleteAccount = () => UseMutationResult<void, ApiError, void, unknown>;

export const useDeleteAccount: UseDeleteAccount = () => {
  const url = `${API_ROOT_URL}/self/account/`;
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      await performRequest(url, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["self"] });
      queryClient.removeQueries({ queryKey: ["self"] });
      toast.success(t("Your account has been deleted"));
      navigate(routeConfigMap.login.path);
    },
    onError: () => {
      console.log("onError");
      toast.error(t("Something went wrong"));
    },
  });
};
