import { logo } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../features/admin/adminSlice.js";
import { doctorLogout } from "../features/doctor/doctorSlice.js";
import { Button } from "@health/ui";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider.jsx";

const Navbar = () => {
    const { adminToken } = useSelector((store) => store.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        if (adminToken) dispatch(logout());
        else dispatch(doctorLogout());

        toast.success("Logged out successfully");
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/80 px-3 backdrop-blur-xl sm:px-6 md:px-8">
            <Link
                to={adminToken ? "/admin-dashboard" : "/doctor-dashboard"}
                className="flex items-center gap-2"
            >
                <img src={logo} alt="Health logo" className="size-8" />
                <span className="text-lg font-semibold tracking-tight text-foreground">Health</span>
                <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {adminToken ? "Admin" : "Doctor"}
                </span>
            </Link>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="size-9 rounded-full"
                >
                    {theme === "dark" ? (
                        <Sun className="size-[18px]" />
                    ) : (
                        <Moon className="size-[18px]" />
                    )}
                </Button>

                <Button variant="outline" onClick={handleLogout} className="text-sm">
                    Logout
                </Button>
            </div>
        </header>
    );
};

export default Navbar;