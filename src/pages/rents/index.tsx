import RentTable from "@/components/RentTable";
import { useRents } from "@/data/rent/useRents";
import { FC } from "react";

const RentsPage: FC = () => {
  const { rents } = useRents();
  return <div>{rents && <RentTable rents={rents} />}</div>;
};

export default RentsPage;
