import { cn } from "@health/ui";

const EmptyState = ({ icon: Icon, title, className, children }) => {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-20 text-center",
                className,
            )}
        >
            {Icon && <Icon className="size-10 text-muted-foreground" />}
            <p className="file-label text-muted-foreground">{title}</p>
            {children}
        </div>
    );
};

export default EmptyState;