import { useQueryUtils } from "@/hooks";
import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import type { FormInstance } from "antd";
import { queryKeysBuilder } from "../queryKeys";
import type { ApiError } from "../types";
import { loadErrorsInForm, performRequest } from "../utils";
import { routeBuilder } from "./routes";
import type { LoginRequestData } from "./types";

type UseLogin = (
  form: FormInstance,
) => UseMutationResult<void, ApiError, LoginRequestData>;
type UseLogout = () => UseMutationResult<void, ApiError, any>;

export const useLogin: UseLogin = (form) => {
  const { invalidateQueries } = useQueryUtils();

  return useMutation({
    mutationFn: async (data: LoginRequestData): Promise<void> =>
      await performRequest(routeBuilder.login(), {
        method: "POST",
        data,
      }),
    onSuccess: () => {
      invalidateQueries(queryKeysBuilder.appConfig());
      invalidateQueries(queryKeysBuilder.self());
    },
    onError: ({ errors }) => {
      loadErrorsInForm(form, errors);
    },
  });
};

export const useLogout: UseLogout = () => {
  const { resetQueries } = useQueryUtils();

  return useMutation({
    mutationFn: async (): Promise<void> =>
      await performRequest(routeBuilder.logout(), {
        method: "POST",
      }),
    onSuccess: () => {
      resetQueries(queryKeysBuilder.self());
    },
  });
};
