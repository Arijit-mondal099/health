import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../features/doctor/doctorSlice.js";
import { downArrow, upperArrow } from "../assets/index.js";

const Doctors = () => {
  const [filterDoctor, setfilterDoctor] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { doctors } = useSelector((store) => store.doctor);
  const { token } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const { speciality } = useParams();
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setfilterDoctor(
        doctors.filter((doc) => doc.speciality === speciality.toLowerCase())
      );
    } else {
      setfilterDoctor(doctors);
    }
  };

  const handleDoctorClick = (id) => {
    if (!token) navigate("/login");
    else navigate(`/appointment/${id}`);
    scrollTo(0, 0);
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors]);

  useEffect(() => {
    dispatch(getAllDoctors());
    applyFilter();
  }, []);

  return (
    <div className="flex flex-col justify-center gap-2 sm:gap-5 mt-20 sm:mt-25 mb-10">
      <h2 className="text-sm sm:text-lg text-gray-600 font-[400]">
        Browse through the doctors specialist.
      </h2>

      <div className="flex flex-col sm:flex-row items-start gap-5">
        {/* ----------------------- filter doctor by speciality section -------------------- */}
        <button
          className="sm:hidden w-full p-2 bg-green-100/50 border border-green-200 rounded-md cursor-pointer text-xs text-gray-600 font-medium flex items-center justify-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          Filter
          <img src={isOpen ? upperArrow : downArrow} alt="arrow" />
        </button>

        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } sm:flex flex-col gap-1 sm:gap-4 text-sm text-gray-600`}
        >
          <div
            onClick={() =>
              speciality === "general physician"
                ? navigate("/doctors")
                : navigate("/doctors/general physician")
            }
            className={`w-[92vw] sm:w-[12rem] lg:w-[14rem] p-2 bg-green-100/50 border border-green-200 rounded-md cursor-pointer ${
              speciality === "general physician" && "bg-green-200"
            }`}
          >
            General physician
          </div>
          <div
            onClick={() =>
              speciality === "gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/gynecologist")
            }
            className={`w-[92vw] sm:w-[12rem] lg:w-[14rem] p-2 bg-green-100/50 border border-green-200 rounded-md cursor-pointer ${
              speciality === "gynecologist" && "bg-green-200"
            }`}
          >
            Gynecologist
          </div>
          <div
            onClick={() =>
              speciality === "dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/dermatologist")
            }
            className={`w-[92vw] sm:w-[12rem] lg:w-[14rem] p-2 bg-green-100/50 border border-green-200 rounded-md cursor-pointer ${
              speciality === "dermatologist" && "bg-green-200"
            }`}
          >
            Dermatologist
          </div>
          <div
            onClick={() =>
              speciality === "pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/pediatricians")
            }
            className={`w-[92vw] sm:w-[12rem] lg:w-[14rem] p-2 bg-green-100/50 border border-green-200 rounded-md cursor-pointer ${
              speciality === "pediatricians" && "bg-green-200"
            }`}
          >
            Pediatricians
          </div>
          <div
            onClick={() =>
              speciality === "neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/neurologist")
            }
            className={`w-[92vw] sm:w-[12rem] lg:w-[14rem] p-2 bg-green-100/50 border border-green-200 rounded-md cursor-pointer ${
              speciality === "neurologist" && "bg-green-200"
            }`}
          >
            Neurologist
          </div>
          <div
            onClick={() =>
              speciality === "gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/gastroenterologist")
            }
            className={`w-[92vw] sm:w-[12rem] lg:w-[14rem] p-2 bg-green-100/50 border border-green-200 rounded-md cursor-pointer ${
              speciality === "gastroenterologist" && "bg-green-200"
            }`}
          >
            Gastroenterologist
          </div>
        </div>

        {/* -------------------------- filtered doctors card section ----------------------- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5">
          {filterDoctor.length ? (
            filterDoctor.map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => handleDoctorClick(doctor._id)}
                className="bg-green-100/50 border border-green-200 rounded-md p-4 cursor-pointer"
              >
                <img
                  src={doctor.image}
                  alt="doctor.image"
                  className="border-b border-green-200"
                />

                <div className="flex flex-col items-start justify-center mt-2">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-1.5 w-1.5 animate-ping rounded-full bg-[#0FBF00]" />
                    <p className="text-xs font-medium text-[#0FBF00]">
                      Available
                    </p>
                  </div>

                  <h2 className="text-sm sm:text-xl leading-tight font-medium mt-2 capitalize">
                    {doctor.name}
                  </h2>
                  <p className="text-xs text-gray-600 font-medium mt-1 capitalize">
                    {doctor.speciality}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="min-w-md mx-auto text4xl text-gray-400 font-medium">
              Doctors are not available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
