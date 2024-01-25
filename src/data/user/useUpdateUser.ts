import { useMutation, useQueryClient } from "react-query";
import { User } from "./useUsers";
import { api } from "../api";

type UpdateUser = { etag: string } & User;

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (user: UpdateUser) => {
      const endpoint = user.role.toLowerCase();
      console.log(user);

      const response = await api.put(
        `/${endpoint}`,
        {
          id: user.id,
          login: user.login,
          firstName: user.firstName,
          lastName: user.lastName,
          active: user.active,
        },
        {
          headers: {
            "If-Match": user.etag,
          },
        }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  return { updateUser: mutate, isLoading };
};
