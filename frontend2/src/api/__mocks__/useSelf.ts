import type { Self } from "../useSelf";

export const SELF_MOCK: Self = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@email.com",
  isActive: true,
  isStaff: false,
  isSuperuser: false,
  profile: {
    user: 1,
  },
};
