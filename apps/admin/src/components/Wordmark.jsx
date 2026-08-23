const Wordmark = ({ className = "" }) => {
    return (
        <span className={`flex items-center gap-2 ${className}`}>
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-7 rounded-[7px] bg-primary p-1 text-primary-foreground"
            >
                <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" fill="currentColor" />
            </svg>
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                Health
            </span>
        </span>
    );
};

export default Wordmark;