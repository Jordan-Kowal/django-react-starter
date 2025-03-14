import { homepagePath } from "@/features/home/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useLogin } from "../api/useLogin";

const schema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

export const LoginForm: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { mutateAsync: login } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: Schema) => {
    setIsLoading(true);
    try {
      await login(data);
      navigate({ to: homepagePath });
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 justify-center max-w-100 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
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
            <p className="text-red-500 text-right text-xs mt-1">
              {errors?.password?.message}
            </p>
          </label>
        )}
      />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isLoading}
        onClick={() => {
          console.log("clicked");
        }}
      >
        {isLoading && <span className="loading loading-spinner" />}
        {t("Login")}
      </button>
    </form>
  );
});
