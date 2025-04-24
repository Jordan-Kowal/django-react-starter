import { render } from "@/tests/utils";
import { getByTestId, queryByTestId } from "@testing-library/react";
import { describe, test } from "vitest";
import { Main } from "./Main";

describe.concurrent("Main", () => {
  test("should render the component without navbar", ({ expect }) => {
    const { container } = render(
      <Main dataTestId="main">
        <div>Content</div>
      </Main>,
    );

    const main = getByTestId<HTMLDivElement>(container, "main");
    const navbar = queryByTestId<HTMLDivElement>(container, "main-navbar");

    expect(main).toBeVisible();
    expect(main).toHaveTextContent("Content");
    expect(main).toHaveStyle({ minHeight: "100vh" });
    expect(navbar).toBeNull();
  });

  test("should handle extra classnames", ({ expect }) => {
    const { container } = render(
      <Main dataTestId="main" className="extra">
        <div>Content</div>
      </Main>,
    );

    const main = getByTestId<HTMLDivElement>(container, "main");
    expect(main).toBeVisible();
    expect(main).toHaveClass("extra");
  });

  test("should render the component with the NavBar", ({ expect }) => {
    const { container } = render(
      <Main dataTestId="main" showNavBar>
        <div>Content</div>
      </Main>,
    );

    const main = getByTestId<HTMLDivElement>(container, "main");
    const navbar = getByTestId<HTMLDivElement>(container, "navbar");
    expect(main).toBeVisible();
    expect(main).toHaveStyle({ marginTop: "64px" });
    expect(navbar).toBeVisible();
  });
});
