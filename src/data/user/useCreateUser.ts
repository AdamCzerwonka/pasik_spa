import { useMutation, useQueryClient } from "react-query";
import { Roles } from "@/types/Roles";
import { APIError } from "../rent/useEndRent";
import { useToast } from "@/components/ui/use-toast";
import { API_URL } from "../api";

type CreateUser = {
  firstName: string;
  lastName: string;
  login: string;
  role: Roles;
};

export const useCreateUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (user: CreateUser) => {
      const endpoint = user.role.toLowerCase();
      const response = await fetch(`${API_URL}/${endpoint}`, {
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

      if (!response.ok) {
        const error = (await response.json()) as APIError;
        throw new Error(Object.values(error.errors).join(" "));
      }

      return response.json();
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
