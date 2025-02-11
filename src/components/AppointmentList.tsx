import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentMiniTable } from "./AppointmentMiniTable";

interface AppointmentListProps {
  selectedDate: Date;
}

export default function AppointmentList({
  selectedDate,
}: AppointmentListProps) {
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const { data: availableSlots, isLoading } = useQuery({
    queryKey: ["availableSlots", formattedDate],
    queryFn: () => fetchAvailableSlots(formattedDate),
  });

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
          <AppointmentMiniTable />
        </div>
      </CardContent>
    </Card>
  );
}
