import { getByTestId } from "@testing-library/react";
import { describe, test } from "vitest";
import { render } from "@/tests/utils";
import { GoBackButton } from "./GoBackButton";

describe.concurrent("GoBackButton", () => {
  test("should render the component", ({ expect }) => {
    const { container } = render(<GoBackButton />);
    const goBackButton = getByTestId<HTMLButtonElement>(
      container,
      "go-back-button",
    );

    expect(goBackButton).toBeVisible();
    expect(goBackButton).toHaveTextContent("Go back");
  });

  test("should go back home on click", ({ expect }) => {
    const { container } = render(<GoBackButton />);
    const goBackLink = getByTestId<HTMLLinkElement>(container, "go-back-link");

    expect(goBackLink).toBeVisible();
    expect(goBackLink.href).toMatch(/\/$/);
  });
});
