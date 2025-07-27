import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { adminLogin } from "../features/admin/adminSlice.js";
import { doctorLogin } from "../features/doctor/doctorSlice.js";
import { spinner } from "../assets";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [state, setState] = useState("admin");
  const [email, setEmail] = useState(state === "admin" ? "arijitm717@gmail.com" : "davis@gmail.com");

  // Update email when state changes between admin and doctor
  useEffect(() => {
    setEmail(state === "admin" ? "arijitm717@gmail.com" : "davis@gmail.com");
  }, [state]);
  
  const [password, setPassword] = useState("12345678");

  const { loading } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "admin") {
        await dispatch(adminLogin({ email, password })).unwrap();
        navigate("/admin-dashboard");
      } else {
        await dispatch(doctorLogin({ email, password })).unwrap();
        navigate("/doctor-dashboard");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Invalid credentials!");
      console.log(error?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-h-screen flex items-center justify-center p-2"
    >
      <div className="min w-full max-w-sm p-6 shadow-lg rounded-lg text-center border border-gray-100">
        <h1 className="text-3xl font-semibold text-gray-700">
          <span className="text-green-600 capitalize">{state}</span> Login
        </h1>

        <div className="mt-8 flex items-start flex-col gap-1">
          <p className="text-gray-500 text-sm">Email</p>
          <input
            type="email"
            placeholder="Enter email id"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full outline-none border border-gray-200 focus:border-gray-500 p-2 rounded-lg"
          />
        </div>

        <div className="mt-5 flex items-start flex-col gap-1">
          <p className="text-gray-500 text-sm">Password</p>
          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none border border-gray-200 focus:border-gray-500 p-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white mt-5 p-2 rounded-lg cursor-pointer hover:scale-102 transition-all duration-200"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <img src={spinner} alt="spinner" className="w-5 animate-spin" />
              <p>Loading..</p>
            </div>
          ) : (
            <p>Login</p>
          )}
        </button>

        {state === "admin" ? (
          <p className="text-sm font-medium text-gray-500 mt-5">
            Doctor Login?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => setState("doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm font-medium text-gray-500 mt-5">
            Admin Login?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => setState("admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
