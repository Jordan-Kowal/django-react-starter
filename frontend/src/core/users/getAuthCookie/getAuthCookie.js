import csrfTokenCookieName from "@/core/constants";
import { getCookie } from "jkscript";

const getAuthCookie = () => getCookie(csrfTokenCookieName);

export default getAuthCookie;
