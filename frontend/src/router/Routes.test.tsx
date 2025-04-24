import * as apiQueries from "@/api/queries";
import { navigateMock } from "@/tests/mocks/globals";
import { selfError } from "@/tests/mocks/handlers/shared";
import { server } from "@/tests/server";
import { render } from "@/tests/utils";
import { getByTestId } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { Routes } from "./Routes";

vi.mock("@/api/queries", async () => {
  const actual = await vi.importActual("@/api/queries");
  return {
    ...actual,
    useAppConfig: vi.fn(),
    useSelf: vi.fn(),
  };
});

describe.concurrent("Routes", () => {
  test("should render the component", ({ expect }) => {
    const { container } = render(<Routes />);
    expect(container).toBeDefined();
  });

  test("should show loading when appConfig is pending", ({ expect }) => {
    vi.spyOn(apiQueries, "useAppConfig").mockReturnValue({
      isPending: true,
      isError: false,
      error: null,
      data: undefined,
    });

    const { container } = render(<Routes />);
    const loadingElement = getByTestId(container, "loading");

    expect(loadingElement).toBeVisible();
  });

  test("should show loading when user is pending", ({ expect }) => {
    vi.spyOn(apiQueries, "useSelf").mockReturnValue({
      isPending: true,
      isError: false,
      error: null,
      data: undefined,
    });

    const { container } = render(<Routes />);
    const loadingElement = getByTestId(container, "loading");

    expect(loadingElement).toBeVisible();
  });

  test.sequential(
    "should render the login page when not authenticated",
    async ({ expect }) => {
      server.use(selfError);
      const { container } = render(<Routes />);
      await new Promise((resolve) => setTimeout(resolve, 100));
      const loginPage = getByTestId(container, "login-page");

      expect(loginPage).toBeVisible();
      expect(navigateMock).not.toHaveBeenCalledWith("/");
    },
  );

  test("should render the homepage when authenticated", async ({ expect }) => {
    const { container } = render(<Routes />);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const homepage = getByTestId(container, "homepage");

    expect(homepage).toBeVisible();
  });
});
