"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScanSearchIcon, Moon, Sun, Scan } from "lucide-react";
import { useEffect, useState } from "react";
// import { PlusCircle } from "lucide-react";

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

      <div className="flex items-center gap-2">
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

        {/* User Profile */}
        {/* <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar> */}
      </div>
    </header>
  );
}
