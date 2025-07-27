import { Link, NavLink } from "react-router-dom";
import { logo } from "../assets";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-25">
      {/* top side content */}
      <div className="flex flex-col md:flex-row justify-between gap-6 py-6 md:py-10 border-b border-gray-400">
        {/* section one */}
        <div className="w-full md:w-1/2">
          <NavLink to={"/"} className="flex items-center">
            <img src={logo} alt="logo" className="w-10 sm:w-12" />
            <h1 className="text-xl font-bold text-gray-600/90">Health</h1>
          </NavLink>

          <p className="mt-4 text-gray-600 text-sm font-[400]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* section two */}
        <div>
          <h2 className="text-lg font-medium text-gray-800">COMPANY</h2>

          <ul className="mt-4 text-gray-600 text-sm font-[500] flex flex-col gap-2">
            <li>
              <Link
                to={"/"}
                onClick={() => scrollTo(0, 0)}
                className="hover:underline"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to={"/about"}
                onClick={() => scrollTo(0, 0)}
                className="hover:underline"
              >
                About us
              </Link>
            </li>

            <li>
              <Link
                to={"/contact"}
                onClick={() => scrollTo(0, 0)}
                className="hover:underline"
              >
                Contact us
              </Link>
            </li>

            <li>
              <Link
                to={"/about"}
                onClick={() => scrollTo(0, 0)}
                className="hover:underline"
              >
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        {/* section three */}
        <div>
          <h2 className="text-lg font-medium text-gray-800">GET IN TOUCH</h2>

          <div className="mt-4 text-gray-600 text-sm font-[500] flex flex-col gap-2">
            <p>+1-212-456-7890</p>
            <p>arijitm717@gmail.com</p>
          </div>
        </div>
      </div>

      {/* botton side content */}
      <div className="text-center py-5 text-sm font-medium text-gray-600">
        Copyright © 2024 Arijit Mondal - All Right Reserved.
      </div>
    </div>
  );
};

export default Footer;
