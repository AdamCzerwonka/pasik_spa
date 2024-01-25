import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../api";

export type APIError = {
  status: number;
  errors: Record<string, string>;
};

export const useEndRent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate, isLoading } = useMutation(
    async (id: string) => {
      const response = await api.post(`/rent/${id}/end`);

      if (response.status == 400) {
        const error = response.data as APIError;
        throw new Error(Object.values(error.errors).join(" "));
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("rents");
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

  return { endRent: mutate, isLoading };
};
