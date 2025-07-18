import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, LogIn, Mail } from "lucide-react";
import { memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { FieldsetInput } from "@/components/form";
import { useLogin } from "../api";
import { BaseForm } from "./BaseForm";

const schema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

export const LoginForm: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { mutateAsync: login } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: Schema) => {
    setIsLoading(true);
    try {
      await login(data);
    } catch (_e) {
      setIsLoading(false);
    }
  };

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)} dataTestId="login-form">
      <legend className="fieldset-legend">{t("Login")}</legend>
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
      <button
        type="submit"
        className="btn btn-primary w-full mt-4"
        disabled={isLoading || !isDirty || !isValid}
        data-testid="submit-button"
      >
        {isLoading ? <span className="loading loading-spinner" /> : <LogIn />}
        {t("Login")}
      </button>
    </BaseForm>
  );
});
