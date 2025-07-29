/**
 * Node modules
 */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

/**
 * Components, assets & api
 */
import { verified_icon, info_icon, spinner } from "../assets";
import RelatedDoctors from "../components/RelatedDoctors.jsx";
import { getAllDoctors } from "../features/doctor/doctorSlice.js";
import { appointmentBook } from "../features/user/userSlice.js";

const Appointment = () => {
  /**
   * React featues
   */
  const [doctor, setDoctor] = useState(null);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("10:00 AM");

  /**
   * React-router-dom featuser
   */
  const { doctorId } = useParams();
  const navigate = useNavigate();

  /**
   * Redux fetures
   */
  const { doctors } = useSelector((store) => store.doctor);
  const { token, loading, error } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getAvailableSlots = () => {
    setDoctorSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      // Loop through the next 7 days
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(); // setting end time in current day at 9:00 PM
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        // we are on the current date
        // If current time is before 10:00 AM, set to 10:00 AM
        if (currentDate.getHours() < 10) {
          currentDate.setHours(10, 0, 0, 0);
        } else {
          currentDate.setHours(currentDate.getHours() + 1); // round up to next half hour
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        }
      } else {
        currentDate.setHours(10, 0, 0, 0); // setting to 10:00 AM
      }

      const slots = [];

      while (currentDate < endTime) {
        const formatedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const date = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const slotDate = `${date}-${month}-${year}`;
        const slotTime = formatedTime;

        const isSlotAvailable =
          doctor?.slotsBooked[slotDate] &&
          doctor?.slotsBooked[slotDate]?.includes(slotTime);

        if (!isSlotAvailable) {
          slots.push({ dateTime: new Date(currentDate), time: formatedTime });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30); // incrementing every slot by 30 minutes
      }

      setDoctorSlots((prevSlots) => [...prevSlots, slots]);
    }
  };

  const getDoctor = () => {
    const foundDoctor = doctors.find((doc) => doc._id === doctorId);
    setDoctor(foundDoctor);
  };

  const appointmentBookHandler = async () => {
    try {
      if (!token) {
        toast.warn("Please login!");
        navigate("/login");
      }

      const date = doctorSlots[slotIndex][0].dateTime.getDate();
      const month = doctorSlots[slotIndex][0].dateTime.getMonth();
      const year = doctorSlots[slotIndex][0].dateTime.getFullYear();
      const slotDate = `${date}-${month}-${year}`;

      await dispatch(
        appointmentBook({ doctorId, slotDate, slotTime })
      ).unwrap();
      toast.success("Appointment booked successfully");
      navigate("/my-appointments");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    getDoctor();
  }, [doctorId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [doctor]);

  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);

  return (
    doctor && (
      <div className="mt-25">
        {/* ---------------------- doctor details section ---------------------- */}
        <div className="flex flex-col md:flex-row gap-4 mt-5">
          {/* doctor image */}
          <div className="bg-green-100 w-full sm:max-w-72 rounded-lg border border-green-300">
            <img src={doctor.image} alt="doctor image" />
          </div>

          {/* doctor nane, degree, about and etc. */}
          <div className="flex-1 rounded-lg border border-green-300 p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-800 capitalize">
              {doctor.name}
              <img src={verified_icon} alt="verified_icon" className="w-5" />
            </h1>

            <p className="text-sm text-gray-600 mt-1">
              <span className="uppercase">{doctor.degree}</span> -{" "}
              <span className="capitalize">{doctor.speciality}</span>{" "}
              <span className="text-xs border border-gray-600 px-2 py-0.5 ml-2 rounded-full">
                {doctor.experience}
              </span>
            </p>

            <div className="flex flex-col items-start justify-center mt-4">
              <p className="flex items-center gap-1 text-sm font-medium text-gray-800">
                About
                <img src={info_icon} alt="info_icon" className="w-4" />
              </p>

              <p className="text-gray-500 text-sm mt-2 max-w-[700px]">
                {doctor.about}
              </p>
            </div>

            <p className="text-lg text-gray-600 mt-4">
              Appointment fee:{" "}
              <span className="font-bold text-gray-800">₹{doctor.fees}</span>
            </p>
          </div>
        </div>

        {/* ------------------------ doctor slots section ------------------------ */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>

          <div className="flex items-center gap-4 w-full overflow-x-scroll mt-4">
            {doctorSlots.length &&
              doctorSlots.map(
                (slot, index) =>
                  slot[0] && (
                    <div
                      key={index}
                      className={`border border-green-300 w-12 h-20 rounded-full flex flex-col items-center justify-center cursor-pointer text-sm text-gray-700 font-medium ${
                        slotIndex === index
                          ? "bg-green-500 text-white"
                          : "bg-green-100/50"
                      }`}
                      onClick={() => setSlotIndex(index)}
                    >
                      <p className="uppercase">
                        {days[slot[0].dateTime.getDay()]}
                      </p>
                      <p>{slot[0].dateTime.getDate()}</p>
                    </div>
                  )
              )}
          </div>

          <div className="mt-4 flex items-center gap-4 overflow-x-scroll text-gray-500 text-sm">
            {doctorSlots.length &&
              doctorSlots[slotIndex].map((item, index) => (
                <div
                  key={index}
                  className={`min-w-25 py-2 px-2 lowercase text-center border border-green-300 rounded-full cursor-pointer ${
                    slotTime === item.time
                      ? "bg-green-500 text-white"
                      : "bg-green-100/50"
                  }`}
                  onClick={() => setSlotTime(item.time)}
                >
                  {item.time}
                </div>
              ))}
          </div>

          <button
            onClick={appointmentBookHandler}
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-green-600 transition-colors duration-300"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <img src={spinner} alt="spinner" className="w-5 animate-spin" />
                <p>Booking..</p>
              </div>
            ) : (
              <p>Book an appointment</p>
            )}
          </button>
        </div>

        {/* ---------------------- related doctors section ---------------------- */}
        <RelatedDoctors doctorId={doctorId} speciality={doctor.speciality} />
      </div>
    )
  );
};

export default Appointment;
