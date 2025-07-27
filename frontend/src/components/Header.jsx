import { group_profiles, arrow_icon, header_img } from "../assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap px-6 md:px-10 lg:px-20 mt-25 bg-gradient-to-r from-green-200 via-green-400 to-green-900 rounded-lg">
      {/* left side ----------------------------------- */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center gap-4 text-center md:text-left py-10 md:py-[10vw] md:mb-[-30px] m-auto">
        <h1 className="text-3xl lg:text-5xl text-white font-semibold leading-tight text-shadow-lg">
          Book Appointment <br />
          With Trusted Doctors
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-2 max-w-xl text-sm">
          <img
            src={group_profiles}
            alt="group_profiles"
            className="w-28"
          />
          <p className="text-white">
            Simply browse through our extensive list of trusted doctors, <br />
            schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-4 bg-white text-[#595959] font-medium px-8 py-4 rounded-full cursor-pointer hover:bg-gray-100 transition-all duration-200"
        >
          Book appointment
          <img src={arrow_icon} alt="arrow_icon" className="w-3" />
        </a>
      </div>

      {/* right side ---------------------------------- */}
      <div className="md:w-1/2 relative">
        <img
          src={header_img}
          alt="header_img"
          className="w-full h-auto md:absolute bottom-0 rounded-lg"
        />
      </div>
    </div>
  );
};

export default Header;
