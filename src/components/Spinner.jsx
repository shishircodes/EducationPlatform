export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-sm text-fg-muted">
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-brand-soft border-t-brand" />
      <span>{label}</span>
    </div>
  );
}
