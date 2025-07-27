import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDoctors,
  toggleAvailblity,
} from "../../features/admin/adminSlice.js";
import { toast } from "react-toastify";

const DoctorsList = () => {
  const { doctors, loading } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);

  // loading effect
  if (loading) {
    return (
      <div className="p-2 sm:p-4 md:px-8 w-full max-w-5xl grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="max-w-sm p-4 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        </div>

        <div className="max-w-sm p-4 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        </div>

        <div className="max-w-sm p-4 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        </div>

        <div className="max-w-sm p-4 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        </div>

        <div className="max-w-sm p-4 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full px-2 md:px-8 py-4 md:py-8">
      <h1 className="text-2xl sm:3xl md:4xl font-semibold text-gray-700">
        All Doctors
      </h1>

      <div className="w-full max-w-4xl h-full max-h-[80vh] grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-scroll">
        {doctors.length ? (
          doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-green-100/50 border border-green-200 rounded-md p-4"
            >
              <img
                src={doctor.image}
                alt="doctor"
                className="rounded-md border-b border-green-200"
              />

              <div className="mt-2">
                <h2 className="text-sm sm:text-base leading-tight text-gray-700 font-medium">
                  {doctor.name}
                </h2>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  {doctor.speciality}
                </p>

                <div className="flex items-center gap-1 mt-2">
                  <label
                    htmlFor={doctor._id}
                    className="text-xs text-gray-600 font-medium"
                  >
                    Toggle available:
                  </label>
                  <input
                    type="checkbox"
                    id={doctor._id}
                    className="mt-0.5 cursor-pointer"
                    checked={doctor.available}
                    onChange={async () => {
                      try {
                        await dispatch(toggleAvailblity(doctor._id)).unwrap();
                        toast.success("Doctor availability changed");
                      } catch (error) {
                        toast.error(
                          error?.message ||
                            "Failed to change doctor availability"
                        );
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="w-full text-gray-500 font-bold text-sm sm:text-xl">
            Doctors haven't been created yet!
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
