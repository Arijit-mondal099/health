import { logo } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../features/admin/adminSlice.js";
import { doctorLogout } from "../features/doctor/doctorSlice.js";

const Navbar = () => {
  const { adminToken } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (adminToken) dispatch(logout());
    else dispatch(doctorLogout());
    
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="w-full border-b border-gray-200 shadow flex items-center justify-between py-4 px-2 sm:px-4 md:px-8 lg:px-10">
      <div className="flex items-center justify-center gap-2">
        <Link className="flex items-center justify-center">
          <img src={logo} alt="logo" className="w-10 sm:w-12" />
          <h1 className="text-xl font-bold text-gray-600/90">Health</h1>
        </Link>

        <p className="text-xs text-gray-500 border border-gray-500 px-2 py-0.5 rounded-full">
          {adminToken ? "Admin" : "Doctor"}
        </p>
      </div>

      <button
        onClick={handleLogout}
        type="button"
        className="text-xs sm:text-sm text-white py-2 px-4 sm:px-8 rounded-full bg-green-600 cursor-pointer hover:bg-white hover:text-gray-700 transition-all duration-200 border border-gray-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
