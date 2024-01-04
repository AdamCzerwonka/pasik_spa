import RentTable from "@/components/RentTable";
import { useRents } from "@/data/rent/useRents";
import { FC } from "react";
import CreateRentDialog from "./CreateRentDialog";

const RentsPage: FC = () => {
  const { rents } = useRents();
  return (
    <div>
      <CreateRentDialog />
      {rents && <RentTable rents={rents} />}
    </div>
  );
};

export default RentsPage;
