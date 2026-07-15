import { Card, Badge } from "@health/ui";

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
            <div className="aspect-square w-full overflow-hidden bg-muted">
                <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-col gap-1 p-4">
                <div className="flex items-center gap-2">
                    <span className="inline-flex size-1.5 rounded-full bg-primary" />
                    <Badge
                        variant="secondary"
                        className="border border-border bg-muted text-muted-foreground hover:bg-muted"
                    >
                        Available
                    </Badge>
                </div>

                <h3 className="mt-1 text-base font-semibold capitalize leading-tight text-foreground">
                    {doctor.name}
                </h3>
                <p className="text-sm capitalize text-muted-foreground">{doctor.speciality}</p>
            </div>
        </Card>
    );
};

export default DoctorCard;