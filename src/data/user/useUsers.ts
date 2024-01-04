import { Roles } from "@/types/Roles";
import { useQuery } from "react-query";
import { create } from "zustand";

export type User = {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  active: boolean;
  role: Roles;
};

type UsersFilterStore = {
  filter?: string;
  setFilter: (filter: string) => void;
};

export const useUsersFilter = create<UsersFilterStore>((set) => ({
  filter: undefined,
  setFilter: (filter: string) => set({ filter: filter }),
}));

export const useUsers = () => {
  const { filter } = useUsersFilter();
  const { data, isLoading } = useQuery(["users", filter], async () => {
    const filterQuery = `?filter=${filter}`;
    const response = await fetch(
      `http://localhost:8081/user${filter ? filterQuery : ""}`
    );
    return response.json();
  });
  return { users: data as User[], isLoading };
};
