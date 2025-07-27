import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelAppointment,
  completeAppointment,
  doctorAppointments,
} from "../../features/doctor/doctorSlice.js";
import ageConverter from "../../utils/ageConverter.js";
import dateConverter from "../../utils/dateConverter.js";
import { cancel_icon, tick_icon } from "../../assets";
import { toast } from "react-toastify";

const DoctorAppointments = () => {
  const { appointments } = useSelector((store) => store.doctor);
  const dispatch = useDispatch();

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await dispatch(cancelAppointment(appointmentId)).unwrap();
      toast.success("Appointment canceled");
    } catch (error) {
      toast.error("Faild to cancel appointment!");
    }
  };

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      await dispatch(completeAppointment(appointmentId)).unwrap();
      toast.success("Appointment completed");
    } catch (error) {
      toast.error("Faild to complete appointment!");
    }
  };

  useEffect(() => {
    dispatch(doctorAppointments());
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full px-2 md:px-8 py-4 md:py-8 overflow-hidden">
      <h1 className="text-xl sm:text-2xl sm:3xl md:4xl font-semibold text-gray-700">
        Appointments
      </h1>

      <div className="w-full max-w-4xl h-full max-h-[80vh] border border-gray-200 rounded-md shadow overflow-auto">
        <div className="w-full min-w-2xl sm:min-w-4xl grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1.5fr_2fr] grid-flow-col py-2.5 px-2 sm:px-4 border-b border-gray-200 text-lg font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fess</p>
          <p>Payment</p>
          <p>Actions</p>
        </div>

        {appointments.map((appointment, i) => (
          <div
            key={appointment._id}
            className="w-full min-w-2xl sm:min-w-4xl grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1.5fr_2fr] grid-flow-col items-center py-2.5 px-2 sm:px-4 border-b border-gray-200 text-sm font-normal text-gray-600 hover:bg-green-100"
          >
            <p>{i + 1}</p>

            <div className="flex gap-1.5 items-center">
              <img
                src={appointment.user.image}
                alt="patient"
                className="w-10 h-10 object-cover object-top rounded-full border border-gray-200"
              />
              <div className="flex flex-col">
                <p>{appointment.user.name}</p>
                <p>{appointment.user.phone}</p>
              </div>
            </div>

            <p>{ageConverter(appointment.user.dob)}</p>

            <p>{`${dateConverter(appointment.slotDate)} ${
              appointment.slotTime
            }`}</p>

            <p>₹{appointment.doctor.fees}</p>

            <p>
              {appointment.payment ? <span>Online</span> : <span>Cash</span>}
            </p>

            <div className="flex items-center">
              {appointment.cancel ? (
                <p className="text-sm font-medium text-red-500">Canceled</p>
              ) : appointment.isCompleted ? (
                <p className="text-sm font-medium text-green-500">Completed</p>
              ) : (
                <>
                  <img
                    src={cancel_icon}
                    onClick={() => handleCancelAppointment(appointment._id)}
                    alt="cancel_icon"
                    className="cursor-pointer"
                  />
                  <img
                    src={tick_icon}
                    onClick={() => handleCompleteAppointment(appointment._id)}
                    alt="tick_icon"
                    className="cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
