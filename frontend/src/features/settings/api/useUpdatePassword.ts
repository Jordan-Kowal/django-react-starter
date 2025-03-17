import { API_ROOT_URL } from "@/api/config";
import { performRequest } from "@/api/utils";
import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { keysToSnake } from "jkscript";

export type UpdatePasswordRequestData = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

type UseUpdatePassword = () => UseMutationResult<
  void,
  Error,
  UpdatePasswordRequestData,
  unknown
>;

export const useUpdatePassword: UseUpdatePassword = () => {
  const url = `${API_ROOT_URL}/self/update_password/`;
  return useMutation({
    mutationFn: async (data: UpdatePasswordRequestData): Promise<void> => {
      await performRequest(url, {
        method: "POST",
        data: keysToSnake(data),
      });
    },
    // TODO: Add notification
    // onSuccess: () => {},
    // onError: ({ errors }) => {},
  });
};
