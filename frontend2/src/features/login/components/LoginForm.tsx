import { useLocale } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useLogin } from "../api/useLogin";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type Schema = z.infer<typeof schema>;

export const LoginForm: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { mutate: login } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: Schema) => {
    setIsLoading(true);
    try {
      login(data);
    } finally {
      setIsLoading(false);
    }
  };

  const { setLocale, currentLocale } = useLocale();

  return (
    <form
      className="flex flex-col gap-4 justify-center max-w-100 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <button
        type="button"
        className="btn btn-secondary mb-4"
        onClick={() =>
          currentLocale === "fr" ? setLocale("en") : setLocale("fr")
        }
      >
        Toggle Language
      </button>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <label htmlFor="email">
            <input
              id="email"
              className="input input-primary w-full"
              type="email"
              placeholder={t("Enter your email address")}
              {...field}
            />
            <p className="text-red-500 text-right text-xs mt-1">
              {errors?.email?.message}
            </p>
          </label>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <label htmlFor="password">
            <input
              id="password"
              className="input input-primary w-full"
              type="password"
              placeholder={t("Password")}
              {...field}
            />
            <p className="text-red-500 text-right text-xs">
              {errors?.password?.message}
            </p>
          </label>
        )}
      />

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isLoading}
      >
        {t("Login")}
      </button>
    </form>
  );
});
