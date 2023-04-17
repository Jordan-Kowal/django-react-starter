import csrfTokenCookieName from '@/core/constants';
import getAuthCookie from './getAuthCookie';

describe('core/users/getAuthCookie', () => {
  test('Test getAuthCookie', () => {
    const cookieValue = 'ValueForMyCsrfToken';
    expect(getAuthCookie()).toEqual(null);
    document.cookie = `${csrfTokenCookieName}=${cookieValue}`;
    expect(getAuthCookie()).toEqual(cookieValue);
  });
});
