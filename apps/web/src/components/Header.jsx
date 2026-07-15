import { group_profiles, header_img } from "../assets";
import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@health/ui";

const STATS = [
    { value: "100+", label: "Trusted specialists" },
    { value: "50k+", label: "Patients served" },
    { value: "24/7", label: "Care support" },
];

const Header = () => {
    const navigate = useNavigate();

    return (
        <section className="relative mt-4 overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 md:px-12 md:py-16 lg:px-16">
            <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-2">
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <span className="size-1.5 rounded-full bg-primary" />
                        Trusted healthcare, simplified
                    </span>

                    <h1 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        Book appointments with trusted doctors
                    </h1>

                    <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
                        Browse our network of verified specialists and schedule a visit in minutes —
                        no phone calls, no waiting rooms.
                    </p>

                    <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:items-start">
                        <Button
                            size="lg"
                            className="group"
                            onClick={() => {
                                navigate("/doctors");
                                scrollTo(0, 0);
                            }}
                        >
                            Book an appointment
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => {
                                navigate("/doctors");
                                scrollTo(0, 0);
                            }}
                        >
                            Browse specialists
                        </Button>
                    </div>

                    <div className="mt-7 flex w-fit items-center gap-3 rounded-full border border-border bg-muted/40 py-1.5 pl-1.5 pr-4">
                        <img
                            src={group_profiles}
                            alt="Patients"
                            className="h-9 w-auto rounded-full object-cover"
                        />
                        <div className="leading-tight">
                            <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                                <Star className="size-3.5 fill-primary text-primary" />
                                4.9 / 5
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Trusted by 50k+ patients
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative hidden lg:block">
                    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                        <img src={header_img} alt="Doctor" className="w-full object-cover" />
                    </div>
                </div>
            </div>

            <div className="relative mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
                {STATS.map((stat) => (
                    <div key={stat.label} className="text-center">
                        <p className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                            {stat.value}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Header;