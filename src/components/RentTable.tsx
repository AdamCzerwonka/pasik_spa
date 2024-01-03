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

type RentTableProps = {
  rents: Rent[];
};

const RentTable: FC<RentTableProps> = ({ rents }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Real estate</TableHead>
          <TableHead>Start date</TableHead>
          <TableHead>End date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rents.map((rent, idx) => (
          <TableRow>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>
              {rent.client.firstName + " " + rent.client.lastName}
            </TableCell>
            <TableCell>{rent.realEstate.name}</TableCell>
            <TableCell>{rent.startDate}</TableCell>
            <TableCell>{rent.endDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RentTable;
