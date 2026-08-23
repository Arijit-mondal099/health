import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@health/ui";
import HeroMockup from "./HeroMockup";

const Header = () => {
    const navigate = useNavigate();

    return (
        <section className="pt-10 text-center lg:pt-14">
            <div className="anim-fade-up mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5">
                <span className="size-2 rounded-full bg-primary" />
                <span className="text-xs font-medium text-muted-foreground">Book in minutes</span>
            </div>

            <h1
                className="anim-fade-up mx-auto mt-6 max-w-3xl font-display text-balance text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                style={{ animationDelay: "100ms" }}
            >
                Book appointments with{" "}
                <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
                    trusted doctors
                </span>
            </h1>

            <p
                className="anim-fade-up mx-auto mt-5 max-w-xl text-balance text-sm text-muted-foreground sm:text-base"
                style={{ animationDelay: "200ms" }}
            >
                Browse verified specialists, compare fees, and book your visit in minutes — no phone
                calls, no waiting rooms.
            </p>

            <div
                className="anim-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
                style={{ animationDelay: "300ms" }}
            >
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

            <div
                className="anim-fade-up mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
                style={{ animationDelay: "400ms" }}
            >
                <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-primary text-primary" />
                    ))}
                </span>
                <span className="text-sm font-semibold text-foreground">4.9/5</span>
                <span className="font-mono text-xs text-muted-foreground">
                    · trusted by 50k+ patients
                </span>
            </div>

            <HeroMockup />
        </section>
    );
};

export default Header;