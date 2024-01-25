import { useMutation, useQueryClient } from "react-query";
import { APIError } from "./useEndRent";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment";
import { api } from "../api";

type CreateRent = {
  realEstateId: string;
  startDate: Date;
};

export const useCreateRentMe = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (rent: CreateRent) => {
      const response = await api.post("/rent/me", {
        ...rent,
        //2024-01-03
        startDate: moment(rent.startDate).format("YYYY-MM-DD"),
      });

      if (response.status === 200) {
        const error = response.data as APIError;
        throw new Error(Object.values(error.errors).join(" "));
      }

      return response.data;
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
