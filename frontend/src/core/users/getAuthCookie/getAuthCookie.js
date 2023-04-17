import { getCookie } from 'jkscript';
import csrfTokenCookieName from '@/core/constants';

const getAuthCookie = () => getCookie(csrfTokenCookieName);

export default getAuthCookie;
