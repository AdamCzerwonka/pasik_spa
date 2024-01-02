import { useParams } from "react-router-dom";
import { users } from "./useUsers";

export const useUser = () => {
  const { id } = useParams();
  if (!id) {
    return { user: undefined };
  }
  return { user: users.find((x) => x.id === id) };
};
