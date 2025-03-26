import { render } from "@/tests/utils";
import { getByTestId, queryByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { Main } from "./Main";

describe("Main", () => {
  test("should render the component without navbar", async ({ expect }) => {
    const { container } = render(
      <Main dataTestId="main">
        <div>Content</div>
      </Main>,
    );

    const main = getByTestId<HTMLDivElement>(container, "main");
    const navbar = queryByTestId<HTMLDivElement>(container, "main-navbar");

    await waitFor(() => {
      expect(main).toBeVisible();
    });

    expect(main).toHaveTextContent("Content");
    expect(main).toHaveStyle({ minHeight: "100vh" });
    expect(navbar).toBeNull();
  });

  test("should handle extra classnames", async ({ expect }) => {
    const { container } = render(
      <Main dataTestId="main" className="extra">
        <div>Content</div>
      </Main>,
    );

    const main = getByTestId<HTMLDivElement>(container, "main");

    await waitFor(() => {
      expect(main).toBeVisible();
    });

    expect(main).toHaveClass("extra");
  });

  test("should render the component with the NavBar", async ({ expect }) => {
    const { container } = render(
      <Main dataTestId="main" showNavBar>
        <div>Content</div>
      </Main>,
    );

    const main = getByTestId<HTMLDivElement>(container, "main");
    const navbar = getByTestId<HTMLDivElement>(container, "main-navbar");

    await waitFor(() => {
      expect(main).toBeVisible();
    });

    expect(main).toHaveStyle({ marginTop: "64px" });
    expect(navbar).toBeVisible();
  });
});
