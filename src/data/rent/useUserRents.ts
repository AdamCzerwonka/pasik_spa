import { useQuery } from "react-query";
import { Rent } from "./useRents";
import { useParams } from "react-router-dom";
import { api } from "../api";

export const useUserRents = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<Rent[]>(["rents", id], async () => {
    const response = await api.get(`/client/${id}/rents`);
    return response.data;
  });

  return { rents: data, isLoading };
};
