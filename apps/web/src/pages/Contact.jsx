import { useState } from "react";
import { contact_image } from "../assets";
import { Button, Input, Label, Separator, Textarea } from "@health/ui";
import { toast } from "sonner";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const onSubmit = (e) => {
        e.preventDefault();
        toast.success("Thanks! We'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="flex flex-col gap-12 py-10">
            <h1 className="text-center font-display text-4xl font-medium tracking-tight text-foreground">
                Contact <span className="text-primary">Us</span>
            </h1>

            <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
                <img
                    src={contact_image}
                    alt="Contact Health"
                    className="w-full max-w-[400px] rounded-2xl object-cover"
                />

                <div className="flex w-full max-w-md flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <p className="file-label text-foreground">Our office</p>
                        <p className="text-sm text-muted-foreground">
                            54709 Willms Station
                            <br />
                            Suite 350, Washington, USA
                        </p>
                        <Separator />
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-baseline gap-2">
                                <span className="text-muted-foreground">Tel</span>
                                <span className="dot-leader" />
                                <span className="font-mono">+91 8016075232</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-muted-foreground">Email</span>
                                <span className="dot-leader" />
                                <span className="font-mono">arijitm717@gmail.com</span>
                            </div>
                        </div>
                        <Separator />
                        <p className="file-label text-foreground">Careers at Health</p>
                        <p className="text-sm text-muted-foreground">
                            Learn more about our teams and job openings.
                        </p>
                        <Button variant="outline" className="w-fit">
                            Explore Jobs
                        </Button>
                    </div>

                    <form
                        onSubmit={onSubmit}
                        className="flex flex-col gap-4 rounded-lg border border-border bg-popover p-6"
                    >
                        <p className="file-label text-foreground">Send us a message</p>
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="c-name">Name</Label>
                            <Input
                                id="c-name"
                                value={form.name}
                                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="c-email">Email</Label>
                            <Input
                                id="c-email"
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="c-message">Message</Label>
                            <Textarea
                                id="c-message"
                                rows={4}
                                value={form.message}
                                onChange={(e) =>
                                    setForm((p) => ({ ...p, message: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <Button type="submit" className="w-fit">
                            Send message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;