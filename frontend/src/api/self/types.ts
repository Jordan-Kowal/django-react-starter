export type UpdateSelfRequestData = {
  email: string;
  firstName: string;
  lastName: string;
};

export type UpdatePasswordRequestData = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export type Self = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  profile: {
    user: number;
  };
};
