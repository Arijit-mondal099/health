import { Badge } from "@health/ui";
import { CheckCircle2, CreditCard, XCircle } from "lucide-react";

export function getAppointmentStatus(appointment) {
    if (appointment.cancel) return "canceled";
    if (appointment.isCompleted) return "completed";
    if (appointment.payment) return "paid";
    return "pending";
}

export function StatusBadge({ state }) {
    if (state === "canceled") {
        return (
            <Badge
                variant="destructive"
                className="gap-1 font-mono text-[11px] uppercase tracking-wider"
            >
                <XCircle className="size-3" />
                Canceled
            </Badge>
        );
    }
    if (state === "completed") {
        return (
            <Badge className="gap-1 font-mono text-[11px] uppercase tracking-wider">
                <CheckCircle2 className="size-3" />
                Completed
            </Badge>
        );
    }
    if (state === "paid") {
        return (
            <Badge
                variant="secondary"
                className="gap-1 font-mono text-[11px] uppercase tracking-wider"
            >
                <CreditCard className="size-3" />
                Paid
            </Badge>
        );
    }
    return (
        <Badge
            variant="outline"
            className="gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
        >
            Pending
        </Badge>
    );
}