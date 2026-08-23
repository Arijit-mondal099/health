import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { BadgeCheck, Info, Loader2 } from "lucide-react";
import { cn } from "@health/ui";

import RelatedDoctors from "../components/RelatedDoctors.jsx";
import { getAllDoctors } from "../features/doctor/doctorSlice.js";
import { appointmentBook } from "../features/user/userSlice.js";
import { Badge, Button, Card, Separator } from "@health/ui";

const Appointment = () => {
    const [doctor, setDoctor] = useState(null);
    const [doctorSlots, setDoctorSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState("10:00 AM");

    const { doctorId } = useParams();
    const navigate = useNavigate();

    const { doctors } = useSelector((store) => store.doctor);
    const { token, loading, error } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getAvailableSlots = () => {
        setDoctorSlots([]);
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            const endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                if (currentDate.getHours() < 10) {
                    currentDate.setHours(10, 0, 0, 0);
                } else {
                    currentDate.setHours(currentDate.getHours() + 1);
                    currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
                }
            } else {
                currentDate.setHours(10, 0, 0, 0);
            }

            const slots = [];

            let loopDate = new Date(currentDate);
            while (loopDate < endTime) {
                const formatedTime = loopDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                const date = loopDate.getDate();
                const month = loopDate.getMonth();
                const year = loopDate.getFullYear();

                const slotDate = `${date}-${month}-${year}`;
                const slotTimeValue = formatedTime;

                const isSlotAvailable =
                    doctor?.slotsBooked[slotDate] &&
                    doctor?.slotsBooked[slotDate]?.includes(slotTimeValue);

                if (!isSlotAvailable) {
                    slots.push({ dateTime: new Date(loopDate), time: formatedTime });
                }

                loopDate = new Date(loopDate.getTime() + 30 * 60000);
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
                toast.warning("Please login!");
                navigate("/login");
                return;
            }

            const date = doctorSlots[slotIndex][0].dateTime.getDate();
            const month = doctorSlots[slotIndex][0].dateTime.getMonth();
            const year = doctorSlots[slotIndex][0].dateTime.getFullYear();
            const slotDate = `${date}-${month}-${year}`;

            await dispatch(appointmentBook({ doctorId, slotDate, slotTime })).unwrap();
            toast.success("Appointment booked successfully");
            navigate("/my-appointments");
        } catch {
            toast.error(error?.message || "Failed to book appointment!");
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

    if (!doctor) return null;

    return (
        <div className="py-8">
            <Card className="overflow-hidden border-border p-0">
                <div className="grid gap-0 md:grid-cols-[280px_1fr]">
                    <div className="flex items-center justify-center bg-primary/5 p-6">
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full max-w-[240px] rounded-xl object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-4 p-6 md:p-8">
                        <div className="flex items-center gap-2">
                            <h1 className="font-display text-2xl font-medium capitalize tracking-tight text-foreground sm:text-3xl">
                                {doctor.name}
                            </h1>
                            <BadgeCheck className="size-5 text-primary" />
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <span className="uppercase">{doctor.degree}</span>
                            <span className="text-border">-</span>
                            <span className="capitalize">{doctor.speciality}</span>
                            <Badge
                                variant="outline"
                                className="ml-1 font-mono text-[11px] uppercase tracking-wider"
                            >
                                {doctor.experience}
                            </Badge>
                        </div>

                        <div>
                            <p className="file-label mb-2 flex items-center gap-1.5 text-foreground">
                                About
                                <Info className="size-3.5 text-muted-foreground" />
                            </p>
                            <p className="max-w-2xl text-sm text-muted-foreground">
                                {doctor.about}
                            </p>
                        </div>

                        <div className="flex max-w-xs items-baseline gap-2 text-sm">
                            <span className="text-muted-foreground">Consultation fee</span>
                            <span className="dot-leader" />
                            <span className="font-mono text-base font-semibold text-foreground">
                                ₹{doctor.fees}
                            </span>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="mt-8">
                <div className="mb-4 flex items-center gap-3">
                    <h2 className="file-label text-muted-foreground">Booking slots</h2>
                    <span className="h-px flex-1 bg-border" />
                </div>

                <div className="scrollbar-x flex gap-3 overflow-x-auto pb-2">
                    {doctorSlots.map(
                        (slot, index) =>
                            slot[0] && (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setSlotIndex(index)}
                                    className={cn(
                                        "flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                        slotIndex === index
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border bg-background text-foreground hover:border-primary/40",
                                    )}
                                >
                                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">
                                        {days[slot[0].dateTime.getDay()]}
                                    </span>
                                    <span className="text-lg font-semibold">
                                        {slot[0].dateTime.getDate()}
                                    </span>
                                </button>
                            ),
                    )}
                </div>

                <div className="scrollbar-x mt-4 flex gap-3 overflow-x-auto pb-2">
                    {doctorSlots[slotIndex]?.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setSlotTime(item.time)}
                            className={cn(
                                "min-w-24 shrink-0 rounded-sm border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                slotTime === item.time
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-background text-muted-foreground hover:border-primary/40",
                            )}
                        >
                            {item.time}
                        </button>
                    ))}
                </div>

                <Button
                    size="lg"
                    className="mt-6"
                    onClick={appointmentBookHandler}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            Booking...
                        </>
                    ) : (
                        "Book an appointment"
                    )}
                </Button>
            </div>

            <Separator className="my-10" />

            <RelatedDoctors doctorId={doctorId} speciality={doctor.speciality} />
        </div>
    );
};

export default Appointment;