export default function ProgressBar({ value = 0, showLabel = true, className = "" }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={className}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-xs text-fg-muted">
          <span>Progress</span>
          <span className="font-medium text-fg">{pct}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-brand-soft">
        <div
          className="h-full bg-brand transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
