import { useMutation, useQueryClient } from "react-query";
import { User } from "./useUsers";
import { API_URL } from "../api";

export const useChangeUserStatus = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (user: User) => {
      const endpoint = user.role.toLowerCase();
      const action = user.active ? "deactivate" : "activate";
      const response = await fetch(
        `${API_URL}/${endpoint}/${action}/${user.id}`,
        {
          method: "POST",
        }
      );
      return response.text();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  return { changeUserStatus: mutate, isLoading };
};
