import { useQuery } from "react-query";
import { Rent } from "./useRents";
import { api } from "../api";
import { useAuthStore } from "@/store/authStore";
import { jwtDecode } from "jwt-decode";

export const useLoggedInUserRents = () => {
  const { token } = useAuthStore();
  const decoded = jwtDecode(token!);
  const id = "id" in decoded ? (decoded.id as string) : "";
  const { data, isLoading } = useQuery<Rent[]>(["rents", id], async () => {
    const response = await api.get(`/client/${id}/rents`);
    return response.data;
  });

  return { rents: data, isLoading };
};
