import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Real estate</TableHead>
          <TableHead>Start date</TableHead>
          <TableHead>End date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rents.map((rent, idx) => (
          <TableRow key={rent.id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>
              {rent.client.firstName + " " + rent.client.lastName}
            </TableCell>
            <TableCell>{rent.realEstate.name}</TableCell>
            <TableCell>
              {new Date(rent.startDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {rent.endDate && new Date(rent.endDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {!rent.endDate && (
                <ConfirmDialog onClick={() => handleEndRent(rent.id)} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RentTable;
