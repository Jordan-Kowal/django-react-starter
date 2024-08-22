import * as app from "@/api/app";
import { APP_CONFIG_MOCK } from "@/api/app/__mocks__/appConfig";
import * as auth from "@/api/auth";
import * as self from "@/api/self";
import { SELF_MOCK } from "@/api/self/__mocks__/self";
import { getByTestId, render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { Routes } from "./index";

describe.concurrent("routes/Routes", () => {
  test.sequential(
    "should show loading while fetching user",
    async ({ expect }) => {
      vi.spyOn(self, "useSelf").mockImplementation(() => ({
        isPending: true,
        isError: false,
        error: null,
        data: undefined,
      }));

      const { container } = render(<Routes />);

      await waitFor(() => {
        const loading = getByTestId<HTMLDivElement>(container, "loading-user");
        expect(loading).toBeVisible();
      });
    },
  );

  test.sequential("should show login page of no user", async ({ expect }) => {
    vi.spyOn(self, "useSelf").mockImplementation(() => ({
      isPending: false,
      isError: false,
      error: null,
      data: undefined,
    }));

    const { container } = render(<Routes />);

    await waitFor(() => {
      const loginPage = getByTestId<HTMLDivElement>(container, "login-page");
      expect(loginPage).toBeVisible();
    });
  });

  test.sequential(
    "should show loading if waiting for application config",
    async ({ expect }) => {
      vi.spyOn(auth, "useCheckAuth").mockImplementation(() => ({
        isPending: false,
        isError: false,
        error: null,
      }));

      vi.spyOn(self, "useSelf").mockImplementation(() => ({
        isPending: false,
        isError: false,
        error: null,
        data: SELF_MOCK,
      }));

      vi.spyOn(app, "useAppConfig").mockImplementation(() => ({
        isPending: true,
        isError: false,
        error: null,
        data: undefined,
      }));

      const { container } = render(<Routes />);

      await waitFor(() => {
        const loading = getByTestId<HTMLDivElement>(container, "loading-app");
        expect(loading).toBeVisible();
      });
    },
  );

  test.sequential(
    "should show the route loading animation if user and app are ready",
    async ({ expect }) => {
      vi.spyOn(auth, "useCheckAuth").mockImplementation(() => ({
        isPending: false,
        isError: false,
        error: null,
      }));

      vi.spyOn(self, "useSelf").mockImplementation(() => ({
        isPending: false,
        isError: false,
        error: null,
        data: SELF_MOCK,
      }));

      vi.spyOn(app, "useAppConfig").mockImplementation(() => ({
        isPending: false,
        isError: false,
        error: null,
        data: APP_CONFIG_MOCK,
      }));

      const { container } = render(<Routes />);

      await waitFor(() => {
        const loading = getByTestId<HTMLDivElement>(container, "loading-route");
        expect(loading).toBeVisible();
      });
    },
  );
});
