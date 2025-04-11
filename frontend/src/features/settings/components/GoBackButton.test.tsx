import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { GoBackButton } from "./GoBackButton";

describe.concurrent("GoBackButton", () => {
  test("should render the component", async ({ expect }) => {
    const { container } = render(<GoBackButton />);
    const goBackButton = getByTestId<HTMLButtonElement>(
      container,
      "go-back-button",
    );

    await waitFor(() => {
      expect(goBackButton).toBeVisible();
    });

    expect(goBackButton).toHaveTextContent("Go back");
  });

  test("should go back home on click", async ({ expect }) => {
    const { container } = render(<GoBackButton />);
    const goBackLink = getByTestId<HTMLLinkElement>(container, "go-back-link");

    await waitFor(() => {
      expect(goBackLink).toBeVisible();
    });

    expect(goBackLink.href).toMatch(/\/$/);
  });
});
