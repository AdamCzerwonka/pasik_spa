import { useQuery } from "react-query";
import { api } from "../api";

type RealEstate = {
  id: string;
  name: string;
  address: string;
  area: number;
  price: number;
};

export const useRealEstates = () => {
  const { data, isLoading } = useQuery("realEstates", async () => {
    const response = await api.get("/realestate");
    return response.data;
  });

  return { realEstates: data as RealEstate[], isLoading };
};
