import { homepagePath } from "@/features/home/routes";
import { type ParsedLocation, redirect } from "@tanstack/react-router";
import type { RouterContext } from "./router";

export const maybeRedirectToLogin = ({
  context,
  location,
}: { context: RouterContext; location: ParsedLocation }) => {
  if (!context.isAuthenticated) {
    throw redirect({
      to: "/login",
      search: { redirect: location.href },
    });
  }
};

export const maybeRedirectToHome = ({
  context,
}: { context: RouterContext }) => {
  if (context.isAuthenticated) {
    throw redirect({ to: homepagePath });
  }
};
