import type { FormInstance } from "antd";
import { isObject, toCamelCase } from "jkscript";

type LoadErrorsInForm = (
  form: FormInstance,
  errors: Record<string, any>,
) => void;

type RecursiveBuildFormErrors = (
  currentPath: Array<string | number>,
  value: any,
) => void;

type FormError = {
  name: Array<string | number>;
  errors: string[];
};

export const loadErrorsInForm: LoadErrorsInForm = (form, errors = {}) => {
  if (!errors) return;
  const formErrors: FormError[] = [];

  const recursivelyBuildFormErrors: RecursiveBuildFormErrors = (
    currentPath,
    value,
  ) => {
    const path = [...currentPath];
    if (typeof value === "string") {
      formErrors.push({ name: path, errors: [value] });
      return;
    }
    if (isObject(value)) {
      Object.keys(value).forEach((subKey) => {
        path.push(toCamelCase(subKey));
        recursivelyBuildFormErrors(path, value[subKey]);
      });
      return;
    }
    if (Array.isArray(value)) {
      const isListOfStrings = value.every((x) => typeof x === "string");
      if (isListOfStrings) {
        formErrors.push({ name: path, errors: value });
      } else {
        value.forEach((subValue, index) => {
          path.push(index);
          recursivelyBuildFormErrors(path, subValue);
        });
      }
    }
  };

  Object.keys(errors).forEach((key) => {
    recursivelyBuildFormErrors([toCamelCase(key)], errors[key]);
  });

  form.setFields(formErrors);
};
