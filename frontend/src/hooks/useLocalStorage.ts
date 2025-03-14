import { useCallback, useMemo, useState } from "react";

export const useLocalStorage = <T extends string>(
  key: string,
  defaultValue?: T,
): [T, (newValue: T) => void] => {
  const [value, setValue] = useState(localStorage.getItem(key) || defaultValue);

  const updateValue = useCallback(
    (newValue: T) => {
      localStorage.setItem(key, newValue);
      setValue(newValue);
    },
    [key],
  );

  return useMemo(() => [value, updateValue], [value, updateValue]) as [
    T,
    (newValue: T) => void,
  ];
};
