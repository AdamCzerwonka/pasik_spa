import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "../api";
import { User } from "./useUsers";

export const useUser = (userId: string | undefined) => {
  let { id } = useParams();

  if (id === undefined) {
    id = userId;
  }

  const { data, isLoading } = useQuery(["users", id], async () => {
    const response = await api.get(`/user/${id}`);

    console.log(response.headers);

    const etag = response.headers["etag"] as string;

    const user: User = {
      ...response.data,
      eTag: etag.substring(1, etag.length - 1),
    };
    console.log(user);
    return user;
  });

  return { user: data, isLoading };
};
