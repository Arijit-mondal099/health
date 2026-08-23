import { useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../features/user/userSlice.js";
import { toast } from "sonner";
import { cn } from "@health/ui";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Drawer,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from "@health/ui";
import { useTheme } from "../theme/ThemeProvider.jsx";
import Container from "./Container.jsx";
import Wordmark from "./Wordmark.jsx";

const NAV_LINKS = [
    { to: "/", label: "Home" },
    { to: "/doctors", label: "All Doctors" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

const Navbar = () => {
    const { token, userData } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { theme, toggleTheme } = useTheme();

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
        toast.success("Logout successfully");
    };

    useEffect(() => {
        if (token) {
            dispatch(getUser());
        }
    }, [token, dispatch]);

    const initials = userData?.name
        ?.split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
            <Container>
                <nav className="flex h-16 items-center justify-between">
                    <NavLink
                        to={"/"}
                        onClick={() => scrollTo(0, 0)}
                        className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <Wordmark />
                    </NavLink>

                    <div className="hidden items-center gap-1 md:flex">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => scrollTo(0, 0)}
                                className={({ isActive }) =>
                                    cn(
                                        "border-b-2 px-3.5 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "border-primary text-primary"
                                            : "border-transparent text-muted-foreground hover:text-foreground",
                                    )
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="size-9"
                        >
                            {theme === "dark" ? (
                                <Sun className="size-[18px]" />
                            ) : (
                                <Moon className="size-[18px]" />
                            )}
                        </Button>

                        {token ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                    <Avatar className="size-9 border border-border">
                                        <AvatarImage src={userData?.image} alt={userData?.name} />
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {initials || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onSelect={() => navigate("/my-profile")}>
                                        My Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => navigate("/my-appointments")}>
                                        My Appointments
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onSelect={logoutHandler}
                                        className="text-destructive focus:text-destructive"
                                    >
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button
                                onClick={() => navigate("/login")}
                                variant="outline"
                                className="hidden h-9 md:inline-flex"
                            >
                                Login
                            </Button>
                        )}

                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-9 md:hidden"
                                    aria-label="Open menu"
                                >
                                    <Menu className="size-5" />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="md:hidden">
                                <DrawerClose asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-4 top-4 size-8"
                                        aria-label="Close menu"
                                    >
                                        <X className="size-5" />
                                    </Button>
                                </DrawerClose>
                                <DrawerHeader>
                                    <DrawerTitle className="file-label text-muted-foreground">
                                        Menu
                                    </DrawerTitle>
                                    <DrawerDescription>Navigate the app</DrawerDescription>
                                </DrawerHeader>
                                <div className="flex flex-col gap-1 px-4 pb-8">
                                    {NAV_LINKS.map((link) => (
                                        <DrawerClose asChild key={link.to}>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-base"
                                                onClick={() => {
                                                    scrollTo(0, 0);
                                                    navigate(link.to);
                                                }}
                                            >
                                                {link.label}
                                            </Button>
                                        </DrawerClose>
                                    ))}
                                    {!token && (
                                        <DrawerClose asChild>
                                            <Button
                                                className="mt-2 w-full"
                                                onClick={() => navigate("/login")}
                                            >
                                                Login
                                            </Button>
                                        </DrawerClose>
                                    )}
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Navbar;