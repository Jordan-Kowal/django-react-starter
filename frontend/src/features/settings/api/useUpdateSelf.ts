import { API_ROOT_URL } from "@/api/config";
import type { Self } from "@/api/queries";
import { deserializeSelf } from "@/api/queries/useSelf";
import type { ApiError } from "@/api/types";
import { performRequest } from "@/api/utils";
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const url = `${API_ROOT_URL}/self/`;

  return useMutation({
    mutationFn: async (data: UpdateSelfRequestData): Promise<Self> => {
      const response = await performRequest(url, {
        method: "POST",
        data: {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
        },
      });
      return deserializeSelf(response);
    },
    onSuccess: (data: Self) => {
      queryClient.setQueryData(["self"], data);
      toast.success(t("Information updated"));
    },
    onError: ({ status }) => {
      if (status === 400) {
        toast.error(t("Failed to update information"));
      } else {
        toast.error(t("Something went wrong"));
      }
    },
  });
};
