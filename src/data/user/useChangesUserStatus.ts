import { useMutation, useQueryClient } from "react-query";
import { User } from "./useUsers";

export const useChangeUserStatus = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (user: User) => {
      const endpoint = user.role.toLowerCase();
      const action = user.active ? "deactivate" : "activate";
      const response = await fetch(
        `http://localhost:8081/${endpoint}/${action}/${user.id}`,
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
