export type ApiError = {
  status: number;
  text: string;
  errors: Record<string, string[]>;
};

type UseQueryBaseResult = {
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

export type UseQueryResult<T = undefined> = T extends undefined
  ? UseQueryBaseResult
  : UseQueryBaseResult & { data: T | undefined };
