import { useCallback, useMemo, useState } from "react";

type UseFormSubmit = <T extends Record<string, any>>(
  submitFunc: (values: T) => Promise<void> | void,
) => [boolean, (values: T) => Promise<void> | void];

export const useFormSubmit: UseFormSubmit = (submitFunc) => {
  const [inProgress, setInProgress] = useState(false);

  const onFormFinish = useCallback(
    async (values) => {
      setInProgress(true);
      try {
        // @ts-ignore
        await submitFunc(values);
      } finally {
        setInProgress(false);
      }
    },
    [submitFunc],
  ) as ReturnType<UseFormSubmit>[1];

  return useMemo(() => [inProgress, onFormFinish], [inProgress, onFormFinish]);
};
