import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../features/doctor/doctorSlice.js";
import { specialityData } from "../assets";
import { SearchX } from "lucide-react";
import {
    Button,
    Card,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Skeleton,
} from "@health/ui";
import DoctorCard from "../components/DoctorCard";
import SectionHeading from "../components/SectionHeading";

const Doctors = () => {
    const [filterDoctor, setFilterDoctor] = useState([]);

    const { doctors, loading } = useSelector((store) => store.doctor);
    const { token } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const { speciality } = useParams();
    const navigate = useNavigate();

    const applyFilter = () => {
        if (speciality) {
            setFilterDoctor(doctors.filter((doc) => doc.speciality === speciality.toLowerCase()));
        } else {
            setFilterDoctor(doctors);
        }
    };

    const handleDoctorClick = (id) => {
        if (!token) navigate("/login");
        else navigate(`/appointment/${id}`);
        scrollTo(0, 0);
    };

    const onSpecialityChange = (value) => {
        if (value === "all") navigate("/doctors");
        else navigate(`/doctors/${value}`);
        scrollTo(0, 0);
    };

    useEffect(() => {
        applyFilter();
    }, [speciality, doctors]);

    useEffect(() => {
        dispatch(getAllDoctors());
    }, [dispatch]);

    return (
        <section className="flex flex-col gap-8 py-8">
            <SectionHeading
                align="left"
                eyebrow="Our Specialists"
                title="All doctors"
                subtitle="Browse and book from our network of verified specialist doctors."
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Select value={speciality || "all"} onValueChange={onSpecialityChange}>
                    <SelectTrigger className="w-full sm:w-60">
                        <SelectValue placeholder="Filter by speciality" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All specialities</SelectItem>
                        {specialityData.map((item) => (
                            <SelectItem key={item.speciality} value={item.speciality.toLowerCase()}>
                                {item.speciality}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <p className="text-sm text-muted-foreground">
                    {loading
                        ? "Loading specialists…"
                        : `${filterDoctor.length} specialist${filterDoctor.length === 1 ? "" : "s"}`}
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-5">
                    {Array.from({ length: 8 }).map((_, i) => (
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
            ) : filterDoctor.length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-5">
                    {filterDoctor.map((doctor) => (
                        <DoctorCard
                            key={doctor._id}
                            doctor={doctor}
                            onClick={() => handleDoctorClick(doctor._id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
                    <SearchX className="size-10 text-muted-foreground" />
                    <p className="text-lg font-medium text-muted-foreground">
                        Doctors are not available
                    </p>
                    <Button variant="outline" onClick={() => navigate("/doctors")}>
                        Clear filter
                    </Button>
                </div>
            )}
        </section>
    );
};

export default Doctors;