/**
 * Node modules
 */
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@health/ui";

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
import Container from "./components/Container";

const App = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 pt-20">
                <Container>
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
                </Container>
            </main>

            <Footer />
            <Toaster position="top-center" richColors />
        </div>
    );
};

export default App;