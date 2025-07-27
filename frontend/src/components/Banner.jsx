import { useNavigate } from "react-router-dom";
import { arrow_icon, appointment_img } from "../assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-gradient-to-r from-green-200 via-green-400 to-green-900 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-10 lg:my-20">
      {/* left side content */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-2xl md:text-3xl lg:text-5xl font-semibold text-shadow-md text-white mb-8 text-center lg:text-left">
          <h2>Book Appointment</h2>
          <h2 className="mt-4">With 100+ Trusted Doctors</h2>
        </div>

        <button
          className="flex items-center gap-4 bg-white text-[#595959] font-medium px-8 py-4 rounded-full cursor-pointer hover:bg-gray-100 transition-all duration-200 mx-auto lg:mx-0"
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
        >
          Create account
          <img src={arrow_icon} alt="arrow_icon" className="w-3" />
        </button>
      </div>

      {/* right side content */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={appointment_img}
          alt="appointment_img"
          className="absolute bottom-0 right-0 max-w-md"
        />
      </div>
    </div>
  );
};

export default Banner;
