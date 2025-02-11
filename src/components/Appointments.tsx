import TitleHeaderBox from "./title-header-box";
import { PlusSquareIcon } from "lucide-react";
import { Card } from "./ui/card";
import NewEventForm from "./AppointmentForm";
import { useState } from "react";
import { Calendar } from "./ui/calendar";

const Appointments = () => {
  const [addEvent, setAddEvent] = useState(false);

  return (
    <div className="lg:col-span-6 xl:col-span-4 space-y-6 border p-4 rounded-md">
      <div className="space-y-2">
        <TitleHeaderBox
          heading="Schedules"
          icon={<PlusSquareIcon className="w-4 h-4" />}
          actionLabel={"Add New"}
          onClick={() => setAddEvent(!addEvent)}
          RenderComponent={NewEventForm}
        />
        {/* {addEvent && <NewEventForm />} */}
        <Card className="border-none shadow-none">
          <Calendar
            mode="single"
            className="rounded-md border border-none shadow-none"
          />
        </Card>
      </div>
    </div>
  );
};

export default Appointments;
