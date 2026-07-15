import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@health/ui";
import { StatusBadge, getAppointmentStatus } from "./AppointmentStatus";
import ageConverter from "../utils/ageConverter";
import dateConverter from "../utils/dateConverter";

export function AppointmentsTable({
    appointments,
    showDoctor = true,
    showPayment = false,
    onCancel,
    onComplete,
}) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-10">#</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Date &amp; Time</TableHead>
                        {showDoctor && <TableHead>Doctor</TableHead>}
                        <TableHead>Fees</TableHead>
                        {showPayment && <TableHead>Payment</TableHead>}
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.map((appointment, i) => {
                        const status = getAppointmentStatus(appointment);
                        const actionable = !appointment.cancel && !appointment.isCompleted;
                        return (
                            <TableRow key={appointment._id}>
                                <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="size-8 border border-border">
                                            <AvatarImage
                                                src={appointment.user.image}
                                                alt={appointment.user.name}
                                            />
                                            <AvatarFallback>
                                                {appointment.user.name?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium text-foreground">
                                            {appointment.user.name}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {ageConverter(appointment.user.dob)}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {`${dateConverter(appointment.slotDate)} ${appointment.slotTime}`}
                                </TableCell>
                                {showDoctor && (
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="size-8 border border-border">
                                                <AvatarImage
                                                    src={appointment.doctor.image}
                                                    alt={appointment.doctor.name}
                                                />
                                                <AvatarFallback>
                                                    {appointment.doctor.name?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium text-foreground">
                                                {appointment.doctor.name}
                                            </span>
                                        </div>
                                    </TableCell>
                                )}
                                <TableCell className="font-medium">
                                    ₹{appointment.doctor.fees}
                                </TableCell>
                                {showPayment && (
                                    <TableCell>
                                        {appointment.payment ? (
                                            <Badge variant="secondary">Online</Badge>
                                        ) : (
                                            <Badge variant="outline">Cash</Badge>
                                        )}
                                    </TableCell>
                                )}
                                <TableCell>
                                    <StatusBadge state={status} />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end">
                                        {actionable && (onComplete || onCancel) && (
                                            <Select
                                                onValueChange={(value) => {
                                                    if (value === "complete" && onComplete) {
                                                        onComplete(appointment._id);
                                                    }
                                                    if (value === "cancel" && onCancel) {
                                                        onCancel(appointment._id);
                                                    }
                                                }}
                                            >
                                                <SelectTrigger className="w-[170px]">
                                                    <SelectValue placeholder="Update status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {onComplete && (
                                                        <SelectItem value="complete">
                                                            Mark completed
                                                        </SelectItem>
                                                    )}
                                                    {onCancel && (
                                                        <SelectItem value="cancel">
                                                            Cancel appointment
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}