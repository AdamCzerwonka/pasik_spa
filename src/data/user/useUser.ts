import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export const useUser = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery(["users", id], async () => {
    const response = await fetch(`${API_URL}/user/${id}`);
    return response.json();
  });

  return { user: data, isLoading };
};
