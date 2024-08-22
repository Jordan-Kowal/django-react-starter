import { setupServer } from "msw/node";
import { handlers } from "./mocks";

export const server = setupServer(...handlers);
