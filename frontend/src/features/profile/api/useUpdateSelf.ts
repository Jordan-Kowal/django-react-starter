import type { Self } from "@/api";
import { performRequest } from "@/api/utils";
import { API_ROOT_URL } from "@/config/api";
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { keysToCamel, keysToSnake } from "jkscript";

export type UpdateSelfRequestData = {
  email: string;
  firstName: string;
  lastName: string;
};

type UseUpdateSelf = () => UseMutationResult<
  Self,
  Error,
  UpdateSelfRequestData,
  unknown
>;

export const useUpdateSelf: UseUpdateSelf = () => {
  const queryClient = useQueryClient();
  const url = `${API_ROOT_URL}/self/`;

  return useMutation({
    mutationFn: async (data: UpdateSelfRequestData): Promise<Self> => {
      const response = await performRequest(url, {
        method: "POST",
        data: keysToSnake(data),
      });
      return keysToCamel(response) as Self;
    },
    // TODO: Add notification
    onSuccess: (data: Self) => {
      queryClient.setQueryData(["self"], data);
    },
    // onError: ({ errors }) => {},
  });
};
