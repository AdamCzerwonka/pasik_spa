import { useQuery } from "react-query";
import { Rent } from "./useRents";
import { useParams } from "react-router-dom";
import { API_URL } from "../api";

export const useUserRents = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<Rent[]>(["rents", id], async () => {
    const response = await fetch(`${API_URL}/client/${id}/rents`);
    return response.json();
  });

  return { rents: data, isLoading };
};
