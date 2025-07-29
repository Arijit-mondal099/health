import { useEffect, useState } from "react";
import { logo, dropdown_icon, menu_icon, cross_icon } from "../assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../features/user/userSlice.js";
import { toast } from "react-toastify";

const Navbar = () => {
  const [userMenu, setUserMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { token, userData } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logout successfully");
  };

  useEffect(() => {
    if ( token ) {
      dispatch(getUser());
    }
  }, [token, dispatch]);

  return (
    <div className="fixed top-0 right-0 left-0 backdrop-blur-md flex items-center justify-between py-4 mx-4 sm:mx-[10%] z-50">
      {/* --------------------- app logo --------------------- */}
      <NavLink
        to={"/"}
        onClick={() => scrollTo(0, 0)}
        className="flex items-center"
      >
        <img src={logo} alt="logo" className="w-10 sm:w-12" />
        <h1 className="text-xl font-bold text-gray-600/90">Health</h1>
      </NavLink>

      {/* --------------------- nav menu --------------------- */}
      <div className="hidden md:flex items-center gap-5 text-gray-600 text-sm font-medium">
        <NavLink to={"/"}>
          <p className="py-1 hover:text-black">HOME</p>
          <div className="h-0.5 bg-gray-600/50 w-[70%] m-auto rounded-full hidden" />
        </NavLink>

        <NavLink to={"/doctors"}>
          <p className="py-1 hover:text-black">ALL DOCTORS</p>
          <div className="h-0.5 bg-gray-600/50 w-[70%] m-auto rounded-full hidden" />
        </NavLink>

        <NavLink to={"/about"}>
          <p className="py-1 hover:text-black">ABOUT</p>
          <div className="h-0.5 bg-gray-600/50 w-[70%] mx-auto rounded-full hidden" />
        </NavLink>

        <NavLink to={"/contact"}>
          <p className="py-1 hover:text-black">CONTCAT</p>
          <div className="h-0.5 bg-gray-600/50 w-[70%] m-auto rounded-full hidden" />
        </NavLink>
      </div>

      {/* --------------------- profile or login btn --------------------- */}
      <div className="flex items-center justify-center gap-4">
        {token ? (
          <div
            className="flex items-center gap-2 cursor-pointer group relative"
            onClick={() => setUserMenu(!userMenu)}
          >
            {userData && (
              <img
                src={userData?.image}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover object-top"
              />
            )}
            <img src={dropdown_icon} alt="dropdown_icon" 
              className={`w-2.5 transform transition-transform duration-300 ease-in-out ${
                userMenu ? "rotate-180" : "rotate-0"
              }`}
            />

            {/* -------------- Drop down ---------------- */}
            <div
              className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-10 ${
                userMenu ? "block" : "hidden"
              }`}
            >
              <div className="min-w-48 bg-stone-100 flex flex-col gap-4 rounded p-4">
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("/my-profile")}
                >
                  My Profile
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("/my-appointments")}
                >
                  My Appointments
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={logoutHandler}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:flex border border-green-400 text-black px-8 py-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-200"
          >
            Login
          </button>
        )}

        {/* --------------------- hamburger --------------------- */}
        <img
          src={menu_icon}
          alt="menu_icon"
          className="md:hidden w-6 cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
      </div>

      {/* -------------------- modile menu -------------------- */}
      <div
        className={`${
          showMenu ? "flex" : "hidden"
        } fixed z-100 top-0 left-0 right-0 h-screen items-center flex-col gap-5 text-gray-600 text-sm font-medium bg-white`}
      >
        <div className="absolute top-4 right-0 cursor-pointer">
          <img
            src={cross_icon}
            alt="cross_icon"
            className="md:hidden w-6"
            onClick={() => setShowMenu(false)}
          />
        </div>

        <NavLink
          to={"/"}
          onClick={() => {
            scrollTo(0, 0);
            setShowMenu(false);
          }}
          className="absolute left-0 top-4 flex items-center"
        >
          <img src={logo} alt="logo" className="w-10 sm:w-12" />
          <h1 className="text-xl font-bold text-gray-600/90">Health</h1>
        </NavLink>

        {/* --------------- all nav links ----------------- */}
        <NavLink
          to={"/"}
          className="mt-20"
          onClick={() => {
            scrollTo(0, 0);
            setShowMenu(false);
          }}
        >
          <p className="py-1 hover:text-black">HOME</p>
          <div className="h-0.5 bg-gray-600/50 w-[70%] m-auto rounded-full hidden" />
        </NavLink>

        <NavLink
          to={"/doctors"}
          onClick={() => {
            scrollTo(0, 0);
            setShowMenu(false);
          }}
        >
          <p className="py-1 hover:text-black">ALL DOCTORS</p>
          <div className="h-0.5 bg-gray-600/50 w-[70%] m-auto rounded-full hidden" />
        </NavLink>

        <NavLink
          to={"/about"}
          onClick={() => {
            scrollTo(0, 0);
            setShowMenu(false);
          }}
        >
          <p className="py-1 hover:text-black">ABOUT</p>
          <div className="h-0.5 bg-gray-600/50 w-[70%] mx-auto rounded-full hidden" />
        </NavLink>

        <NavLink
          to={"/contact"}
          onClick={() => {
            scrollTo(0, 0);
            setShowMenu(false);
          }}
        >
          <p className="py-1 hover:text-black">CONTCAT</p>
          <div className="h-0.5 bg-gray-600/50 w-[70%] m-auto rounded-full hidden" />
        </NavLink>

        {!token && (
          <button
            onClick={() => {
              navigate("/login");
              setShowMenu(false);
            }}
            className="flex border border-green-400 text-black px-8 py-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-200"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
