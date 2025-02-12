import { AppointmentTable } from "@/components/AppointmentTable";
import DashboardLayout from "@/components/dashboard-layout";

function AllAppointment() {
  return (
    <>
      <DashboardLayout>
        <div className="min-h-screen mt-16 border-t">
          {/* <DashboardHeader /> */}

          <div className="container p-4 px-5 lg:px-10">
            <AppointmentTable />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default AllAppointment;
