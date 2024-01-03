import { useMutation, useQueryClient } from "react-query";
import { Roles } from "@/types/Roles";

type CreateUser = {
  firstName: string;
  lastName: string;
  login: string;
  role: Roles;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (user: CreateUser) => {
      const endpoint = user.role.toLowerCase();
      const response = await fetch(`http://localhost:8081/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          login: user.login,
          active: false,
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

  return { createUser: mutate, isLoading };
};
