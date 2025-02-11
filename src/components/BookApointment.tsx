import { useState } from "react";
import { format } from "date-fns";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// interface BookAppointmentProps {
//   selectedDate: Date;
// }

// Mock API functions
// const fetchAvailableSlots = async (date: string) => {
//   // Simulating API call
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   return ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
// };

// const bookAppointment = async (appointment: {
//   date: Date;
//   time: string;
//   name: string;
// }) => {
//   // Simulating API call
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   return { success: true, message: "Appointment booked successfully!" };
// };

export default function BookAppointment() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [timeSlots, setTimeSlots] = useState([
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
  ]);

  // const formattedDate = format(date, "yyyy-MM-dd");

  // const { data: availableSlots, isLoading } = useQuery({
  //   queryKey: ["availableSlots", formattedDate],
  //   queryFn: () => fetchAvailableSlots(formattedDate),
  // });

  // const bookMutation = useMutation({
  //   mutationFn: bookAppointment,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["availableSlots", formattedDate],
  //     });
  //     setSelectedTime(null);
  //     setName("");
  //   },
  // });

  const handleBook = () => {
    if (selectedTime && name) {
      // bookMutation.mutate({ date: formattedDate, time: selectedTime, name });
    }
  };
  // if (isLoading) return <div>Loading available slots...</div>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="time">Available Time Slots</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {timeSlots?.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedTime === slot ? "default" : "outline"}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Reason for Appointment"
            />
          </div>
          {/* <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Enter your nam"
            />
          </div> */}
          <div className="w-full">
            <Label className="block mb-1" htmlFor="date">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button
            onClick={handleBook}
            disabled={!selectedTime || !title || !date}
            className="w-full"
          >
            {"Book Appointment"}
          </Button>
          {/* {bookMutation.isSuccess && (
            <div className="text-green-600 mt-2">
              {bookMutation.data.message}
            </div>
          )}
          {bookMutation.isError && (
            <div className="text-red-600 mt-2">
              Error booking appointment. Please try again.
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}
