import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export const useUser = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery(["users", id], async () => {
    const response = await fetch(`http://localhost:8081/user/${id}`);
    return response.json();
  });

  return { user: data, isLoading };
};
