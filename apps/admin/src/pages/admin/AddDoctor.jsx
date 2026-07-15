import { useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor } from "../../features/admin/adminSlice.js";
import { Loader2, Upload } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
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

const AddDoctor = () => {
    const [docImage, setDocImage] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("1 Year");
    const [fees, setFees] = useState("");
    const [speciality, setSpeciality] = useState("General physician");
    const [education, setEducation] = useState("");
    const [address, setAddress] = useState("");
    const [about, setAbout] = useState("");

    const { loading } = useSelector((store) => store.admin);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!docImage) {
                toast.error("Doctor image not provided");
                return;
            }

            const formData = new FormData();
            formData.append("image", docImage);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience", experience);
            formData.append("fees", Number(fees));
            formData.append("speciality", speciality);
            formData.append("degree", education);
            formData.append("address", address);
            formData.append("about", about);

            await dispatch(addDoctor(formData)).unwrap();
            toast.success("Doctor added successfully");

            setName("");
            setEmail("");
            setPassword("");
            setAbout("");
            setAddress("");
            setDocImage(false);
            setEducation("");
            setSpeciality("");
            setFees("");
            setExperience("");
        } catch (error) {
            toast.error(error?.message || "Something went wrong");
        }
    };

    return (
        <div className="py-6 md:py-8">
            <Card className="mx-auto w-full max-w-3xl">
                <CardHeader>
                    <CardTitle className="text-2xl tracking-tight">Add Doctor</CardTitle>
                    <CardDescription>Register a new doctor to the clinic.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <label
                            htmlFor="doctorImage"
                            className="flex w-fit cursor-pointer items-center gap-4"
                        >
                            <Avatar className="size-20 rounded-full border border-border">
                                {docImage ? (
                                    <AvatarImage
                                        src={URL.createObjectURL(docImage)}
                                        alt="Doctor preview"
                                    />
                                ) : (
                                    <AvatarFallback className="bg-muted text-muted-foreground">
                                        <Upload className="size-6" />
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Doctor picture
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Upload a profile photo
                                </p>
                            </div>
                            <input
                                type="file"
                                id="doctorImage"
                                hidden
                                onChange={(e) => setDocImage(e.target.files[0])}
                            />
                        </label>

                        <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Doctor name" htmlFor="name">
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Field>

                            <Field label="Doctor email" htmlFor="email">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Field>

                            <Field label="Doctor password" htmlFor="password">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Field>

                            <Field label="Fees" htmlFor="fees">
                                <Input
                                    id="fees"
                                    type="text"
                                    placeholder="Fees"
                                    required
                                    value={fees}
                                    onChange={(e) => setFees(e.target.value)}
                                />
                            </Field>

                            <Field label="Experience" htmlFor="experience">
                                <Select value={experience} onValueChange={setExperience}>
                                    <SelectTrigger id="experience">
                                        <SelectValue placeholder="Experience" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <SelectItem key={i} value={`${i + 1} Year`}>
                                                {`${i + 1} Year`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field label="Speciality" htmlFor="speciality">
                                <Select value={speciality} onValueChange={setSpeciality}>
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

                            <Field label="Education" htmlFor="education">
                                <Input
                                    id="education"
                                    type="text"
                                    placeholder="Education"
                                    required
                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)}
                                />
                            </Field>

                            <Field label="Address" htmlFor="address">
                                <Input
                                    id="address"
                                    type="text"
                                    placeholder="Address"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Field>
                        </div>

                        <Field label="About me" htmlFor="about">
                            <Textarea
                                id="about"
                                placeholder="Write about the doctor"
                                rows={5}
                                required
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </Field>

                        <Button type="submit" disabled={loading} className="self-start">
                            {loading ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Adding…
                                </>
                            ) : (
                                "Add doctor"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddDoctor;