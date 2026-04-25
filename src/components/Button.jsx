const variants = {
  primary:
    "bg-brand text-brand-fg hover:bg-brand-hover disabled:bg-line disabled:text-fg-subtle",
  ink: "bg-ink text-ink-fg hover:bg-ink-hover",
  secondary:
    "bg-surface text-fg border border-line hover:bg-surface-muted",
  ghost: "bg-transparent text-fg hover:bg-surface-muted",
  danger:
    "bg-surface text-danger border border-line hover:bg-danger-soft hover:border-danger",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed  cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
