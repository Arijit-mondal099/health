import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, cn } from "@health/ui";
import { ArrowLeftRight, CalendarDays, LayoutDashboard, User, UserPlus, Users } from "lucide-react";

const ADMIN_LINKS = [
    { to: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/appointments", label: "Appointments", icon: CalendarDays },
    { to: "/add-doctor", label: "Add Doctor", icon: UserPlus },
    { to: "/doctors-list", label: "Doctors List", icon: Users },
];

const DOCTOR_LINKS = [
    { to: "/doctor-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/doctor-appointments", label: "Appointments", icon: CalendarDays },
    { to: "/doctor-profile", label: "Profile", icon: User },
];

const WEB_URL = import.meta.env.VITE_WEB_URL || "http://localhost:5173";

const SidebarLink = ({ to, label, icon: Icon, isActive }) => (
    <NavLink
        to={to}
        className={cn(
            "flex items-center justify-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors md:justify-start",
            isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
        )}
    >
        <Icon className="size-5 shrink-0" />
        <span className="hidden md:inline">{label}</span>
    </NavLink>
);

const Sidebar = () => {
    const { adminToken } = useSelector((store) => store.admin);

    const links = adminToken ? ADMIN_LINKS : DOCTOR_LINKS;

    return (
        <aside className="sticky top-14 flex h-[calc(100vh-3.5rem)] w-16 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-2 md:w-60">
            <nav className="flex flex-col gap-1">
                {links.map((link) => (
                    <SidebarLink key={link.to} {...link} />
                ))}
            </nav>

            <div className="mt-auto p-1">
                <Button
                    variant="outline"
                    asChild
                    className="w-full justify-center gap-3 md:justify-start"
                >
                    <a href={WEB_URL}>
                        <ArrowLeftRight className="size-5 shrink-0" />
                        <span className="hidden md:inline">Switch to main site</span>
                    </a>
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;