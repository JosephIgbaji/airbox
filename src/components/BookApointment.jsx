import { useEffect, useState } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
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
import rtkMutation from "../utils/rtkMutation";
import {
  useAddBookingMutation,
  useGetAllBookingQuery,
} from "../service/booking.service";
import { showAlert } from "../service/static/alert";
import { useSelector } from "react-redux";

export default function BookAppointment() {
  const { data, isLoading, refetch } = useGetAllBookingQuery();

  const location = useLocation();

  const [selectedTime, setSelectedTime] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(undefined);
  const [addBooking, { error, isSuccess }] = useAddBookingMutation({
    provideTag: ["Booking"],
  });
  const navigate = useNavigate();

  const token = useSelector((state) => state?.user?.token);
  const expiration = useSelector((state) => state?.user?.expiration);

  const [timeSlots, setTimeSlots] = useState([
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
  ]);

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Booking Successful!", "success");
      setDate(undefined);
      setTitle("");
      setSelectedTime(null);
      if (location.pathname !== "/") {
        refetch();
      }
    } else if (error) {
      console.log("Error: ", error);
      showAlert("Oops", error?.data?.error || "An error occurred", "error");
      // showAlert("Oops", "An error occurred", "error");
    }
  }, [isSuccess, error, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !expiration || new Date().getTime() > expiration) {
      return <Navigate to="/login" />;
    }

    if (!selectedTime || !title || !date) {
      showAlert("Oops", error || "Please fill in all fields", "error");
      return;
    }

    const data = { time: selectedTime, date, title };
    console.log("data: ", data);

    try {
      await rtkMutation(addBooking, data);
    } catch (err) {
      console.error(err);
      showAlert("Oops", err?.data?.error || "An error occurred", "error");
    }
  };

  // const formattedDate = format(date, "yyyy-MM-dd");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {location.pathname === "/" ? (
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
          ) : (
            <div>
              <div>
                <Label htmlFor="title">Time</Label>
                <Input
                  type="time"
                  id="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  placeholder="Choose Your Time"
                />
              </div>
            </div>
          )}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Reason for Appointment"
            />
          </div>
          {location.pathname !== "/" ? (
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Enter your nam"
              />
            </div>
          ) : (
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
          )}
          <Button
            onClick={handleSubmit}
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
