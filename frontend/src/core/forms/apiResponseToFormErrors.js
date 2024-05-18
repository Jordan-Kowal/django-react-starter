import { isObject, toCamelCase } from "jkscript";

const apiResponseToFormErrors = (errors = {}) => {
  if (!errors) return [];
  const formErrors = [];

  const recursivelyBuildFormErrors = (currentPath, value) => {
    const path = [...currentPath];
    // If string, errors are just this string
    if (typeof value === "string") {
      formErrors.push({ name: path, errors: [value] });
      return;
    }
    // If object, we update the path and recurse on its keys
    if (isObject(value)) {
      for (const subKey in Object.keys(value)) {
        path.push(toCamelCase(subKey));
        recursivelyBuildFormErrors(path, value[subKey]);
      }
      return;
    }
    // If array:
    //    If it's a list of strings, then it's a list of errors
    //    Otherwise, we update the path and recurse on its items
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
  for (const key in Object.keys(errors)) {
    recursivelyBuildFormErrors([toCamelCase(key)], errors[key]);
  }
  return formErrors;
};

export default apiResponseToFormErrors;
