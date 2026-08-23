import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    cancelAppointment,
    completeAppointment,
    doctorAppointments,
    getDoctorDashboard,
} from "../../features/doctor/doctorSlice.js";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    Skeleton,
} from "@health/ui";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import { CalendarDays, CalendarX, CheckCircle2, IndianRupee, Users, XCircle } from "lucide-react";
import { AppointmentsTable } from "../../components/AppointmentsTable.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import { getMonthlyTrend, getStatusBreakdown } from "../../utils/appointmentCharts.js";

const STATS = [
    { key: "earnings", label: "Earnings", icon: IndianRupee, format: (v) => `₹${v}` },
    { key: "appointments", label: "Appointments", icon: CalendarDays, format: (v) => v },
    {
        key: "patients",
        label: "Patients",
        icon: Users,
        format: (v) => (Array.isArray(v) ? v.length : v),
    },
    { key: "complete", label: "Complete", icon: CheckCircle2, format: (v) => v },
    { key: "cancel", label: "Cancel", icon: XCircle, format: (v) => v },
];

const trendConfig = {
    count: { label: "Appointments", color: "var(--primary)" },
};

const statusConfig = {
    completed: { label: "Completed", color: "var(--primary)" },
    canceled: { label: "Canceled", color: "var(--destructive)" },
    pending: { label: "Pending", color: "var(--muted-foreground)" },
};

const DoctorDashboard = () => {
    const { dashboard, appointments } = useSelector((store) => store.doctor);
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
        dispatch(getDoctorDashboard());
        dispatch(doctorAppointments());
    }, [dispatch]);

    if (!dashboard) {
        return (
            <div className="flex flex-col gap-6 py-6 md:py-8">
                <h1 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                    Doctor Dashboard
                </h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Card key={i}>
                            <CardContent className="flex items-center gap-4 p-6">
                                <Skeleton className="size-12 rounded-lg" />
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-7 w-16" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full rounded-md" />
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    }

    const monthly = getMonthlyTrend(appointments);
    const statusData = getStatusBreakdown(appointments);

    return (
        <div className="flex flex-col gap-6 py-6 md:py-8">
            <h1 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                Doctor Dashboard
            </h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {STATS.map(({ key, label, icon: Icon, format }) => (
                    <Card key={key}>
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="size-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display text-3xl font-medium tracking-tight text-foreground">
                                    {format(dashboard[key])}
                                </span>
                                <span className="file-label mt-1 text-muted-foreground">
                                    {label}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-display text-base font-medium">
                            Appointments trend
                        </CardTitle>
                        <CardDescription>Monthly appointment volume</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {appointments?.length ? (
                            <ChartContainer
                                config={trendConfig}
                                className="aspect-auto h-[240px] w-full"
                            >
                                <AreaChart data={monthly} margin={{ left: 4, right: 4 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        width={32}
                                        allowDecimals={false}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Area
                                        dataKey="count"
                                        type="monotone"
                                        fill="var(--color-count)"
                                        stroke="var(--color-count)"
                                    />
                                </AreaChart>
                            </ChartContainer>
                        ) : (
                            <EmptyState
                                icon={CalendarX}
                                title="No appointments yet"
                                className="h-[240px] rounded-lg border-0 py-0"
                            />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-display text-base font-medium">
                            Appointment status
                        </CardTitle>
                        <CardDescription>Completed, canceled and pending</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {appointments?.length ? (
                            <ChartContainer
                                config={statusConfig}
                                className="mx-auto aspect-square h-[240px] w-full"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        content={<ChartTooltipContent nameKey="status" hideLabel />}
                                    />
                                    <Pie
                                        data={statusData}
                                        dataKey="value"
                                        nameKey="status"
                                        innerRadius={55}
                                        outerRadius={90}
                                        paddingAngle={2}
                                    >
                                        {statusData.map((entry) => (
                                            <Cell
                                                key={entry.status}
                                                fill={`var(--color-${entry.status})`}
                                            />
                                        ))}
                                    </Pie>
                                    <ChartLegend
                                        content={<ChartLegendContent nameKey="status" />}
                                    />
                                </PieChart>
                            </ChartContainer>
                        ) : (
                            <EmptyState
                                icon={CalendarX}
                                title="No appointments yet"
                                className="h-[240px] rounded-lg border-0 py-0"
                            />
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-display text-base font-medium">
                        Recent Appointments
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {appointments?.length ? (
                        <AppointmentsTable
                            appointments={appointments.slice(0, 5)}
                            showDoctor={false}
                            showPayment
                            onCancel={handleCancelAppointment}
                            onComplete={handleCompleteAppointment}
                        />
                    ) : (
                        <EmptyState
                            icon={CalendarX}
                            title="No appointments yet"
                            className="rounded-lg border-0 py-8"
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default DoctorDashboard;