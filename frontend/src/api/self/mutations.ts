import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { type FormInstance, message } from "antd";
import { keysToCamel, keysToSnake } from "jkscript";
import { queryKeysBuilder } from "../queryKeys";
import type { ApiError } from "../types";
import { loadErrorsInForm, performRequest } from "../utils";
import { routeBuilder } from "./routes";
import type {
  Self,
  UpdatePasswordRequestData,
  UpdateSelfRequestData,
} from "./types";

type UseUpdateSelf = (
  form: FormInstance,
) => UseMutationResult<Self, ApiError, UpdateSelfRequestData>;
type UseUpdatePassword = (
  form: FormInstance,
) => UseMutationResult<void, ApiError, UpdatePasswordRequestData>;

export const useUpdateSelf: UseUpdateSelf = (form) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateSelfRequestData): Promise<Self> => {
      const response = await performRequest(routeBuilder.self(), {
        method: "POST",
        data: keysToSnake(data),
      });
      return keysToCamel(response) as Self;
    },
    onSuccess: (data: Self) => {
      queryClient.setQueryData(queryKeysBuilder.self(), data);
      message.success("Votre profil a été mis à jour");
    },
    onError: ({ errors }) => {
      loadErrorsInForm(form, errors);
      message.error(
        "Une erreur est survenue lors de la mise à jour de votre profil",
      );
    },
  });
};

export const useUpdatePassword: UseUpdatePassword = (form) => {
  return useMutation({
    mutationFn: async (data: UpdatePasswordRequestData): Promise<void> => {
      await performRequest(routeBuilder.updatePassword(), {
        method: "POST",
        data: keysToSnake(data),
      });
    },
    onSuccess: () => message.success("Votre mot de passe a été mis à jour"),
    onError: ({ errors }) => {
      loadErrorsInForm(form, errors);
      message.error(
        "Une erreur est survenue lors de la mise à jour de votre mot de passe",
      );
    },
  });
};
