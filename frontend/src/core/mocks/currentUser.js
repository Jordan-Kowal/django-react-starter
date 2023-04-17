import { now } from '@/services/dates';

export const mockedCurrentUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'fake-email@fake-domain.com',
  isActive: true,
  cannotRefreshUntil: now(),
  profile: {
    user: 1,
  },
};
