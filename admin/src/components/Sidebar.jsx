import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { home_icon, appointment_icon, add_icon, people_icon } from "../assets";

const Sidebar = () => {
  const { adminToken } = useSelector((store) => store.admin);
  const { doctorToken } = useSelector((store) => store.doctor);

  return (
    <div className="min-h-screen bg-white border-r border-gray-200 shadow">
      {/* Admin navigation */}
      {adminToken && (
        <div className="flex items-center justify-center flex-col gap-2 p-2 mt-4">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `${isActive && "bg-green-200"} flex items-center gap-2 p-2 rounded-md w-[2rem] sm:w-[4rem] md:w-[14rem] lg:w-[16rem]`
            }
          >
            <img src={home_icon} alt="home_icon" className="w-6" />
            <p className="hidden md:block text-sm font-medium">Dashboard</p>
          </NavLink>

          <NavLink
            to={"/appointments"}
            className={({ isActive }) =>
              `${isActive && "bg-green-200"} flex items-center gap-2 p-2 rounded-md w-[2rem] sm:w-[4rem] md:w-[14rem] lg:w-[16rem]`
            }
          >
            <img src={appointment_icon} alt="home_icon" className="w-6" />
            <p className="hidden md:block text-sm font-medium">Appointments</p>
          </NavLink>

          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `${isActive && "bg-green-200"} flex items-center gap-2 p-2 rounded-md w-[2rem] sm:w-[4rem] md:w-[14rem] lg:w-[16rem]`
            }
          >
            <img src={add_icon} alt="home_icon" className="w-6" />
            <p className="hidden md:block text-sm font-medium">Add Doctor</p>
          </NavLink>

          <NavLink
            to={"/doctors-list"}
            className={({ isActive }) =>
              `${isActive && "bg-green-200"} flex items-center gap-2 p-2 rounded-md w-[2rem] sm:w-[4rem] md:w-[14rem] lg:w-[16rem]`
            }
          >
            <img src={people_icon} alt="home_icon" className="w-6" />
            <p className="hidden md:block text-sm font-medium">Doctors List</p>
          </NavLink>
        </div>
      )}

      {/* Doctor navigation */}
      {doctorToken && (
        <div className="flex items-center justify-center flex-col gap-2 p-2 mt-4">
          <NavLink
            to={"/doctor-dashboard"}
            className={({ isActive }) =>
              `${isActive && "bg-green-200"} flex items-center gap-2 p-2 rounded-md w-[2rem] sm:w-[4rem] md:w-[14rem] lg:w-[16rem]`
            }
          >
            <img src={home_icon} alt="home_icon" className="w-6" />
            <p className="hidden md:block text-sm font-medium">Dashboard</p>
          </NavLink>

          <NavLink
            to={"/doctor-appointments"}
            className={({ isActive }) =>
              `${isActive && "bg-green-200"} flex items-center gap-2 p-2 rounded-md w-[2rem] sm:w-[4rem] md:w-[14rem] lg:w-[16rem]`
            }
          >
            <img src={appointment_icon} alt="home_icon" className="w-6" />
            <p className="hidden md:block text-sm font-medium">Appointments</p>
          </NavLink>

          <NavLink
            to={"/doctor-profile"}
            className={({ isActive }) =>
              `${isActive && "bg-green-200"} flex items-center gap-2 p-2 rounded-md w-[2rem] sm:w-[4rem] md:w-[14rem] lg:w-[16rem]`
            }
          >
            <img src={people_icon} alt="home_icon" className="w-6" />
            <p className="hidden md:block text-sm font-medium">Profile</p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
