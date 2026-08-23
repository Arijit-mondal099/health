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
                <span
                    className={cn(
                        "flex w-full items-center gap-3",
                        align === "center" ? "justify-center" : "justify-start",
                    )}
                >
                    {align === "center" && <span className="h-px flex-1 bg-border" />}
                    <span className="file-label whitespace-nowrap text-primary">{eyebrow}</span>
                    <span
                        className={cn("h-px bg-border", align === "center" ? "flex-1" : "w-16")}
                    />
                </span>
            )}
            <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {title}
            </h2>
            {subtitle && <p className="max-w-md text-sm text-muted-foreground">{subtitle}</p>}
        </div>
    );
};

export default SectionHeading;