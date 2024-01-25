import { useQuery } from "react-query";
import { api } from "../api";

export type Rent = {
  realEstateName: string;
  clientLastName: string;
  clientFirstName: string;
  id: string;
  startDate: string;
  endDate: string;
};

export const useRents = () => {
  const { data, isLoading } = useQuery<Rent[]>("rents", async () => {
    const response = await api.get("/rent");
    return response.data;
  });

  return { rents: data, isLoading };
};
