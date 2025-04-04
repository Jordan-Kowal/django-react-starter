import { FieldsetInput } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, LockKeyhole, Save } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useUpdatePassword } from "../api";

const schema = z.object({
  currentPassword: z.string().nonempty(),
  newPassword: z.string().nonempty(),
  confirmPassword: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

export const PasswordForm: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { mutateAsync: updatePassword } = useUpdatePassword();

  /** Refined here for translations management */
  const refinedSchema = useMemo(
    () =>
      schema.refine((data) => data.newPassword === data.confirmPassword, {
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
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(refinedSchema),
    mode: "onChange",
  });

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  /* Password change will re-trigger the confirmPassword validation */
  useEffect(() => {
    if (newPassword && confirmPassword) {
      trigger("confirmPassword");
    }
  }, [newPassword, confirmPassword, trigger]);

  const onSubmit = async (data: Schema) => {
    setIsLoading(true);
    try {
      await updatePassword(data);
      reset(
        { currentPassword: "", newPassword: "", confirmPassword: "" },
        { keepValues: false },
      );
    } catch (e) {}
    setIsLoading(false);
  };

  return (
    <form
      className="flex flex-col gap-4 justify-center"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      data-testid="password-form"
    >
      <fieldset className="fieldset">
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <FieldsetInput
              icon={<KeyRound size={16} />}
              label={t("Current password")}
              errorMessage={errors?.currentPassword?.message}
              placeholder={t("Enter your current password")}
              type="password"
              dataTestId="current-password"
              {...field}
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <FieldsetInput
              icon={<LockKeyhole size={16} />}
              label={t("New password")}
              errorMessage={errors?.newPassword?.message}
              placeholder={t("Enter your new password")}
              type="password"
              dataTestId="new-password"
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
        <button
          type="submit"
          className="btn btn-primary mt-4 w-40 justify-self-end"
          disabled={isLoading || !isDirty || !isValid}
          data-testid="submit-button"
        >
          {isLoading ? <span className="loading loading-spinner" /> : <Save />}
          {t("Save")}
        </button>
      </fieldset>
    </form>
  );
});
