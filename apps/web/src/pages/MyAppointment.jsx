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
    Badge,
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
                    <Card key={i} className="flex gap-4 p-4">
                        <Skeleton className="size-28 rounded-md sm:size-32" />
                        <div className="flex flex-1 flex-col gap-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 py-10">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                My Appointment
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
                            <Card
                                key={appointment._id}
                                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex gap-4">
                                    <Avatar className="size-24 rounded-xl sm:size-28">
                                        <AvatarImage
                                            src={appointment.doctor.image}
                                            alt={appointment.doctor.name}
                                        />
                                        <AvatarFallback>{initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col justify-center gap-1 text-sm text-muted-foreground">
                                        <p className="text-lg font-medium text-foreground">
                                            {appointment.doctor.name}
                                        </p>
                                        <p className="capitalize">
                                            {appointment.doctor.speciality}
                                        </p>
                                        <p className="mt-1 flex items-center gap-1.5">
                                            <MapPin className="size-4" />
                                            {appointment.doctor.address}
                                        </p>
                                        <p className="flex items-center gap-1.5">
                                            <CalendarDays className="size-4" />
                                            {formatSlotDate(appointment.slotDate)} -{" "}
                                            {appointment.slotTime}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 sm:items-end">
                                    {!appointment.cancel && !appointment.isCompleted && (
                                        <>
                                            {appointment.payment ? (
                                                <Badge className="border-primary/20 bg-primary/10 text-primary">
                                                    <CheckCircle2 className="mr-1 size-3.5" />
                                                    Paid
                                                </Badge>
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
                                        <Badge variant="destructive">Cancelled</Badge>
                                    )}
                                    {appointment.isCompleted && (
                                        <Badge className="border-primary/20 bg-primary/10 text-primary">
                                            Completed
                                        </Badge>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
                    <p className="text-lg font-medium text-muted-foreground">
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