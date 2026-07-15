import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { appointment_img } from "../assets";
import { Button } from "@health/ui";

const Banner = () => {
    const navigate = useNavigate();

    return (
        <section className="brand-gradient my-10 flex flex-col items-center gap-8 overflow-hidden rounded-3xl px-6 py-12 sm:px-10 md:flex-row md:px-14 lg:my-20 lg:px-12">
            <div className="flex-1 py-2">
                <h2 className="text-2xl font-semibold tracking-tight text-white text-shadow-sm sm:text-3xl lg:text-4xl">
                    Book appointment
                </h2>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white text-shadow-sm sm:text-3xl lg:text-4xl">
                    with 100+ trusted doctors
                </h2>

                <Button
                    size="lg"
                    className="mt-8 bg-white text-primary shadow-sm hover:bg-white/90"
                    onClick={() => {
                        navigate("/login");
                        scrollTo(0, 0);
                    }}
                >
                    Create account
                    <ArrowRight className="size-4" />
                </Button>
            </div>

            <div className="hidden w-1/2 lg:block">
                <img
                    src={appointment_img}
                    alt="Book an appointment"
                    className="ml-auto max-w-md drop-shadow-xl"
                />
            </div>
        </section>
    );
};

export default Banner;