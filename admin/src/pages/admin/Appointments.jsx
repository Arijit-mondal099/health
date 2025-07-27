import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelAppointment,
  getAllAppointments,
} from "../../features/admin/adminSlice.js";
import { cancel_icon } from "../../assets";
import { toast } from "react-toastify";
import ageConverter from "../../utils/ageConverter.js";
import dateConverter from "../../utils/dateConverter.js";

const Appointments = () => {
  const { appointments, loading } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  const handleCancel = async (appointmentId) => {
    try {
      await dispatch(cancelAppointment(appointmentId)).unwrap();
      toast.success("Appointment canceled");
    } catch (error) {
      toast.error("Faild to cancel appointment!");
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getAllAppointments());
  }, []);

  if (loading) {
    return (
      <div className="p-2 sm:p-4 md:px-8 w-full max-w-4xl mt-5 flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl sm:3xl md:4xl font-semibold text-gray-700">
          All Appointments
        </h1>
        
        <div className="w-full rounded-sm shadow-sm animate-pulse dark:border-gray-700">
          <div className="flex items-center justify-center h-8 bg-gray-300 rounded-sm dark:bg-gray-700" />
        </div>

        <div className="w-full rounded-sm shadow-sm animate-pulse dark:border-gray-700">
          <div className="flex items-center justify-center h-8  bg-gray-300 rounded-sm dark:bg-gray-700" />
        </div>

        <div className="w-full rounded-sm shadow-sm animate-pulse dark:border-gray-700">
          <div className="flex items-center justify-center h-8 bg-gray-300 rounded-sm dark:bg-gray-700" />
        </div>

        <div className="w-full rounded-sm shadow-sm animate-pulse dark:border-gray-700">
          <div className="flex items-center justify-center h-8 bg-gray-300 rounded-sm dark:bg-gray-700" />
        </div>

        <div className="w-full rounded-sm shadow-sm animate-pulse dark:border-gray-700">
          <div className="flex items-center justify-center h-8 bg-gray-300 rounded-sm dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full px-2 md:px-8 py-4 md:py-8 overflow-hidden">
      <h1 className="text-xl sm:text-2xl sm:3xl md:4xl font-semibold text-gray-700">
        All Appointments
      </h1>

      <div className="w-full max-w-4xl h-full max-h-[80vh] border border-gray-200 rounded-md shadow overflow-auto">
        <div className="w-full min-w-2xl sm:min-w-4xl grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-2.5 px-2 sm:px-4 border-b border-gray-200 text-lg font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fess</p>
          <p>Actions</p>
        </div>

        {appointments.map((appointment, i) => (
          <div
            key={appointment._id}
            className="w-full min-w-2xl sm:min-w-4xl grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col items-center py-2.5 px-2 sm:px-4 border-b border-gray-200 text-sm font-normal text-gray-600 hover:bg-green-100"
          >
            <p>{i + 1}</p>

            <p className="flex gap-1 items-center">
              <img
                src={appointment.user.image}
                alt="patient"
                className="w-8 h-8 object-cover object-top rounded-full border border-gray-200"
              />
              {appointment.user.name}
            </p>

            <p>{ageConverter(appointment.user.dob)}</p>

            <p>{`${dateConverter(appointment.slotDate)} ${
              appointment.slotTime
            }`}</p>

            <p className="flex gap-1 items-center">
              <img
                src={appointment.doctor.image}
                alt="patient"
                className="w-8 rounded-full border border-gray-200"
              />
              {appointment.doctor.name}
            </p>

            <p>₹{appointment.doctor.fees}</p>

            <p className="flex items-center justify-center">
              {/* Appointment cnacel */}
              {appointment.cancel && !appointment.isCompleted && !appointment.payment && (
                <span className="text-red-500">Canceled</span>
              )}
              {appointment.cancel && !appointment.isCompleted && appointment.payment && (
                <span className="text-red-500">Canceled</span>
              )}

              {/* Appointment complete */}
              {!appointment.cancel && appointment.isCompleted && (
                <span className="text-green-500">Completed</span>
              )}

              {/* Appointment paid but not complete or cancel yet */}
              {!appointment.cancel && !appointment.isCompleted && appointment.payment  && (
                <span className="text-green-500">Paid</span>
              )}

              {/* Appointment action button */}
              {!appointment.cancel && !appointment.payment && !appointment.isCompleted && (
                <img
                  src={cancel_icon}
                  alt="cancel_icon"
                  onClick={() => handleCancel(appointment._id)}
                  className="w-10 hover:scale-115 transition-all duration-200 cursor-pointer"
                />
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
