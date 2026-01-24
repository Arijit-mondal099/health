/**
 * Node modules
 */
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/**
 * Pages & components
 */
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Doctors from "./pages/Doctors";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />

      {/* app all routes */}
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/doctors"} element={<Doctors />} />
        <Route path={"/doctors/:speciality"} element={<Doctors />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/contact"} element={<Contact />} />
        <Route path={"/my-profile"} element={<MyProfile />} />
        <Route path={"/my-appointments"} element={<MyAppointment />} />
        <Route path={"/appointment/:doctorId"} element={<Appointment />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>

      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;
