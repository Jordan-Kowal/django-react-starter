import { FieldsetInput } from "@/components/form";
import i18n from "@/config/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Save } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useUpdatePassword } from "../api";

const schema = z
  .object({
    currentPassword: z.string().nonempty(),
    password: z.string().nonempty(),
    confirmPassword: z.string().nonempty(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t("Passwords do not match"),
    path: ["confirmPassword"],
  });

type Schema = z.infer<typeof schema>;

export const PasswordForm: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { mutateAsync: updatePassword } = useUpdatePassword();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    trigger,
    watch,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
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
      await updatePassword(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 justify-center max-w-100"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <fieldset className="fieldset">
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <FieldsetInput
              icon={<KeyRound size={16} />}
              label={t("Current Password")}
              errorMessage={errors?.currentPassword?.message}
              placeholder={t("Enter your current password")}
              type="password"
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
              label={t("Confirm Password")}
              errorMessage={errors?.confirmPassword?.message}
              placeholder={t("Confirm your password")}
              type="password"
              {...field}
            />
          )}
        />
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isLoading || !isDirty || !isValid}
        >
          {isLoading ? <span className="loading loading-spinner" /> : <Save />}
          {t("Save changes")}
        </button>
      </fieldset>
    </form>
  );
});
