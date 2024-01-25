import { useQuery } from "react-query";
import { api } from "../api";
import { useAuthStore } from "@/store/authStore";
import { jwtDecode } from "jwt-decode";

export const useLoggedInUser = () => {
  const { token } = useAuthStore();
  const decoded = jwtDecode(token!);
  const id = "id" in decoded ? (decoded.id as string) : "";

  const { data, isLoading } = useQuery(["users", id], async () => {
    const response = await api.get(`/user/${id}`);
    return response.data;
  });

  return { user: data, isLoading };
};
