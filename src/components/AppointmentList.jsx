import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentMiniTable } from "./AppointmentMiniTable";
import { useGetAllBookingQuery } from "../service/booking.service";

export default function AppointmentList({ selectedDate }) {
  const { data, isLoading } = useGetAllBookingQuery();
  const [bookings, setBookings] = useState([]);
  // console.log(data);
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  // console.log("Formated Date: ", formattedDate);
  useEffect(() => {
    if (data) {
      setBookings(
        data.filter(
          (booking) => format(booking.date, "yyyy-MM-dd") === formattedDate
        )
      );
      // console.log("Normal Date: ", data[0].date);
    }
  }, [selectedDate, data]);

  // console.log(bookings);

  if (isLoading) return <div>Loading available slots...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Appointment schedule for {format(selectedDate, "MMMM d, yyyy")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AppointmentMiniTable data={bookings} />
        </div>
      </CardContent>
    </Card>
  );
}
