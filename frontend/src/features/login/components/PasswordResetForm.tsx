import { FieldsetInput } from "@/components/form";
import { routeConfigMap } from "@/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftToLine, Mail, Send } from "lucide-react";
import { memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { z } from "zod";
import { usePasswordReset } from "../api";

const schema = z.object({
  email: z.string().nonempty().email(),
});

type Schema = z.infer<typeof schema>;

export const PasswordResetForm: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { mutateAsync: passwordReset } = usePasswordReset();

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
      await passwordReset(data);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 justify-center max-w-100 mx-auto"
      data-testid="password-reset-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <fieldset className="fieldset bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">{t("Password reset")}</legend>
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
        <div className="flex gap-2 mt-4">
          <Link
            type="button"
            className="btn btn-outline w-1/2"
            data-testid="go-back-button"
            href={routeConfigMap.login.path}
          >
            <ArrowLeftToLine />
            {t("Go back")}
          </Link>
          <button
            type="submit"
            className="btn btn-primary w-1/2"
            disabled={isLoading || !isDirty || !isValid}
            data-testid="submit-button"
          >
            {isLoading ? (
              <span className="loading loading-spinner" />
            ) : (
              <Send />
            )}
            {t("Reset")}
          </button>
        </div>
      </fieldset>
    </form>
  );
});
