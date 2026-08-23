import { Card } from "@health/ui";

const DoctorCard = ({ doctor, onClick }) => {
    return (
        <Card
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick?.();
                }
            }}
            className="group cursor-pointer overflow-hidden border-border p-0 outline-none transition-all duration-200 hover:border-primary/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring"
        >
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="stamp absolute left-3 top-3 bg-card/80 backdrop-blur-sm text-primary [--stamp-rotate:-6deg]">
                    Available
                </span>
            </div>

            <div className="flex flex-col gap-1 p-4">
                <h3 className="text-base font-semibold capitalize leading-tight text-foreground">
                    {doctor.name}
                </h3>
                <p className="text-sm capitalize text-muted-foreground">{doctor.speciality}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">Fee ₹{doctor.fees}</p>
            </div>
        </Card>
    );
};

export default DoctorCard;