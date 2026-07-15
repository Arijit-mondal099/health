import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDoctors } from "../features/doctor/doctorSlice.js";
import { Button, Card, Skeleton } from "@health/ui";
import DoctorCard from "./DoctorCard";
import SectionHeading from "./SectionHeading";

const TopDoctors = () => {
    const { doctors, loading } = useSelector((store) => store.doctor);
    const { token } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDoctorClick = (id) => {
        if (!token) navigate("/login");
        else navigate(`/appointment/${id}`);
        scrollTo(0, 0);
    };

    useEffect(() => {
        dispatch(getAllDoctors());
    }, [dispatch]);

    return (
        <section className="flex flex-col items-center gap-8 py-12">
            <SectionHeading
                eyebrow="Top Doctors"
                title="Top doctors to book"
                subtitle="Simply browse through our extensive list of trusted doctors."
            />

            {loading ? (
                <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <Card key={i} className="overflow-hidden border-border p-0">
                            <Skeleton className="aspect-square w-full rounded-none" />
                            <div className="space-y-2 p-4">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5">
                    {doctors?.slice(0, 10).map((doctor) => (
                        <DoctorCard
                            key={doctor._id}
                            doctor={doctor}
                            onClick={() => handleDoctorClick(doctor._id)}
                        />
                    ))}
                </div>
            )}

            <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                    navigate("/doctors");
                    scrollTo(0, 0);
                }}
            >
                See more
            </Button>
        </section>
    );
};

export default TopDoctors;