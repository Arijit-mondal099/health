import { Link } from "react-router-dom";
import { specialityData } from "../assets";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center justify-center gap-4 py-16"
    >
      <h1 className="text-3xl font-medium text-gray-800">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free
      </p>

      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((data, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            to={`/doctors/${data.speciality}`}
            key={index}
            className="flex flex-col items-center cursor-pointer flex-shrink-0"
          >
            <img src={data.image} alt="image" className="w-16 sm:w-24 mb-2" />
            <p className="text-gray-500 text-xs font-medium">
              {data.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
