import { useSelf } from "@/api/queries";
import { FieldsetInput } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Save, User } from "lucide-react";
import { memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useUpdateSelf } from "../api";

const schema = z.object({
  email: z.string().nonempty().email(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

export const UserForm: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { mutateAsync: updateSelf } = useUpdateSelf();
  const { data: self } = useSelf();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: self?.email,
      firstName: self?.firstName,
      lastName: self?.lastName,
    },
  });

  console.log({ errors, isDirty, isValid });

  const onSubmit = async (data: Schema) => {
    setIsLoading(true);
    try {
      await updateSelf(data);
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
          name="email"
          control={control}
          render={({ field }) => (
            <FieldsetInput
              icon={<Mail size={16} />}
              label={t("Email")}
              errorMessage={errors?.email?.message}
              placeholder={t("Enter your email address")}
              type="email"
              {...field}
            />
          )}
        />
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <FieldsetInput
              icon={<User size={16} />}
              label={t("First name")}
              errorMessage={errors?.firstName?.message}
              placeholder={t("Enter your first name")}
              type="text"
              {...field}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <FieldsetInput
              icon={<User size={16} />}
              label={t("Last name")}
              errorMessage={errors?.lastName?.message}
              placeholder={t("Enter your last name")}
              type="text"
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
