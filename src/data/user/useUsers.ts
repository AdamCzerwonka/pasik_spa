export type User = {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  active: boolean;
  role: "client" | "administrator" | "moderator";
};

export const users: User[] = [
  {
    id: "test",
    login: "test",
    firstName: "test",
    lastName: "test",
    active: true,
    role: "client",
  },
  {
    id: "test2",
    login: "test2",
    firstName: "test",
    lastName: "test",
    active: false,
    role: "client",
  },
  {
    id: "test3",
    login: "test3",
    firstName: "test",
    lastName: "test",
    active: true,
    role: "moderator",
  },
  {
    id: "test4",
    login: "test4",
    firstName: "test",
    lastName: "test",
    active: true,
    role: "administrator",
  },
];

export const useUsers = () => {
  return { users };
};
