import { about_image } from "../assets";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Card } from "@health/ui";
import SectionHeading from "../components/SectionHeading";

const features = [
    {
        title: "Efficiency",
        text: "Streamlined appointment scheduling that fits into your busy lifestyle.",
    },
    {
        title: "Convenience",
        text: "Access to a network of trusted healthcare professionals in your area.",
    },
    {
        title: "Personalization",
        text: "Tailored recommendations and reminders to help you stay on top of your health.",
    },
];

const faqs = [
    {
        q: "How do I book an appointment?",
        a: "Browse doctors by speciality, pick a time slot, and confirm. You can pay online or at the clinic.",
    },
    {
        q: "Is my health data secure?",
        a: "Yes. We use industry-standard encryption and never share your data without consent.",
    },
    {
        q: "Can I cancel or reschedule?",
        a: "Absolutely. Open My Appointments to cancel or reschedule anytime before the visit.",
    },
];

const About = () => {
    return (
        <div className="flex flex-col gap-16 py-10">
            <section className="flex flex-col gap-6 lg:flex-row lg:items-center">
                <img
                    src={about_image}
                    alt="About Health"
                    className="w-full max-w-[360px] rounded-2xl object-cover"
                />
                <div className="flex flex-col gap-4 text-sm text-muted-foreground lg:text-base">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        About Health
                    </span>
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                        About <span className="text-primary">Us</span>
                    </h1>
                    <p>
                        Welcome to Health, your trusted partner in managing your healthcare needs
                        conveniently and efficiently. We understand the challenges individuals face
                        when it comes to scheduling doctor appointments and managing their health
                        records.
                    </p>
                    <p>
                        Health is committed to excellence in healthcare technology. We continuously
                        strive to enhance our platform, integrating the latest advancements to
                        improve user experience and deliver superior service.
                    </p>
                    <p className="font-semibold text-foreground">Our Vision</p>
                    <p>
                        Our vision is to create a seamless healthcare experience for every user,
                        bridging the gap between patients and providers.
                    </p>
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <SectionHeading
                    align="left"
                    eyebrow="Why Choose Us"
                    title="Why choose us"
                    subtitle="Everything you need to manage your care in one place."
                />
                <div className="grid gap-4 md:grid-cols-3">
                    {features.map((f) => (
                        <Card
                            key={f.title}
                            className="border-border p-6 transition-colors hover:border-primary/40 hover:bg-primary/5"
                        >
                            <p className="text-lg font-semibold uppercase tracking-tight text-foreground">
                                {f.title}
                            </p>
                            <p className="mt-3 text-sm text-muted-foreground">{f.text}</p>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <SectionHeading align="left" eyebrow="FAQ" title="Frequently asked questions" />
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((item, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger>{item.q}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {item.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    );
};

export default About;