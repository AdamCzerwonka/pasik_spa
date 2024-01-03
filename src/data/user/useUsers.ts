import { Roles } from "@/types/Roles";
import { useQuery } from "react-query";

export type User = {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  active: boolean;
  role: Roles;
};

export const useUsers = () => {
  const { data, isLoading } = useQuery("users", async () => {
    const response = await fetch("http://localhost:8081/user");
    return response.json();
  });
  return { users: data as User[], isLoading };
};
