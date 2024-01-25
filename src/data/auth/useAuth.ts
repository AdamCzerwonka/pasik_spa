import { useAuthStore } from "@/store/authStore";
import { useMutation } from "react-query";
import { api } from "../api";

type Auth = {
  login: string;
  password: string;
};

export const useAuth = () => {
  const { login } = useAuthStore();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: Auth) => {
      const response = await api.post("/auth/login", data);

      const token = response.data;
      login(token["token"]);
    },
  });

  return { auth: mutateAsync };
};
