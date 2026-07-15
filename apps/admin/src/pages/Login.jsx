import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { adminLogin } from "../features/admin/adminSlice.js";
import { doctorLogin } from "../features/doctor/doctorSlice.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Tabs,
    TabsList,
    TabsTrigger,
} from "@health/ui";

const Login = () => {
    const [state, setState] = useState("admin");
    const [email, setEmail] = useState(
        state === "admin" ? "arijitm717@gmail.com" : "davis@gmail.com",
    );
    const [password, setPassword] = useState("12345678");

    useEffect(() => {
        setEmail(state === "admin" ? "arijitm717@gmail.com" : "davis@gmail.com");
    }, [state]);

    const { loading } = useSelector((store) => store.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (state === "admin") {
                await dispatch(adminLogin({ email, password })).unwrap();
                navigate("/admin-dashboard");
            } else {
                await dispatch(doctorLogin({ email, password })).unwrap();
                navigate("/doctor-dashboard");
            }

            setEmail("");
            setPassword("");
        } catch (error) {
            toast.error("Invalid credentials");
            console.log(error?.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl tracking-tight">Sign in</CardTitle>
                    <CardDescription>
                        Access the clinic console as an admin or doctor.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={state} onValueChange={setState}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="admin">Admin</TabsTrigger>
                            <TabsTrigger value="doctor">Doctor</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter email id"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button type="submit" disabled={loading} className="mt-2 w-full">
                            {loading ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Signing in…
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;