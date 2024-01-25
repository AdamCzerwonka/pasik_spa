import { useQuery } from "react-query";
import { api } from "../api";

export type Rent = {
  id: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    login: string;
    active: boolean;
  };
  realEstate: {
    id: string;
    name: string;
    address: string;
    area: number;
    price: number;
  };
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
