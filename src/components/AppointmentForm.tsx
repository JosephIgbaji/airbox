import { PlusSquareIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import BookAppointment from "./BookApointment";
import { useState } from "react";

export default function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  // const [currentMonth, setCurrentMonth] = useState(new Date());

  // const handleDateSelect = (date: Date | undefined) => {
  //   setSelectedDate(date);
  // };

  // const handleMonthChange = (increment: number) => {
  //   setCurrentMonth((prevMonth) => {
  //     const newMonth = new Date(prevMonth);
  //     newMonth.setMonth(newMonth.getMonth() + increment);
  //     return newMonth;
  //   });
  // };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span
          //   variant="outline"
          className="inline-flex text-primary font-semibold text-sm items-center gap-1 cursor-pointer"
        >
          <PlusSquareIcon className="w-4 h-4" />
          Add
        </span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] overflow-y-scroll">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-gray-500">New Appointment</h2>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label className="font-semibold">Create Appointment</Label>
            <div className="flex-1">
              {selectedDate && <BookAppointment selectedDate={selectedDate} />}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
