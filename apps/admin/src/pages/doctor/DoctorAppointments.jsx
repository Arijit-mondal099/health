import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    cancelAppointment,
    completeAppointment,
    doctorAppointments,
} from "../../features/doctor/doctorSlice.js";
import { toast } from "sonner";
import { CalendarX } from "lucide-react";
import { Card, CardContent, CardHeader, Skeleton } from "@health/ui";
import { AppointmentsTable } from "../../components/AppointmentsTable.jsx";
import EmptyState from "../../components/EmptyState.jsx";

const DoctorAppointments = () => {
    const { appointments } = useSelector((store) => store.doctor);
    const dispatch = useDispatch();

    const handleCancelAppointment = async (appointmentId) => {
        try {
            await dispatch(cancelAppointment(appointmentId)).unwrap();
            toast.success("Appointment canceled");
        } catch {
            toast.error("Failed to cancel appointment");
        }
    };

    const handleCompleteAppointment = async (appointmentId) => {
        try {
            await dispatch(completeAppointment(appointmentId)).unwrap();
            toast.success("Appointment completed");
        } catch {
            toast.error("Failed to complete appointment");
        }
    };

    useEffect(() => {
        dispatch(doctorAppointments());
    }, [dispatch]);

    if (!appointments) {
        return (
            <div className="flex flex-col gap-6 py-6 md:py-8">
                <h1 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                    Appointments
                </h1>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full rounded-md" />
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 py-6 md:py-8">
            <h1 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                Appointments
            </h1>

            {appointments.length ? (
                <AppointmentsTable
                    appointments={appointments}
                    showDoctor={false}
                    showPayment
                    onCancel={handleCancelAppointment}
                    onComplete={handleCompleteAppointment}
                />
            ) : (
                <EmptyState icon={CalendarX} title="No appointments yet" />
            )}
        </div>
    );
};

export default DoctorAppointments;