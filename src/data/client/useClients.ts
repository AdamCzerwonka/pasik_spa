import { useQuery } from "react-query";
import { User } from "../user/useUsers";
import { API_URL } from "../api";

export const useClients = () => {
  const { data, isLoading } = useQuery("clients", async () => {
    const response = await fetch(`${API_URL}/client`);
    return response.json();
  });

  return { clients: data as User[], isLoading };
};
