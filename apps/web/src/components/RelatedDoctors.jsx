import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DoctorCard from "./DoctorCard";
import { Button } from "@health/ui";
import SectionHeading from "./SectionHeading";

const RelatedDoctors = ({ doctorId, speciality }) => {
    const { doctors } = useSelector((store) => store.doctor);
    const [relatedDoc, setRelatedDoc] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const doctorsList = doctors.filter(
            (doc) => doc.speciality === speciality && doc._id !== doctorId,
        );
        setRelatedDoc(doctorsList);
    }, [doctorId, speciality, doctors]);

    if (relatedDoc.length === 0) return null;

    return (
        <section className="flex flex-col items-center gap-8 py-12">
            <SectionHeading
                eyebrow="Related"
                title="Related doctors"
                subtitle="Simply browse through our extensive list of trusted doctors."
            />

            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5">
                {relatedDoc.slice(0, 5).map((doc) => (
                    <DoctorCard
                        key={doc._id}
                        doctor={doc}
                        onClick={() => {
                            navigate(`/appointment/${doc._id}`);
                            scrollTo(0, 0);
                        }}
                    />
                ))}
            </div>

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

export default RelatedDoctors;