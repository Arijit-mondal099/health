import { useEffect } from "react";
import {
  earning_icon,
  appointments_icon,
  patients_icon,
  cancel_icon,
  tick_icon,
} from "../../assets";
import { useSelector, useDispatch } from "react-redux";
import { getDoctorDashboard } from "../../features/doctor/doctorSlice.js";

const DoctorDashboard = () => {
  const { dashboard } = useSelector((store) => store.doctor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctorDashboard());
  }, []);

  return dashboard && (
    <div className="flex flex-col gap-4 w-full px-2 md:px-8 py-4 md:py-8 overflow-hidden">
      <h1 className="text-xl sm:text-2xl sm:3xl md:4xl font-semibold text-gray-700">
        Doctor Dashboard
      </h1>

      <div className="w-full max-w-4xl h-full max-h-[80vh] overflow-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="w-full shadow border border-gray-200 rounded-md px-4 py-8 flex items-center gap-4">
            <img
              src={earning_icon}
              alt="earning_icon"
              className="w-16 md:w-20"
            />
            <p className="flex flex-col gap-1">
              <span className="text-lg sm:text-xl md:text-2xl font-semibold test-gray-700">
                {`₹${dashboard.earnings}`}
              </span>
              <span className="text-sm sm:text-base font-medium text-green-500">
                Earnings
              </span>
            </p>
          </div>

          <div className="w-full shadow border border-gray-200 rounded-md px-4 py-8 flex items-center gap-4">
            <img
              src={appointments_icon}
              alt="appointment_icon"
              className="w-16 md:w-20"
            />
            <p className="flex flex-col gap-1">
              <span className="text-lg sm:text-xl md:text-2xl font-semibold test-gray-700">
                {dashboard.appointments}
              </span>
              <span className="text-sm sm:text-base font-medium text-green-500">
                Appointments
              </span>
            </p>
          </div>

          <div className="w-full shadow border border-gray-200 rounded-md px-4 py-8 flex items-center gap-4">
            <img
              src={patients_icon}
              alt="patients_icon"
              className="w-16 md:w-20"
            />
            <p className="flex flex-col gap-1">
              <span className="text-lg sm:text-xl md:text-2xl font-semibold test-gray-700">
                {dashboard?.patients?.length}
              </span>
              <span className="text-sm sm:text-base font-medium text-green-500">
                Patients
              </span>
            </p>
          </div>

          <div className="w-full shadow border border-gray-200 rounded-md px-4 py-8 flex items-center gap-4">
            <img src={tick_icon} alt="tick_icon" className="w-16 md:w-20" />
            <p className="flex flex-col gap-1">
              <span className="text-lg sm:text-xl md:text-2xl font-semibold test-gray-700">
                {dashboard.complete}
              </span>
              <span className="text-sm sm:text-base font-medium text-green-500">
                Complete
              </span>
            </p>
          </div>

          <div className="w-full shadow border border-gray-200 rounded-md px-4 py-8 flex items-center gap-4">
            <img src={cancel_icon} alt="cancel_icon" className="w-16 md:w-20" />
            <p className="flex flex-col gap-1">
              <span className="text-lg sm:text-xl md:text-2xl font-semibold test-gray-700">
                {dashboard.cancel}
              </span>
              <span className="text-sm sm:text-base font-medium text-green-500">
                Cancel
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
