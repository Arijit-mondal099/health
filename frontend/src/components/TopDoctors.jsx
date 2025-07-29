import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDoctors } from "../features/doctor/doctorSlice.js";

const TopDoctors = () => {
  const { doctors, loading } = useSelector((store) => store.doctor);
  const { token } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDoctorClick = (id) => {
    if (!token) navigate("/login");
    else navigate(`/appointment/${id}`);
    scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-medium text-gray-800 text-center">
        Top Doctors to Book
      </h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {!loading ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5">
          {doctors?.slice(0, 10).map((doctor) => (
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
                  <p className="text-xs font-medium text-[#0FBF00]">Available</p>
                </div>

                <h2 className="text-sm sm:text-xl leading-tight font-medium mt-2 capitalize">
                  {doctor.name}
                </h2>
                <p className="text-xs text-gray-600 font-medium mt-1 capitalize">
                  {doctor.speciality}
                </p>
              </div>
            </div>
          ))}
          </div>

          <button
            onClick={() => {
              navigate("/doctors");
              scrollTo(0, 0);
            }}
            className="bg-slate-100 px-8 py-2 text-gray-800 rounded-full cursor-pointer hover:bg-slate-200 transition-all duration-200 my-10"
          >
            see more
          </button>
        </>
      ) : (
        // Skeleton loader
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5 animate-pulse w-full">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="bg-green-100/50 border border-green-200 rounded-md p-4"
            >
              <div className="w-full h-40 bg-green-200 rounded-md mb-4" />

              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-[#0FBF00] animate-ping" />
                <div className="h-3 w-16 bg-green-200 rounded" />
              </div>

              <div className="h-4 w-3/4 bg-green-200 rounded mb-2" />
              <div className="h-3 w-1/2 bg-green-200 rounded" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopDoctors;
