import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "react-query";
import { api } from "../api";

type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export const useResetPassword = () => {
  const { toast } = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: ChangePasswordData) => {
      const response = await api.put("/account", data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
      });
    },
  });

  return { changePassword: mutateAsync };
};
