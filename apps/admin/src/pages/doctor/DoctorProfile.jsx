import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editDoctorProfile, getDoctorProfile } from "../../features/doctor/doctorSlice.js";
import { toast } from "sonner";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Switch,
    Textarea,
} from "@health/ui";

const SPECIALITIES = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
];

const Field = ({ label, htmlFor, children }) => (
    <div className="flex flex-col gap-1.5">
        <Label htmlFor={htmlFor}>{label}</Label>
        {children}
    </div>
);

const DoctorProfile = () => {
    const { doctor } = useSelector((store) => store.doctor);
    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);
    const [name, setName] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [degree, setDegree] = useState("");
    const [experience, setExperience] = useState("");
    const [about, setAbout] = useState("");
    const [fees, setFees] = useState("");
    const [available, setAvailable] = useState(true);
    const [address, setAddress] = useState("");

    const handleEdit = async () => {
        try {
            const formData = new FormData();

            if (image) formData.append("image", image);
            formData.append("name", name);
            formData.append("speciality", speciality);
            formData.append("degree", degree);
            formData.append("experience", experience);
            formData.append("about", about);
            formData.append("fees", fees);
            formData.append("available", available);
            formData.append("address", address);

            await dispatch(editDoctorProfile(formData)).unwrap();
            toast.success("Profile updated");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile");
        }
    };

    useEffect(() => {
        dispatch(getDoctorProfile());
    }, [dispatch]);

    useEffect(() => {
        if (doctor) {
            setName(doctor.name || "");
            setSpeciality(doctor.speciality || "");
            setDegree(doctor.degree || "");
            setExperience(doctor.experience || "");
            setAbout(doctor.about || "");
            setFees(doctor.fees || "");
            setAvailable(doctor.available || false);
            setAddress(doctor.address || "");
        }
    }, [doctor]);

    if (!doctor) return null;

    return (
        <div className="py-6 md:py-8">
            <Card className="mx-auto w-full max-w-xl">
                <CardHeader className="items-center gap-4 sm:flex-row sm:items-center">
                    <label
                        htmlFor="doc-image"
                        className={isEdit ? "cursor-pointer" : "cursor-default"}
                    >
                        <Avatar className="size-20 rounded-full border border-border">
                            <AvatarImage
                                src={image ? URL.createObjectURL(image) : doctor.image}
                                alt={doctor.name}
                            />
                            <AvatarFallback>{doctor.name?.[0]}</AvatarFallback>
                        </Avatar>
                        {isEdit && (
                            <input
                                type="file"
                                id="doc-image"
                                hidden
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        )}
                    </label>
                    <div>
                        <CardTitle className="text-xl tracking-tight">{doctor.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{doctor.speciality}</p>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Name" htmlFor="name">
                            <Input
                                id="name"
                                value={name}
                                readOnly={!isEdit}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Field>

                        <Field label="Email" htmlFor="email">
                            <Input id="email" type="email" value={doctor.email} readOnly />
                        </Field>

                        <Field label="Speciality" htmlFor="speciality">
                            <Select
                                value={speciality}
                                onValueChange={setSpeciality}
                                disabled={!isEdit}
                            >
                                <SelectTrigger id="speciality">
                                    <SelectValue placeholder="Speciality" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SPECIALITIES.map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field label="Degree" htmlFor="degree">
                            <Input
                                id="degree"
                                value={degree}
                                readOnly={!isEdit}
                                onChange={(e) => setDegree(e.target.value)}
                            />
                        </Field>

                        <Field label="Experience" htmlFor="exp">
                            <Input
                                id="exp"
                                value={experience}
                                readOnly={!isEdit}
                                onChange={(e) => setExperience(e.target.value)}
                            />
                        </Field>

                        <Field label="Fees" htmlFor="fees">
                            <Input
                                id="fees"
                                value={fees}
                                readOnly={!isEdit}
                                onChange={(e) => setFees(e.target.value)}
                            />
                        </Field>
                    </div>

                    <Field label="About" htmlFor="about">
                        <Textarea
                            id="about"
                            rows={4}
                            value={about}
                            readOnly={!isEdit}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                    </Field>

                    <Field label="Address" htmlFor="address">
                        <Textarea
                            id="address"
                            rows={3}
                            value={address}
                            readOnly={!isEdit}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Field>

                    <div className="flex items-center justify-between rounded-lg border border-border p-3">
                        <Label htmlFor="available" className="cursor-pointer">
                            Available for appointments
                        </Label>
                        <Switch
                            id="available"
                            checked={available}
                            disabled={!isEdit}
                            onCheckedChange={setAvailable}
                        />
                    </div>

                    <Button
                        onClick={() => {
                            if (isEdit) handleEdit();
                            setIsEdit(!isEdit);
                        }}
                        className="self-start"
                    >
                        {isEdit ? "Save" : "Edit"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default DoctorProfile;