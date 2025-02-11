import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Settings from "./pages/settings";
import AllAppointment from "./pages/allAppointments";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/appointments" element={<AllAppointment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
