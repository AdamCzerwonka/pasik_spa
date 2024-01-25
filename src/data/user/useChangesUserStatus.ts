import { useMutation, useQueryClient } from "react-query";
import { User } from "./useUsers";
import { api } from "../api";

export const useChangeUserStatus = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (user: User) => {
      const endpoint = user.role.toLowerCase();
      const action = user.active ? "deactivate" : "activate";
      const response = await api.post(`${endpoint}/${action}/${user.id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  return { changeUserStatus: mutate, isLoading };
};
