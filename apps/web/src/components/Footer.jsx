import { Link, NavLink } from "react-router-dom";
import { Separator } from "@health/ui";
import Container from "./Container";
import Wordmark from "./Wordmark.jsx";

const FOOTER_LINKS = [
    { label: "Home", to: "/" },
    { label: "About us", to: "/about" },
    { label: "Contact us", to: "/contact" },
    { label: "Privacy policy", to: "/about" },
];

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-border bg-muted/30">
            <Container className="flex flex-col gap-10 py-12">
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <NavLink to={"/"}>
                            <Wordmark />
                        </NavLink>
                        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                            Book trusted doctors in minutes. Verified specialists, transparent
                            pricing, and care that fits your schedule.
                        </p>
                    </div>

                    <div>
                        <h2 className="file-label text-muted-foreground">Company</h2>
                        <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                            {FOOTER_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        onClick={() => scrollTo(0, 0)}
                                        className="transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="file-label text-muted-foreground">Get in touch</h2>
                        <div className="mt-4 flex flex-col gap-2 font-mono text-sm text-muted-foreground">
                            <p>+91 8016075232</p>
                            <p>arijitm717@gmail.com</p>
                        </div>
                    </div>
                </div>

                <Separator />
                <p className="text-center font-mono text-xs text-muted-foreground">
                    Copyright © {new Date().getFullYear()} Health. All rights reserved.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;