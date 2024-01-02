import { useQuery } from "react-query";
import { Rent } from "./useRents";
import { useParams } from "react-router-dom";

export const useUserRents = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<Rent[]>(["rents", id], async () => {
    const response = await fetch(`http://localhost:8080/client/${id}/rents`);
    return response.json();
  });

  return { rents: data, isLoading };
};
