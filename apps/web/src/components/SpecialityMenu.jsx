import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { specialityData } from "../assets";
import { getAllDoctors } from "../features/doctor/doctorSlice.js";
import { Card } from "@health/ui";
import SectionHeading from "./SectionHeading";

const SpecialityMenu = () => {
    const dispatch = useDispatch();
    const { doctors, loading } = useSelector((store) => store.doctor);

    useEffect(() => {
        dispatch(getAllDoctors());
    }, [dispatch]);

    const countFor = (speciality) =>
        doctors?.filter((doc) => doc.speciality === speciality.toLowerCase()).length;

    return (
        <section id="speciality" className="flex flex-col items-center gap-8 py-12 sm:py-16">
            <SectionHeading
                eyebrow="Specialities"
                title="Find by speciality"
                subtitle="Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free."
            />

            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {specialityData.map((data) => (
                    <Link
                        key={data.speciality}
                        to={`/doctors/${data.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        className="group"
                    >
                        <Card className="flex flex-row items-center gap-3 rounded-lg border-border p-3.5 transition-colors duration-200 hover:border-primary/40">
                            <img
                                src={data.image}
                                alt={data.speciality}
                                className="size-9 shrink-0 transition-transform duration-300 group-hover:scale-110"
                            />
                            <p className="text-sm font-medium capitalize text-foreground">
                                {data.speciality}
                            </p>
                            <span className="dot-leader" />
                            <span className="shrink-0 font-mono text-xs text-muted-foreground">
                                {loading ? "—" : `${countFor(data.speciality)} docs`}
                            </span>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default SpecialityMenu;