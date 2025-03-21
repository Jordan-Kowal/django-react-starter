import { API_ROOT_URL } from "@/api/config";
import type { Self } from "@/api/queries";
import type { ApiError } from "@/api/types";
import { performRequest } from "@/api/utils";
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { keysToCamel, keysToSnake } from "jkscript";
import { toast } from "react-toastify";

export type UpdateSelfRequestData = {
  email: string;
  firstName: string;
  lastName: string;
};

type UseUpdateSelf = () => UseMutationResult<
  Self,
  ApiError,
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
    onSuccess: (data: Self) => {
      queryClient.setQueryData(["self"], data);
      toast.success("Information updated");
    },
    onError: () => {
      toast.error("Failed to update information");
    },
  });
};
