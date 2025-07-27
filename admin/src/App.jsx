import { ToastContainer } from "react-toastify";
import {useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

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

const App = () => {
  const { adminToken } = useSelector((store) => store.admin);
  const { doctorToken } = useSelector((store) => store.doctor);

  return adminToken || doctorToken ? (
    <>
      <Navbar />

      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctors-list" element={<DoctorsList />} />

          {/* Doctor routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
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
