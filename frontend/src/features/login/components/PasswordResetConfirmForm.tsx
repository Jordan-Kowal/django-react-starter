import { FieldsetInput } from "@/components/form";
import { routeConfigMap } from "@/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftToLine, LockKeyhole, Save } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "wouter";
import { z } from "zod";
import { usePasswordResetConfirm } from "../api";
import { BaseForm } from "./BaseForm";

const schema = z.object({
  password: z.string().nonempty(),
  confirmPassword: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

export const PasswordResetConfirmForm: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const { uid, token } = useParams();

  const { t } = useTranslation();
  const { mutateAsync: passwordResetConfirm } = usePasswordResetConfirm(
    uid,
    token,
  );

  /** Refined here for translations management */
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
    watch,
    trigger,
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
      await passwordResetConfirm(data);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <BaseForm
      onSubmit={handleSubmit(onSubmit)}
      dataTestId="password-reset-confirm-form"
    >
      <legend className="fieldset-legend">{t("Password reset confirm")}</legend>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <FieldsetInput
            icon={<LockKeyhole size={16} />}
            label={t("Password")}
            errorMessage={errors?.password?.message}
            placeholder={t("Enter your new password")}
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
            icon={<LockKeyhole size={16} />}
            label={t("Confirm password")}
            errorMessage={errors?.confirmPassword?.message}
            placeholder={t("Confirm your password")}
            type="password"
            dataTestId="confirm-password"
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
          {isLoading ? <span className="loading loading-spinner" /> : <Save />}
          {t("Save")}
        </button>
      </div>
    </BaseForm>
  );
});
