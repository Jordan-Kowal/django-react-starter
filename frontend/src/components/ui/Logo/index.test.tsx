import { jkdevLogoUrl } from "@/assets";
import { mockNavigate } from "@/tests/mocks";
import { getByTestId, render } from "@/tests/utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { Logo } from "./index";

describe.concurrent("components/ui/Logo", () => {
  test("should render the logo with the right height and classes", async ({
    expect,
  }) => {
    const { container } = render(
      <Logo className="test" height={100} dataTestId="logo" />,
    );
    const wrapper = getByTestId<HTMLImageElement>(container, "logo");
    const image = wrapper.querySelector("img");

    await waitFor(() => {
      expect(wrapper).toBeVisible();
      expect(image).toBeVisible();
      expect(image).toHaveClass("cursor-pointer test");
      expect(image?.getAttribute("height")).toBe("100");
      expect(image?.getAttribute("src")).toBe(jkdevLogoUrl);
    });
  });

  test("should redirect on click", async ({ expect }) => {
    const { container } = render(
      <Logo className="test" height={100} dataTestId="logo" />,
    );
    const wrapper = getByTestId<HTMLImageElement>(container, "logo");

    await waitFor(() => {
      expect(wrapper).toBeVisible();
    });

    act(() => {
      fireEvent.click(wrapper);
    });

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
