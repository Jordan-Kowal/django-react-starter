import { vi } from "vitest";

export const navigateMock = vi.fn();
export const useLocationMock = vi.fn(() => ["/", navigateMock]);

export const toastErrorMock = vi.fn();
export const toastWarningMock = vi.fn();
export const toastInfoMock = vi.fn();
export const toastSuccessMock = vi.fn();
export const toastMock = {
  error: toastErrorMock,
  warning: toastWarningMock,
  success: toastSuccessMock,
  info: toastInfoMock,
};

export const registerGlobalMocks = () => {
  // matchMedia
  global.matchMedia =
    global.matchMedia ||
    ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

  // HTMLDialogElement
  HTMLDialogElement.prototype.showModal = vi.fn(function (
    this: HTMLDialogElement,
  ) {
    this.setAttribute("open", "");
  });

  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute("open");
  });

  // Toastify
  vi.mock("react-toastify", async (importOriginal) => {
    const mod = await importOriginal<typeof import("react-toastify")>();
    return {
      ...mod,
      toast: toastMock,
    };
  });

  // Wouter
  vi.mock("wouter", async (importOriginal) => {
    const mod = await importOriginal<typeof import("wouter")>();
    return {
      ...mod,
      useLocation: useLocationMock,
    };
  });
};
