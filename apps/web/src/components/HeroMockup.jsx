import { BadgeCheck, CalendarDays, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import { cn } from "@health/ui";

const DAYS = [
    { day: "Sat", date: 22 },
    { day: "Sun", date: 23 },
    { day: "Mon", date: 24 },
    { day: "Tue", date: 25 },
    { day: "Wed", date: 26 },
    { day: "Thu", date: 27 },
    { day: "Fri", date: 28 },
];

const TIMES = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
];
const BOOKED = [4, 7];
const SELECTED_TIME = "10:30 AM";

const HeroMockup = () => {
    return (
        <div className="relative mt-16 pb-10">
            {/* backdrop glow + dot grid */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-28 mx-auto h-80 w-3/4 rounded-full bg-primary/20 blur-[120px]"
            />
            <div
                aria-hidden="true"
                className="dot-grid absolute inset-x-0 -top-12 mx-auto h-64 w-4/5 text-primary/30 [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_75%)]"
            />

            {/* app window */}
            <div
                className="anim-fade-up relative mx-auto max-w-3xl"
                style={{ animationDelay: "400ms" }}
            >
                <div className="overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl">
                    <div className="flex items-center gap-3 border-b border-border bg-background/60 px-4 py-2.5">
                        <span className="flex gap-1.5">
                            <span className="size-2.5 rounded-full bg-border" />
                            <span className="size-2.5 rounded-full bg-border" />
                            <span className="size-2.5 rounded-full bg-border" />
                        </span>
                        <span className="mx-auto rounded-md border border-border bg-card px-3 py-0.5 font-mono text-[10px] text-muted-foreground">
                            health.app/book
                        </span>
                        <span className="w-12" />
                    </div>

                    <div className="p-5 sm:p-8">
                        {/* doctor row */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary sm:size-11">
                                    RJ
                                </span>
                                <div className="min-w-0">
                                    <p className="flex items-center gap-1.5 truncate text-sm font-semibold capitalize text-foreground sm:text-base">
                                        Dr. Richard James
                                        <BadgeCheck className="size-4 shrink-0 text-primary" />
                                    </p>
                                    <p className="truncate text-xs capitalize text-muted-foreground sm:text-sm">
                                        General physician
                                    </p>
                                </div>
                            </div>
                            <div className="hidden items-baseline gap-2 text-sm sm:flex">
                                <span className="text-muted-foreground">Consultation fee</span>
                                <span className="dot-leader w-14" />
                                <span className="font-mono font-semibold text-foreground">
                                    ₹999
                                </span>
                            </div>
                        </div>

                        {/* day tokens */}
                        <div className="mt-6 grid grid-cols-7 gap-1.5 sm:gap-2">
                            {DAYS.map((d, i) => (
                                <div
                                    key={d.day}
                                    className={cn(
                                        "rounded-md border py-1.5 text-center sm:py-2.5",
                                        i === 0
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border bg-background",
                                    )}
                                >
                                    <p
                                        className={cn(
                                            "font-mono text-[9px] uppercase tracking-widest sm:text-[10px]",
                                            i === 0 ? "opacity-80" : "text-muted-foreground",
                                        )}
                                    >
                                        {d.day}
                                    </p>
                                    <p className="text-sm font-semibold sm:text-lg">{d.date}</p>
                                </div>
                            ))}
                        </div>

                        {/* time slots */}
                        <div className="mt-4 grid grid-cols-4 gap-1.5 sm:gap-2">
                            {TIMES.map((t) => (
                                <div
                                    key={t}
                                    className={cn(
                                        "rounded-sm border px-2 py-1.5 text-center font-mono text-[10px] sm:py-2 sm:text-xs",
                                        t === SELECTED_TIME
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : BOOKED.includes(TIMES.indexOf(t))
                                              ? "border-border bg-background text-muted-foreground/50 line-through decoration-1"
                                              : "border-border bg-background text-muted-foreground",
                                    )}
                                >
                                    {t}
                                </div>
                            ))}
                        </div>

                        {/* confirm row */}
                        <div className="mt-6 flex items-center justify-between gap-3">
                            <p className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:flex">
                                <Clock className="size-3.5" />
                                Next available today
                            </p>
                            <div className="ml-auto inline-flex cursor-default items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground sm:px-5 sm:py-2.5">
                                Confirm booking
                                <ChevronRight className="size-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* floating chips */}
                <div
                    aria-hidden="true"
                    className="anim-float absolute -right-6 -top-8 hidden items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 shadow-lg backdrop-blur lg:flex xl:-right-12"
                >
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-foreground">
                        Confirmed · Token #042
                    </span>
                </div>
                <div
                    aria-hidden="true"
                    className="anim-float absolute -bottom-8 -left-6 hidden items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 shadow-lg backdrop-blur lg:flex xl:-left-12"
                    style={{ animationDelay: "-3s" }}
                >
                    <CalendarDays className="size-4 shrink-0 text-primary" />
                    <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-foreground">
                        Today · 10:30 AM
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HeroMockup;