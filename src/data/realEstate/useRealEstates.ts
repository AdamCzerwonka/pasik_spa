import { useQuery } from "react-query";

type RealEstate = {
  id: string;
  name: string;
  address: string;
  area: number;
  price: number;
};

export const useRealEstates = () => {
  const { data, isLoading } = useQuery("realEstates", async () => {
    const response = await fetch("http://localhost:8081/realestate");
    return response.json();
  });

  return { realEstates: data as RealEstate[], isLoading };
};
