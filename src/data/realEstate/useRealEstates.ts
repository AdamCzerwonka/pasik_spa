import { useQuery } from "react-query";
import { API_URL } from "../api";

type RealEstate = {
  id: string;
  name: string;
  address: string;
  area: number;
  price: number;
};

export const useRealEstates = () => {
  const { data, isLoading } = useQuery("realEstates", async () => {
    const response = await fetch(`${API_URL}/realestate`);
    return response.json();
  });

  return { realEstates: data as RealEstate[], isLoading };
};
