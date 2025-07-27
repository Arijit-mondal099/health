import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import AddDoctor from "./pages/admin/AddDoctor";
import Appointments from "./pages/admin/Appointments";
import DoctorsList from "./pages/admin/DoctorsList";
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";
import DoctorAppointments from "./pages/doctor/DoctorAppointments.jsx";
import DoctorProfile from "./pages/doctor/DoctorProfile.jsx";

const ProtectedRoute = ({ element, token }) => {
  return token ? element : <Navigate to="/" replace />;
};

const App = () => {
  const { adminToken } = useSelector((store) => store.admin);
  const { doctorToken } = useSelector((store) => store.doctor);

  return adminToken || doctorToken ? (
    <>
      <Navbar />

      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={
            adminToken && <Navigate to={"/admin-dashboard"} replace /> || 
            doctorToken && <Navigate to={"/doctor-dashboard"} replace />
          }/>

          {/* Admin routes */}
          <Route path="/admin-dashboard" element={<ProtectedRoute token={adminToken} element={<Dashboard />} />} />
          <Route path="/appointments" element={<ProtectedRoute token={adminToken} element={<Appointments />} />} />
          <Route path="/add-doctor" element={<ProtectedRoute token={adminToken} element={<AddDoctor />} />} />
          <Route path="/doctors-list" element={<ProtectedRoute token={adminToken} element={<DoctorsList />} />} />

          {/* Doctor routes */}
          <Route path="/doctor-dashboard" element={<ProtectedRoute token={doctorToken} element={<DoctorDashboard />} />} />
          <Route path="/doctor-appointments" element={<ProtectedRoute token={doctorToken} element={<DoctorAppointments />} />} />
          <Route path="/doctor-profile" element={<ProtectedRoute token={doctorToken} element={<DoctorProfile />} />} />
        </Routes>
      </div>

      <ToastContainer />
    </>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
