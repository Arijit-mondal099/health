import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDoctors, toggleAvailblity } from "../../features/admin/adminSlice.js";
import { toast } from "sonner";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Card,
    CardContent,
    Skeleton,
    Switch,
} from "@health/ui";
import { Users } from "lucide-react";
import EmptyState from "../../components/EmptyState.jsx";

const DoctorsList = () => {
    const { doctors, loading } = useSelector((store) => store.admin);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDoctors());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex flex-col gap-6 py-6 md:py-8">
                <h1 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                    All Doctors
                </h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i}>
                            <CardContent className="flex flex-col gap-3 p-4">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="size-14 rounded-full" />
                                    <div className="flex flex-col gap-2">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t border-border pt-3">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-5 w-9 rounded-full" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 py-6 md:py-8">
            <h1 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                All Doctors
            </h1>

            {doctors?.length ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {doctors.map((doctor) => (
                        <Card key={doctor._id} className="overflow-hidden">
                            <CardContent className="flex flex-col gap-3 p-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-14 rounded-full border border-border">
                                        <AvatarImage src={doctor.image} alt={doctor.name} />
                                        <AvatarFallback>{doctor.name?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <h2 className="truncate font-semibold capitalize text-foreground">
                                            {doctor.name}
                                        </h2>
                                        <p className="file-label truncate text-muted-foreground">
                                            {doctor.speciality}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t border-border pt-3">
                                    <span className="file-label text-muted-foreground">
                                        Available
                                    </span>
                                    <Switch
                                        checked={doctor.available}
                                        onCheckedChange={async () => {
                                            try {
                                                await dispatch(
                                                    toggleAvailblity(doctor._id),
                                                ).unwrap();
                                                toast.success("Doctor availability changed");
                                            } catch (error) {
                                                toast.error(
                                                    error?.message ||
                                                        "Failed to change doctor availability",
                                                );
                                            }
                                        }}
                                        aria-label="Toggle availability"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <EmptyState icon={Users} title="Doctors haven't been created yet" />
            )}
        </div>
    );
};

export default DoctorsList;