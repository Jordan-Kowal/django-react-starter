import { FieldsetInput } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, LogIn, Mail } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useRegister } from "../api";
import { BaseForm } from "./BaseForm";

const schema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty(),
  confirmPassword: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

export const RegisterForm: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { mutateAsync: register } = useRegister();

  /** Refined schema for translation and password matching */
  const refinedSchema = useMemo(
    () =>
      schema.refine((data) => data.password === data.confirmPassword, {
        message: t("Passwords do not match"),
        path: ["confirmPassword"],
      }),
    [t],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    trigger,
    watch,
  } = useForm<Schema>({
    resolver: zodResolver(refinedSchema),
    mode: "onChange",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  /* Password change will re-trigger the confirmPassword validation */
  useEffect(() => {
    if (password && confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  const onSubmit = async (data: Schema) => {
    setIsLoading(true);
    try {
      await register(data);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <BaseForm dataTestId="register-form" onSubmit={handleSubmit(onSubmit)}>
      <legend className="fieldset-legend">{t("Register")}</legend>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <FieldsetInput
            icon={<Mail size={16} />}
            label={t("Email")}
            errorMessage={errors?.email?.message}
            placeholder={t("Enter your email address")}
            type="email"
            dataTestId="email"
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <FieldsetInput
            icon={<KeyRound size={16} />}
            label={t("Password")}
            errorMessage={errors?.password?.message}
            placeholder={t("Enter your password")}
            type="password"
            dataTestId="password"
            {...field}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <FieldsetInput
            icon={<KeyRound size={16} />}
            label={t("Confirm password")}
            errorMessage={errors?.confirmPassword?.message}
            placeholder={t("Confirm your password")}
            type="password"
            dataTestId="confirm-password"
            {...field}
          />
        )}
      />
      <button
        type="submit"
        className="btn btn-primary w-full mt-4"
        disabled={isLoading || !isDirty || !isValid}
        data-testid="submit-button"
      >
        {isLoading ? <span className="loading loading-spinner" /> : <LogIn />}
        {t("Register")}
      </button>
    </BaseForm>
  );
});
