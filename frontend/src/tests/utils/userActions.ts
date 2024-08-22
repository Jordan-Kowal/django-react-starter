import { fireEvent, screen } from "@testing-library/react";

export const chooseAntSelectOption = async (
  input: HTMLInputElement,
  value: string,
  index = 0,
): Promise<void> => {
  fireEvent.mouseDown(input);
  fireEvent.change(input, { target: { value } });
  const option = screen.getAllByText(value)[index];
  fireEvent.click(option);
};

export const setInputValue = (
  input: HTMLInputElement | HTMLTextAreaElement,
  value: string,
): void => {
  fireEvent.change(input, { target: { value } });
};
