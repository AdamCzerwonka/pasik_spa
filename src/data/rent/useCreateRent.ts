import { useMutation, useQueryClient } from "react-query";
import { APIError } from "./useEndRent";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment";
import { API_URL } from "../api";

type CreateRent = {
  clientId: string;
  realEstateId: string;
  startDate: Date;
};

export const useCreateRent = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (rent: CreateRent) => {
      const response = await fetch(`${API_URL}/rent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...rent,
          //2024-01-03
          startDate: moment(rent.startDate).format("YYYY-MM-DD"),
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
        queryClient.invalidateQueries("rents");
      },
      onError(error: Error) {
        toast({
          title: "There was an error",
          description: error.message,
          variant: "destructive",
        });
      },
    }
  );

  return { createRent: mutate, isLoading };
};
