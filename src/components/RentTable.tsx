import { FC } from "react";
import { Rent } from "@/data/rent/useRents";
import { useEndRent } from "@/data/rent/useEndRent";
import ConfirmDialog from "./ConfirmDialog";

type RentTableProps = {
  rents: Rent[];
};

const RentTable: FC<RentTableProps> = ({ rents }) => {
  const { endRent } = useEndRent();

  const handleEndRent = (id: string) => {
    endRent(id);
  };

  return (
    <div className="flex flex-col gap-2">
      {rents.map((rent) => (
        <div
          key={rent.id}
          className="flex flex-col gap-2 border rounded-md p-2"
        >
          <div>
            Client: {rent.client.firstName + " " + rent.client.lastName}
          </div>
          <div>Real estate: {rent.realEstate.name}</div>
          <div>Start date: {new Date(rent.startDate).toLocaleDateString()}</div>
          <div>
            End date:
            {rent.endDate && new Date(rent.endDate).toLocaleDateString()}
          </div>
          <div>
            {!rent.endDate && (
              <ConfirmDialog onClick={() => handleEndRent(rent.id)} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentTable;
