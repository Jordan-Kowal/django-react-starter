import { memo } from "react";

export type BaseFormProps = {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  dataTestId?: string;
};

export const BaseForm: React.FC<BaseFormProps> = memo(
  ({ children, onSubmit, dataTestId }) => {
    return (
      <form
        className="flex flex-col gap-4 justify-center max-w-100 mx-auto"
        data-testid={dataTestId}
        onSubmit={onSubmit}
        noValidate
      >
        <fieldset className="fieldset bg-base-200 border border-base-300 p-4 rounded-box">
          {children}
        </fieldset>
      </form>
    );
  },
);
