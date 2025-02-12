import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UsersIcon } from "lucide-react";
import { useGetAllBookingQuery } from "../service/booking.service";
import { useEffect, useState } from "react";

export default function UserCards() {
  const { data, isLoading } = useGetAllBookingQuery();
  // const [bookings, setBookings] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [completedAppointments, setCompletedAppointments] = useState(0);
  const [cancelledAppointments, setCancelledAppointments] = useState(0);

  useEffect(() => {
    // setBookings(data);
    setTotalAppointments(data?.length);
    setCompletedAppointments(
      data?.filter((booking) => booking.status === "confirmed").length
    );
    setCancelledAppointments(
      data?.filter((booking) => booking.status !== "confirmed").length
    );
  }, [data]);

  if (isLoading) {
    return <div className="px-5 lg:px-10 mt-10 mb-10">Loading...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-5 lg:px-10 mt-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Appointment
          </CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
          {/* <DollarSignIcon className="h-4 w-4 text-muted-foreground" /> */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAppointments}</div>
          {/* <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Confirm Appointment
          </CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
          {/* <CalendarIcon className="h-4 w-4 text-muted-foreground" /> */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedAppointments}</div>
          {/* <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Cancelled Appointments
          </CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{cancelledAppointments}</div>
          {/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
        </CardContent>
      </Card>
    </div>
  );
}
