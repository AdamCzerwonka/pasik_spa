import { useQuery } from "react-query";
import { User } from "../user/useUsers";
import { api } from "../api";

export const useClients = () => {
  const { data, isLoading } = useQuery("clients", async () => {
    const response = await api.get("/client");
    return response.data;
  });

  return { clients: data as User[], isLoading };
};
