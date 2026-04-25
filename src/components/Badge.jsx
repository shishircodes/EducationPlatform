const variants = {
  default: "bg-surface-muted text-fg border border-line",
  brand: "bg-brand-soft text-brand border border-transparent",
  success: "bg-success-soft text-success border border-transparent",
  warning: "bg-warning-soft text-warning border border-transparent",
  danger: "bg-danger-soft text-danger border border-transparent",
};

export default function Badge({
  children,
  variant = "default",
  dot = false,
  className = "",
}) {
  const dotColor = {
    default: "bg-fg-subtle",
    brand: "bg-brand",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />}
      {children}
    </span>
  );
}
