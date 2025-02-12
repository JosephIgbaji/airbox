import DashboardLayout from "../dashboard-layout";
import DashboardHeader from "../dashboard-header";

const AdminDashboardLayout = ({ children }) => {
  // const title2 = window.location.pathname.split("/")[2].toUpperCase();
  return (
    <DashboardLayout>
      <div className="min-h-screen mt-16 border-t">
        <DashboardHeader />

        {/* {title2 == "DASHBAORD" && <DashboardWelcomeBanner />} */}
        <div className="px-5 lg:px-10">{children}</div>
      </div>
      {/* Dashboard content will go here */}
    </DashboardLayout>
  );
};

export default AdminDashboardLayout;
