export const required = {
  required: true,
  message: "Ce champ est obligatoire",
};

type Validator = (rules: Record<string, any>, value: any) => Promise<void>;

type ValidateMaxLength = Validator &
  ((rules: { max: number }, value: string) => Promise<void>);
export const validateMaxLength: ValidateMaxLength = ({ max }, value) => {
  if (!value) return Promise.resolve();
  if (typeof value !== "string") return Promise.resolve();
  if (!value.trim())
    return Promise.reject(new Error("Ce champ est obligatoire"));
  if (value.length <= max) return Promise.resolve();
  return Promise.reject(new Error(`Ne doit pas dépasser ${max} caractères`));
};

type ValidateMinLength = Validator &
  ((rules: { min: number; max: number }, value: string) => Promise<void>);
export const validateValueBetween: ValidateMinLength = (
  { min, max },
  value,
) => {
  if (!value && value !== 0) return Promise.resolve();
  if (value >= min && value <= max) return Promise.resolve();
  return Promise.reject(new Error(`Doit être entre ${min} et ${max}`));
};

type validateItemsCount = Validator &
  ((rules: { min: number; max: number }, value: any[]) => Promise<void>);

export const validateItemsCount: validateItemsCount = ({ min, max }, value) => {
  const items = value || [];
  if (items.length >= min && items.length <= max) return Promise.resolve();
  return Promise.reject(
    new Error(`Doit contenir entre ${min} et ${max} éléments`),
  );
};

type ValidateItems = Validator &
  ((
    rules: { itemValidator: Validator; baseMessage: string },
    value: any[],
  ) => Promise<void>);

export const validateItems: ValidateItems = (
  { itemValidator, baseMessage },
  value,
) => {
  const items = value || [];
  const invalidItems = items.filter((item: any) => !itemValidator(item));
  const { length } = invalidItems;
  if (length === 0) return Promise.resolve();
  const message = `${baseMessage} (${length} éléments)`;
  return Promise.reject(new Error(message));
};
