import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userSignup } from "../features/user/userSlice";
import { spinner } from "../assets";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("arijitm717@gmail.com");
  const [password, setPassword] = useState("12345678");
  const { token, loading } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        await dispatch(userLogin({ email, password })).unwrap();
        toast.success("Login successfully");
        navigate("/");
      } else {
        await dispatch(userSignup({ name, email, password })).unwrap();
        toast.success("Register successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid credentials!");
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="flex items-center justify-center w-full min-h-[70vh]">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-sm flex flex-col items-start justify-center p-8 rounded-lg shadow-md shadow-green-200 border border-green-200 mt-25"
      >
        <h1 className="text-2xl text-green-700 font-semibold">
          {state === "Create Account" ? state : "Login"}
        </h1>
        <p className="text-gray-500 mb-8">
          {state === "Create Account"
            ? "Please sign up to book appointment"
            : "Please login to book appointment"}
        </p>

        {state === "Create Account" && (
          <div className="flex flex-col gap-1 w-full mb-4">
            <label className="text-gray-500" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="focus:border-green-800 outline-none p-2 text-gray-800 rounded-md border border-green-400"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="flex flex-col gap-1 w-full mb-4">
          <label className="text-gray-500" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="focus:border-green-800 outline-none p-2 text-gray-800 rounded-md border border-green-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1 w-full mb-4">
          <label className="text-gray-500" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="focus:border-green-800 outline-none p-2 text-gray-800 rounded-md border border-green-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="px-4 py-2 w-full rounded-md bg-green-500 hover:bg-green-700 transition-all text-white duration-200 cursor-pointer mb-4"
          type="submit"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <img src={spinner} alt="spinner" className="w-5 animate-spin" />
              <p className="text-white">Loading..</p>
            </div>
          ) : state === "Create Account" ? (
            "Create Account"
          ) : (
            "Login"
          )}
        </button>

        {state === "Create Account" ? (
          <p className="text-gray-500" onClick={() => setState("Login")}>
            Already have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Login here
            </span>
          </p>
        ) : (
          <p
            className="text-gray-500"
            onClick={() => setState("Create Account")}
          >
            Don't have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Create here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
