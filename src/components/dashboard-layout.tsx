import { AppSidebar } from "./app-sidebar";
import TopHeader from "./TopHeader";
import { SidebarProvider } from "./ui/sidebar";

function DashboardLayout({ children }) {
  //   const [showNotification, setShowNotification] = useState(true);
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
