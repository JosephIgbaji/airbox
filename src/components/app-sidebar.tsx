import {
  Home,
  ChevronUp,
  User2,
  SettingsIcon,
  CalendarIcon,
  LayoutDashboardIcon,
} from "lucide-react";

import {
  SidebarFooter,
  SidebarHeader,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { showAlert } from "../service/static/alert";

export function AppSidebar() {
  const user = useSelector((state: any) => state?.user?.user);
  // console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
    showAlert("", "You've ended your current session", "success");
  };

  return (
    <div className="relative">
      <Sidebar collapsible="icon">
        <div className="flex items-center justify-between">
          <div className="hidden lg:block z-50 absolute top-[50%] -right-[12px] rounded-full bg-primary">
            <SidebarTrigger />
          </div>
          <SidebarHeader>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate("/")}>
                <Home /> Airbox
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarHeader>

          {/* <SidebarTrigger /> */}
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="font-semibold text-[18px]">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* {items?.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild className="text-gray-500">
                      <div className="flex items-center cursor-pointer">
                        {typeof item.icon == "string" ? (
                          <img
                            src={item.icon}
                            alt=""
                            width={20}
                            height={20}
                            className="text-lg font-semibold"
                          />
                        ) : (
                          <item.icon className="text-lg font-semibold" />
                        )}

                        <span
                          className={`${"text-[#1e2738]"} font-medium text-[16px] ml-4 hover:border-b-[2px] border-[#1e2738] transition-all`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))} */}
                <ScrollArea className="flex-1">
                  <div className="space-y-2 py-2">
                    <NavLink to="/dashboard">
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className="w-full justify-start"
                        >
                          <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                      )}
                    </NavLink>
                    <NavLink to="/appointments">
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className="w-full justify-start"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Appointments
                        </Button>
                      )}
                    </NavLink>
                    <NavLink to="/settings">
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className="w-full justify-start"
                        >
                          <SettingsIcon className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                      )}
                    </NavLink>
                  </div>
                </ScrollArea>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {user?.name}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  {/* <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem> */}

                  <DropdownMenuItem onClick={logout}>
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
