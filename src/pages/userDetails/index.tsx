import RentTable from "@/components/RentTable";
import { Badge } from "@/components/ui/badge";
import { useUserRents } from "@/data/rent/useUserRents";
import { useUser } from "@/data/user/useUser";
import { FC } from "react";

const UserDetailsPage: FC = () => {
  const { user } = useUser();
  const { rents } = useUserRents();
  return (
    <div>
      <div>First name: {user?.login}</div>
      <div>First name: {user?.firstName}</div>
      <div>First name: {user?.lastName}</div>
      <div>
        First name:{" "}
        <Badge variant={user?.active ? "default" : "secondary"}>
          {user?.active ? "Active" : "Inactive"}
        </Badge>
      </div>
      <div>First name: {user?.role}</div>
      {rents && <RentTable rents={rents} />}
    </div>
  );
};

export default UserDetailsPage;
