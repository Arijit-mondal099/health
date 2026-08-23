import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelAppointment, userAppointments } from "../features/user/userSlice.js";
import { toast } from "sonner";
import axios from "axios";
import { CalendarDays, CheckCircle2, CreditCard, MapPin } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Skeleton,
} from "@health/ui";
import { formatSlotDate } from "@health/core";

const MyAppointment = () => {
    const { appointments, loading, token } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const initPayment = async (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Appointment Payment",
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/valid-payment`,
                        response,
                        { headers: { Authorization: `Bearer ${token}` } },
                    );
                    if (data?.success) toast.success("Payment successfully done");
                    else toast.error("Failed to payment! Please try again.");
                    dispatch(userAppointments());
                } catch {
                    toast.error("Failed to payment! Please try again.");
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
                { headers: { Authorization: `Bearer ${token}` } },
            );
            if (data?.success) initPayment(data.response);
            else toast.error("Failed to payment! Please try again.");
        } catch {
            toast.error("Failed to payment! Please try again.");
        }
    };

    const handleAppointments = () => dispatch(userAppointments());

    const handleCancel = async (id) => {
        try {
            await dispatch(cancelAppointment(id)).unwrap();
            toast.success("Appointment has canceled successfully!");
        } catch {
            toast.error("Failed to cancel appointment!");
        }
    };

    useEffect(() => {
        handleAppointments();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 py-10">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="rounded-lg p-5">
                        <div className="flex gap-4">
                            <Skeleton className="size-24 rounded-xl sm:size-28" />
                            <div className="flex flex-1 flex-col gap-2">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </div>
                        <Skeleton className="mt-4 h-9 w-full rounded-md" />
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 py-10">
            <h1 className="font-display text-3xl font-medium tracking-tight text-foreground">
                My appointments
            </h1>

            {appointments.length ? (
                <div className="flex flex-col gap-4">
                    {appointments.map((appointment) => {
                        const initials = appointment.doctor.name
                            ?.split(" ")
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase();

                        return (
                            <Card key={appointment._id} className="rounded-lg border-border p-0">
                                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex gap-4">
                                        <Avatar className="size-20 rounded-md sm:size-24">
                                            <AvatarImage
                                                src={appointment.doctor.image}
                                                alt={appointment.doctor.name}
                                            />
                                            <AvatarFallback>{initials}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col justify-center gap-1 text-sm text-muted-foreground">
                                            <p className="text-lg font-medium capitalize text-foreground">
                                                {appointment.doctor.name}
                                            </p>
                                            <p className="capitalize">
                                                {appointment.doctor.speciality}
                                            </p>
                                            <p className="mt-1 flex items-center gap-1.5">
                                                <MapPin className="size-4" />
                                                {appointment.doctor.address}
                                            </p>
                                            <p className="flex items-center gap-1.5 font-mono text-xs">
                                                <CalendarDays className="size-4" />
                                                {formatSlotDate(appointment.slotDate)} ·{" "}
                                                {appointment.slotTime}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* tear line */}
                                <div className="relative border-t-2 border-dashed border-border">
                                    <span className="absolute -left-2 -top-[5px] size-3 rounded-full bg-background" />
                                    <span className="absolute -right-2 -top-[5px] size-3 rounded-full bg-background" />
                                </div>

                                <div className="flex flex-col gap-2 bg-muted/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                                    {!appointment.cancel && !appointment.isCompleted && (
                                        <>
                                            {appointment.payment ? (
                                                <span className="stamp text-primary">
                                                    <CheckCircle2 className="size-3" />
                                                    Paid
                                                </span>
                                            ) : (
                                                <Button
                                                    disabled={appointment.payment}
                                                    onClick={() =>
                                                        onlinePaymentHandler(appointment._id)
                                                    }
                                                >
                                                    <CreditCard className="size-4" />
                                                    Pay here
                                                </Button>
                                            )}
                                            {!appointment.payment && (
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline">
                                                            Cancel appointment
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Cancel appointment?
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                This will cancel your booking. This
                                                                action cannot be undone.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">
                                                                    Keep it
                                                                </Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                                <Button
                                                                    variant="destructive"
                                                                    onClick={() =>
                                                                        handleCancel(
                                                                            appointment._id,
                                                                        )
                                                                    }
                                                                >
                                                                    Cancel appointment
                                                                </Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            )}
                                        </>
                                    )}

                                    {appointment.cancel && (
                                        <span className="stamp [--stamp-rotate:5deg] text-destructive">
                                            Cancelled
                                        </span>
                                    )}
                                    {appointment.isCompleted && (
                                        <span className="stamp text-primary">Completed</span>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
                    <p className="file-label text-muted-foreground">
                        Appointments haven't created yet!
                    </p>
                    <Button variant="outline" onClick={() => (window.location.href = "/doctors")}>
                        Browse doctors
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MyAppointment;