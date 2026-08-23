import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserProfile } from "../features/user/userSlice.js";
import { ArrowLeftRight, Cake, Mail, MapPin, Phone, ShieldCheck, Upload, User } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    Button,
    Card,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Skeleton,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    cn,
} from "@health/ui";

const ProfileField = ({ label, htmlFor, isEdit, editNode, value, className, icon: Icon }) => (
    <div className={cn("flex flex-col gap-1.5", className)}>
        <Label htmlFor={htmlFor} className="flex items-center gap-1.5 text-muted-foreground">
            {Icon && <Icon className="size-3.5" />}
            {label}
        </Label>
        {isEdit ? editNode : <p className="text-sm text-foreground">{value}</p>}
    </div>
);

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(false);
    const dispatch = useDispatch();
    const { loading, userData } = useSelector((store) => store.user);
    const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174";

    const handleProfileEdit = () => {
        const formData = new FormData();

        if (image) formData.append("image", image);
        formData.append("name", user?.name);
        formData.append("phone", user?.phone);
        formData.append("address", user?.address);
        formData.append("gender", user?.gender);
        formData.append("dob", user?.dob);

        dispatch(updateUserProfile(formData));
    };

    useEffect(() => {
        setUser(userData);
    }, [userData]);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    if (loading || !user) {
        return (
            <div className="flex w-full flex-col gap-6 py-10">
                <Card className="overflow-hidden">
                    <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                        <div className="flex items-center gap-4">
                            <Skeleton className="size-20 shrink-0 rounded-full" />
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-7 w-40" />
                                <Skeleton className="h-4 w-56" />
                                <Skeleton className="mt-1 h-5 w-16 rounded-full" />
                            </div>
                        </div>
                        <Skeleton className="h-9 w-28 rounded-md" />
                    </div>
                    <div className="border-t border-border p-6 sm:p-8">
                        <Skeleton className="mb-6 h-9 w-64 rounded-md" />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full sm:col-span-2" />
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    const initials = user?.name
        ?.split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div className="flex w-full flex-col gap-6 py-10">
            <Card className="overflow-hidden">
                <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                    <div className="flex items-center gap-4">
                        <div className="relative size-20 shrink-0 rounded-full ring-2 ring-border">
                            <label
                                htmlFor={user._id}
                                className={cn("group block", isEdit && "cursor-pointer")}
                                aria-label="Change profile photo"
                            >
                                <Avatar className="size-20 rounded-full">
                                    <AvatarImage
                                        src={image ? URL.createObjectURL(image) : user?.image}
                                        alt={user?.name}
                                    />
                                    <AvatarFallback className="rounded-full text-2xl">
                                        {initials || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                {isEdit && (
                                    <span className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/40 text-background opacity-0 transition-opacity group-hover:opacity-100">
                                        <Upload className="size-5" />
                                    </span>
                                )}
                            </label>
                            {isEdit && (
                                <input
                                    type="file"
                                    id={user._id}
                                    aria-label="Change profile photo"
                                    hidden
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            )}
                        </div>
                        <div className="min-w-0">
                            <h1 className="truncate font-display text-2xl font-medium tracking-tight text-foreground">
                                {user.name}
                            </h1>
                            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                            {user?.role === "admin" ? (
                                <Badge className="mt-2 gap-1">
                                    <ShieldCheck className="size-3" />
                                    Admin
                                </Badge>
                            ) : (
                                <Badge
                                    variant="secondary"
                                    className="mt-2 gap-1 border border-primary/20 bg-primary/10 text-primary"
                                >
                                    Patient
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                        {user?.role === "admin" && (
                            <Button asChild variant="outline">
                                <a href={ADMIN_URL}>
                                    <ArrowLeftRight className="size-4" />
                                    Switch to admin
                                </a>
                            </Button>
                        )}
                        {isEdit ? (
                            <Button
                                onClick={() => {
                                    setIsEdit(false);
                                    handleProfileEdit();
                                }}
                            >
                                Save changes
                            </Button>
                        ) : (
                            <Button variant="outline" onClick={() => setIsEdit(true)}>
                                Edit profile
                            </Button>
                        )}
                    </div>
                </div>

                <div className="border-t border-border">
                    <Tabs defaultValue="contact" className="p-6 sm:p-8">
                        <TabsList variant="line" className="mb-6">
                            <TabsTrigger value="contact">Contact information</TabsTrigger>
                            <TabsTrigger value="basic">Basic information</TabsTrigger>
                        </TabsList>

                        <TabsContent value="contact">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <ProfileField
                                    icon={Mail}
                                    label="Email"
                                    value={user.email}
                                    className="sm:col-span-2"
                                />
                                <ProfileField
                                    icon={Phone}
                                    label="Phone"
                                    isEdit={isEdit}
                                    value={user?.phone}
                                    editNode={
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={user?.phone}
                                            onChange={(e) =>
                                                setUser((prev) => ({
                                                    ...prev,
                                                    phone: e.target.value,
                                                }))
                                            }
                                        />
                                    }
                                />
                                <ProfileField
                                    icon={MapPin}
                                    label="Address"
                                    isEdit={isEdit}
                                    value={user?.address || "Not set"}
                                    className="sm:col-span-2"
                                    editNode={
                                        <Input
                                            id="address"
                                            value={user?.address}
                                            onChange={(e) =>
                                                setUser((prev) => ({
                                                    ...prev,
                                                    address: e.target.value,
                                                }))
                                            }
                                        />
                                    }
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="basic">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <ProfileField
                                    icon={User}
                                    label="Gender"
                                    isEdit={isEdit}
                                    value={user?.gender}
                                    editNode={
                                        <Select
                                            value={user?.gender}
                                            onValueChange={(value) =>
                                                setUser((prev) => ({ ...prev, gender: value }))
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    }
                                />
                                <ProfileField
                                    icon={Cake}
                                    label="Birthday"
                                    isEdit={isEdit}
                                    value={user.dob}
                                    editNode={
                                        <Input
                                            id="dob"
                                            type="date"
                                            value={user.dob}
                                            onChange={(e) =>
                                                setUser((prev) => ({
                                                    ...prev,
                                                    dob: e.target.value,
                                                }))
                                            }
                                        />
                                    }
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </Card>
        </div>
    );
};

export default MyProfile;