import { mockedCurrentUser } from '@/core/mocks';
import getUserFullName from './getUserFullName';

describe('core/users/getUserFullName', () => {
  test('Test getUserFullName', () => {
    expect(getUserFullName(mockedCurrentUser)).toEqual('John Doe');
  });
});
