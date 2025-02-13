"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  ScanSearchIcon,
  Moon,
  Sun,
  Scan,
  SettingsIcon,
  CalendarIcon,
  LayoutDashboardIcon,
  HomeIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function TopHeader() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(isFullscreen && false);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="flex fixed items-center justify-between max-w-screen-md w-full gap-40 dark:bg-background z-50 bg-white px-10 py-3">
      {/* Search Section */}

      <div className="relative hidden lg:block">
        <ScanSearchIcon className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search" className="w-[300px]" />
      </div>

      <div className="flex items-center justify-between gap-2 w-full">
        <div>
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="border rounded"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="border rounded"
          >
            <Scan className="h-4 w-4" />
          </Button>
        </div>

        <div className=" lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <HamburgerMenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="grid gap-4 py-4"></div>
              <div className="space-y-2 py-2">
                <SheetClose asChild>
                  <NavLink to="/">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full justify-start"
                      >
                        <HomeIcon className="mr-2 h-4 w-4" />
                        Home
                      </Button>
                    )}
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
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
                </SheetClose>
                <SheetClose asChild>
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
                </SheetClose>
                <SheetClose asChild>
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
                </SheetClose>
              </div>
              {/* <SheetFooter>
          <SheetClose asChild>
            
          </SheetClose>
        </SheetFooter> */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
