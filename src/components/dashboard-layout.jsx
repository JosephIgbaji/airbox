import { useSelector } from "react-redux";
import { AppSidebar } from "./app-sidebar";
import TopHeader from "./TopHeader";
import { SidebarProvider } from "./ui/sidebar";
import { Navigate } from "react-router-dom";

function DashboardLayout({ children }) {
  // const token = useSelector((state) => state?.user?.token);
  // const expiration = useSelector((state) => state?.user?.expiration);

  // // console.log(new Date().getTime() > expiration);
  // // if (!token) {
  // if (!token || !expiration || new Date().getTime() > expiration) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        {/* <SidebarTrigger /> */}
        <main className="w-full overflow-hidden">
          <div className="">
            <TopHeader />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}

export default DashboardLayout;
