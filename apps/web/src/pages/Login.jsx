import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userSignup } from "../features/user/userSlice";
import { toast } from "sonner";
import { Button, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger } from "@health/ui";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { token, loading } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmitHandler = async (e, mode) => {
        e.preventDefault();
        try {
            if (mode === "login") {
                await dispatch(userLogin({ email, password })).unwrap();
                toast.success("Login successfully");
            } else {
                await dispatch(userSignup({ name, email, password })).unwrap();
                toast.success("Register successfully");
            }
            navigate("/");
        } catch {
            toast.error("Invalid credentials!");
        }
    };

    useEffect(() => {
        if (token) navigate("/");
    }, [token]);

    return (
        <div className="flex min-h-[70vh] items-center justify-center py-10">
            <div className="w-full max-w-sm rounded-lg border border-border bg-popover p-8 shadow-sm">
                <p className="file-label mb-4 text-center text-muted-foreground">Patient access</p>
                <Tabs defaultValue="login" className="w-full">
                    <TabsList variant="line" className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Create Account</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="mt-6">
                        <form
                            onSubmit={(e) => onSubmitHandler(e, "login")}
                            className="flex flex-col gap-4"
                        >
                            <p className="text-sm text-muted-foreground">
                                Please login to book appointment
                            </p>
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="mt-2 w-full" disabled={loading}>
                                {loading ? "Loading..." : "Login"}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="signup" className="mt-6">
                        <form
                            onSubmit={(e) => onSubmitHandler(e, "signup")}
                            className="flex flex-col gap-4"
                        >
                            <p className="text-sm text-muted-foreground">
                                Please sign up to book appointment
                            </p>
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="mt-2 w-full" disabled={loading}>
                                {loading ? "Loading..." : "Create Account"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Login;