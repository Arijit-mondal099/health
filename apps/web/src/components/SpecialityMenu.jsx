import { Link } from "react-router-dom";
import { specialityData } from "../assets";
import { Card } from "@health/ui";
import SectionHeading from "./SectionHeading";

const SpecialityMenu = () => {
    return (
        <section id="speciality" className="flex flex-col items-center gap-8 py-12 sm:py-16">
            <SectionHeading
                eyebrow="Specialities"
                title="Find by speciality"
                subtitle="Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free."
            />

            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {specialityData.map((data) => (
                    <Link
                        key={data.speciality}
                        to={`/doctors/${data.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        className="group"
                    >
                        <Card className="flex flex-col items-center gap-3 border-border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                            <img
                                src={data.image}
                                alt={data.speciality}
                                className="size-12 transition-transform duration-300 group-hover:scale-110 sm:size-14"
                            />
                            <p className="text-center text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                                {data.speciality}
                            </p>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default SpecialityMenu;