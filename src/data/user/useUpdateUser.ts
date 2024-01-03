import { useMutation, useQueryClient } from "react-query";
import { User } from "./useUsers";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (user: User) => {
      const endpoint = user.role.toLowerCase();
      const response = await fetch(`http://localhost:8081/${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          login: user.login,
          firstName: user.firstName,
          lastName: user.lastName,
          active: user.active,
        }),
      });

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  return { updateUser: mutate, isLoading };
};