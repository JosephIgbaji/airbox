import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PlusSquareIcon } from "lucide-react";
import TitleHeaderBox from "@/components/title-header-box";
import AppointmentForm from "@/components/AppointmentForm";
import AppointmentList from "@/components/AppointmentList";
import { useGetAllBookingQuery } from "../service/booking.service";

export default function AppointmentCalendar() {
  const { data, isLoading } = useGetAllBookingQuery();
  // console.log(data);

  const [addEvent, setAddEvent] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (increment: number) => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + increment);
      return newMonth;
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            <TitleHeaderBox
              heading="Upcoming Appointments"
              icon={<PlusSquareIcon className="w-4 h-4" />}
              actionLabel={"Add New"}
              onClick={() => setAddEvent(!addEvent)}
              RenderComponent={AppointmentForm}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" onClick={() => handleMonthChange(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <Button variant="outline" onClick={() => handleMonthChange(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              month={currentMonth}
              onMonthChange={setCurrentMonth}
            />
          </div>
          <div className="flex-1">
            {selectedDate && <AppointmentList selectedDate={selectedDate} />}
            {/* {selectedDate && <BookingForm selectedDate={selectedDate} />} */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
