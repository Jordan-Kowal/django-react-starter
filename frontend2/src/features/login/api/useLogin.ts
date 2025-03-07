import { performRequest } from "@/api/utils";
import { API_ROOT_URL } from "@/config/api";
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export type LoginRequestData = {
  email: string;
  password: string;
};

type UseLogin = () => UseMutationResult<void, Error, LoginRequestData, unknown>;

export const useLogin: UseLogin = () => {
  const url = `${API_ROOT_URL}/auth/login/`;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginRequestData): Promise<void> =>
      await performRequest(url, {
        method: "POST",
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appConfig"] });
      queryClient.invalidateQueries({ queryKey: ["self"] });
    },
    // TODO: Add notification
    // onError: ({ errors }) => {},
  });
};
