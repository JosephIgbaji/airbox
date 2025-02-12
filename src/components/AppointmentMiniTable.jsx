import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export function AppointmentMiniTable({ data }) {
  // console.log(data);
  return (
    <>
      {data.length > 0 ? (
        <Table>
          <TableCaption>A list of appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((booking, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{booking.title}</TableCell>
                <TableCell>{format(booking.date, "yyyy-MM-dd")}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell className="text-right">{booking.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center">No appointments available</div>
      )}
    </>
  );
}
