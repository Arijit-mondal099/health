import { cn } from "@health/ui";

const SectionHeading = ({ title, subtitle, align = "center", eyebrow, className = "" }) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-2",
                align === "center" ? "items-center text-center" : "items-start text-left",
                className,
            )}
        >
            {eyebrow && (
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {eyebrow}
                </span>
            )}
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {title}
            </h2>
            {subtitle && <p className="max-w-md text-sm text-muted-foreground">{subtitle}</p>}
        </div>
    );
};

export default SectionHeading;