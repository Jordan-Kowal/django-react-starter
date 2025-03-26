import type React from "react";
import { forwardRef, memo } from "react";

export type FieldsetInputProps = {
  dataTestId?: string;
  icon?: React.ReactNode;
  label: string;
  errorMessage?: string;
  placeholder?: string;
  type: string;
  value?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
};

export const FieldsetInput = memo(
  forwardRef<HTMLInputElement, FieldsetInputProps>(
    (
      {
        dataTestId,
        icon,
        label,
        errorMessage,
        placeholder,
        type,
        name,
        value,
        onChange,
        onBlur,
      },
      ref,
    ) => {
      const inputColor = errorMessage ? "input-error" : "input-primary";
      return (
        <>
          <label
            htmlFor={name}
            className="fieldset-label"
            data-testid={dataTestId && `${dataTestId}-label`}
          >
            {icon}
            {label}
          </label>
          <input
            ref={ref}
            id={name}
            className={`input w-full ${inputColor}`}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            data-testid={dataTestId && `${dataTestId}-input`}
          />
          <span
            className="text-red-500 text-right text-xs mt-1"
            data-testid={dataTestId && `${dataTestId}-error`}
          >
            {errorMessage}
          </span>
        </>
      );
    },
  ),
);
