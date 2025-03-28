export type ApiError = {
  status: number;
  errors?: Record<string, string[]>;
  text?: string;
};
