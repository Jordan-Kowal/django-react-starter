import { getByTestId, render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { FormCard } from "./index";

describe.concurrent("components/features/User/FormCard", () => {
  const getElements = (
    container: HTMLElement,
  ): { card: HTMLDivElement; button: HTMLButtonElement } => {
    const card = getByTestId<HTMLDivElement>(container, "form-card");
    const button = card.querySelector(
      "button[type='submit']",
    ) as HTMLButtonElement;

    return {
      card,
      button,
    };
  };

  test("should correctly render the card", async ({ expect }) => {
    const { container } = render(
      <FormCard
        title="title"
        submitText="submit"
        isLoading={false}
        className="custom-class"
        dataTestId="form-card"
      >
        <div>test</div>
      </FormCard>,
    );

    await waitFor(() => {
      const { card, button } = getElements(container);
      expect(card).toBeVisible();
      expect(card).toHaveClass("custom-class w-full !m-auto max-w-2xl");
      expect(card).toHaveTextContent("title");
      expect(card).toHaveTextContent("test");
      expect(button).toBeVisible();
      expect(button).toHaveTextContent("submit");
      expect(button).not.toHaveClass("ant-btn-loading");
    });
  });

  test("should correctly handle the loading animation", async ({ expect }) => {
    const { container } = render(
      <FormCard
        title="title"
        submitText="submit"
        isLoading
        className="custom-class"
        dataTestId="form-card"
      >
        <div>test</div>
      </FormCard>,
    );

    await waitFor(() => {
      const { card, button } = getElements(container);
      expect(card).toBeVisible();
      expect(button).toBeVisible();
      expect(button).toHaveClass("ant-btn-loading");
    });
  });
});
