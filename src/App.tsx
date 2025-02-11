import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Settings from "./pages/settings";
import AllAppointment from "./pages/allAppointments";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
// import ParentDashboard from "./pages/ParentDashboard";
// import StudentDashboard from "./pages/StudentDashBoard";
// import TeacherDashboard from "./pages/TeacherDashboard";
// import AdminClasses from "./pages/admin/Classes";

function App() {
  // const [showNotification, setShowNotification] = useState(true);
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
