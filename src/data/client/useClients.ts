import { useQuery } from "react-query";
import { User } from "../user/useUsers";

export const useClients = () => {
  const { data, isLoading } = useQuery("clients", async () => {
    const response = await fetch("http://localhost:8081/client");
    return response.json();
  });

  return { clients: data as User[], isLoading };
};
