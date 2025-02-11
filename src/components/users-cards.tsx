import UserCard from "./users-card";
import staff from "../assets/images/staff.svg";
import student from "../assets/images/student.svg";
import subject from "../assets/images/subject.svg";
import teacher from "../assets/images/teacher.svg";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CalendarIcon, DollarSignIcon, UsersIcon } from "lucide-react";

const items = [
  {
    name: "Staffs",
    total: "121",
    active: "102",
    inactive: "19",
    image: staff,
  },
  {
    name: "Teachers",
    total: "87",
    active: "80",
    inactive: "7",
    image: teacher,
  },
  {
    name: "Students",
    total: "1021",
    active: "982",
    inactive: "41",
    image: student,
  },
  {
    name: "Parents",
    total: "21",
    active: "20",
    inactive: "1",
    image: subject,
  },
];

export default function UserCards() {
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 px-5 lg:px-10 mt-10">
    //   {items.map((item, idx) => (
    //     <UserCard
    //       key={idx}
    //       total={item.total}
    //       active={item.active}
    //       inactive={item.inactive}
    //       image={item.image}
    //       name={item.name}
    //     />
    //   ))}
    // </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-5 lg:px-10 mt-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Appointment
          </CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Completed Appointment
          </CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
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
          <div className="text-2xl font-bold">+12,234</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}
