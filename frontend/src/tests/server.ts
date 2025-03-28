import { setupServer } from "msw/node";
import { defaultHandlers } from "./mocks";

export const server = setupServer(...defaultHandlers);
