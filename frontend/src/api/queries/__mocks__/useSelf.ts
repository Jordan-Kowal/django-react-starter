import type { ApiSelf } from "../useSelf";

export const SELF_MOCK: ApiSelf = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@email.com",
  is_active: true,
  is_staff: false,
  is_superuser: false,
  profile: {
    user: 1,
  },
};
