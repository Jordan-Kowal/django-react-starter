export const getByTestId = <T extends HTMLElement>(
  container: HTMLElement | Document,
  id: string,
): T => container.querySelector(`[data-testid="${id}"]`) as T;
