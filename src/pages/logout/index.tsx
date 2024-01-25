import { useAuthStore } from "@/store/authStore";
import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";

const LogoutPage: FC = () => {
  const { logout } = useAuthStore();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to={"/login"} />;
};

export default LogoutPage;
