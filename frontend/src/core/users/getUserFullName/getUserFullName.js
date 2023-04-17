const getUserFullName = (user) => {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
};

export default getUserFullName;
