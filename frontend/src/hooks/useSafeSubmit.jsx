import { useCallback, useState } from 'react';
import { apiResponseToFormErrors } from '@/core/forms';

const useSafeSubmit = (onFinish, form) => {
  const [inProgress, setInProgress] = useState(false);

  const submit = useCallback(
    (formValues = {}) => {
      onFinish(formValues).catch(({ errors }) => {
        const formErrors = apiResponseToFormErrors(errors);
        form.setFields(formErrors);
      });
    },
    [onFinish, form]
  );

  const onFormFinish = useCallback(
    async (values) => {
      setInProgress(true);
      try {
        await submit(values);
      } finally {
        setInProgress(false);
      }
    },
    [submit]
  );

  return [inProgress, onFormFinish];
};

export default useSafeSubmit;
