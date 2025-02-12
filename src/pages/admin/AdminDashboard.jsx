import "../../index.css";
import UserCards from "./../../components/users-cards";
import DashboardHeader from "./../../components/dashboard-header";
import DashboardLayout from "./../../components/dashboard-layout";
import { FeesCollectionChart } from "../../components/revenue-chart";
import { Card } from "@/components/ui/card";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AppointmentCalendar from "./../calender";
import CustomSelector from "./../../components/CustomSelector";

function AdminDashboard() {
  const token = useSelector((state) => state?.user?.token);
  const expiration = useSelector((state) => state?.user?.expiration);

  // console.log(new Date().getTime() > expiration);
  // if (!token) {
  if (!token || !expiration || new Date().getTime() > expiration) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <DashboardLayout>
        <div className="min-h-screen mt-16 border-t">
          <DashboardHeader />

          <UserCards />

          <div className="container p-4 px-5 lg:px-10">
            <AppointmentCalendar />
          </div>

          <div className="p-5 lg:px-10 space-y-6">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
              <Card className="p-4 col-span-12 bg-white dark:bg-background rounded-lg shadow-sm">
                <CustomSelector title={"Weekly Revenue"} />
                <FeesCollectionChart />
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default AdminDashboard;
