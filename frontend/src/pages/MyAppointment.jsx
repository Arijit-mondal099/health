import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelAppointment, userAppointments } from "../features/user/userSlice.js";
import { toast } from "react-toastify";
import axios from "axios";

const MyAppointment = () => {
  const { appointments, loading, token } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const initPayment = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,

      // razorpay payment validation handler
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/valid-payment`,
            response,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data?.success) toast.success("Payment successfully done");
          else toast.error("Faild to payment! Please try again.");
          dispatch(userAppointments());
        } catch (error) {
          console.log(error);
          toast.error("Faild to payment! Please try again.");
        }
      },
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  const onlinePaymentHandler = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/online-payment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data?.success) initPayment(data.response);
      else toast.error("Faild to payment! Please try again.");
    } catch (error) {
      console.log(error);
      toast.error("Faild to payment! Please try again.");
    }
  };

  const handleAppointments = async () => {
    try {
      dispatch(userAppointments());
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await dispatch(cancelAppointment(id)).unwrap();
      toast.success("Appointment has canceled successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const dateConverter = (d) => {
    const date = d.split("-");
    return `${date[0]} ${months[date[1]]} ${date[2]}`;
  };

  useEffect(() => {
    handleAppointments();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-2.5 text-sm mt-25">
        <div className="w-full h-auto rounded-md animate-pulse dark:border-gray-700">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
        </div>

        <div className="w-full h-auto rounded-md animate-pulse dark:border-gray-700">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
        </div>

        <div className="w-full h-auto rounded-md animate-pulse dark:border-gray-700">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
        </div>

        <div className="w-full h-auto rounded-md animate-pulse dark:border-gray-700">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-6 mt-25">
      <h1 className="text-2xl text-gray-700 font-medium">My Appointment</h1>

      <div className="flex flex-col w-full border-t border-gray-400">
        {appointments.length ? (
          appointments?.map((appointment) => (
            <div
              key={appointment._id}
              className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-gray-400 py-4"
            >
              <div className="flex gap-2 sm:gap-4">
                <img
                  src={appointment.doctor.image}
                  alt="doctor image"
                  className="w-36 sm:w-40 bg-green-100/50 rounded-md"
                />

                <div className="flex flex-col items-start justify-center text-xs sm:text-sm text-gray-600">
                  <p className="text-lg font-medium text-gray-700">
                    {appointment.doctor.name}
                  </p>
                  <p>{appointment.doctor.speciality}</p>
                  <p className="text-gray-800 mt-2 font-medium">Address:</p>
                  <p>{appointment.doctor.address}</p>
                  <p className="mt-2 text-gray-800 font-medium">
                    Date & time:{" "}
                    <span className="text-gray-600 font-normal">
                      {dateConverter(appointment.slotDate)}
                      {" - "}
                      {appointment.slotTime}
                    </span>
                  </p>
                </div>
              </div>

              {!appointment.cancel && !appointment.isCompleted && (
                <div className="flex flex-col gap-2 sm:gap-4 text-xs sm:text-sm">
                  <button
                    onClick={() => onlinePaymentHandler(appointment._id)}
                    disabled={appointment.payment}
                    className={`w-50 bg-green-500 px-4 py-2 rounded-md text-white border ${
                      !appointment.payment && "hover:bg-white hover:text-black cursor-pointer"
                    } transition-all duration-200 disabled:opacity-55`}
                  >
                    {appointment.payment ? "Paid" : "Pay here"}
                  </button>

                  {!appointment.payment && (
                    <button
                      onClick={() => handleCancel(appointment._id)}
                      className="w-50 bg-white px-4 py-2 rounded-md text-black border hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      Cancel appointment
                    </button>
                  )}
                </div>
              )}

              {appointment.cancel && (
                <p className="text-sm sm:text-lg text-red-500 font-medium">
                  Appointment has been canceled!
                </p>
              )}
              {appointment.isCompleted && (
                <p className="text-sm sm:text-lg text-green-500 font-medium">
                  Completed!
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-lg sm:text-2xl text-gray-500 font-semibold mt-4">
            Appointments haven't created yet!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyAppointment;
