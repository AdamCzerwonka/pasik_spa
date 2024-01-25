import { useMutation, useQueryClient } from "react-query";
import { Roles } from "@/types/Roles";
import { APIError } from "../rent/useEndRent";
import { useToast } from "@/components/ui/use-toast";
import { api } from "../api";

type CreateUser = {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  role: Roles;
};

export const useCreateUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (user: CreateUser) => {
      const endpoint = user.role.toLowerCase();

      const response = await api.post(`/${endpoint}`, {
        firstName: user.firstName,
        lastName: user.lastName,
        login: user.login,
        password: user.password,
        active: false,
      });

      if (response.status !== 201) {
        const error = response.data as APIError;
        throw new Error(Object.values(error.errors).join(" "));
      }

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
      onError: (error: Error) => {
        toast({
          title: "There was an error",
          description: error.message,
          variant: "destructive",
        });
      },
    }
  );

  return { createUser: mutate, isLoading };
};
