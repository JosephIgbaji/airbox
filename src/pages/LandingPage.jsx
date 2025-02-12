import BookAppointment from "@/components/BookApointment";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function LandingPage() {
  const user = useSelector((state) => state?.user?.user);
  // console.log("User: ", user);
  const [isDarkMode, setIsDarkMode] = useState(true);

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
    <div className="min-h-screen dark:bg-background to-gray-100 dark:to-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
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
        <div className="flex items-center gap-6">
          <a
            href="/dashboard"
            className="text-gray-600  flex items-center gap-2"
          >
            Dashboard
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform rotate-45"
            >
              <path
                d="M5 19L19 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M19 19L19 5L5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
          {user ? (
            <p>{user.name}</p>
          ) : (
            <a href="/login" className="text-gray-600 border-b">
              Sign In
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto my-auto px-6 pt-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="space-y-8 lg:col-span-6">
            {/* Logo */}
            <div className="text-2xl font-light text-gray-600">Airbox NG*</div>

            {/* Hero Text */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight">
                Appointments
                <br />
                scheduling
                <br />
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  start here.
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-md">
                Set up your appointments with ease. Create, manage and share
              </p>
            </div>

            {/* CTA Button */}
            {/* <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-md px-6 py-3 text-lg"
            >
              Create Your First Event
            </Button> */}
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-6">
            <BookAppointment />
          </div>
        </div>
      </main>
    </div>
  );
}
