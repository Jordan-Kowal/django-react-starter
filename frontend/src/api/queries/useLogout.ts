import { API_ROOT_URL } from "@/api/config";
import { performRequest } from "@/api/utils";
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type UseLogout = () => UseMutationResult<void, Error, any>;

export const useLogout: UseLogout = () => {
  const url = `${API_ROOT_URL}/auth/logout/`;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> =>
      await performRequest(url, { method: "POST" }),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["self"] });
    },
  });
};
