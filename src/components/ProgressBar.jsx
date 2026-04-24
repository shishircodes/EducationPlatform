export default function ProgressBar({ value = 0, showLabel = true, className = '' }) {
  const pct = Math.max(0, Math.min(100, value));
  const color =
    pct === 100 ? 'bg-green-500' : pct >= 50 ? 'bg-indigo-500' : 'bg-amber-500';

  return (
    <div className={className}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 flex justify-between text-xs text-slate-600">
          <span>{pct}% complete</span>
          {pct === 100 && <span className="text-green-600 font-medium">Done</span>}
        </div>
      )}
    </div>
  );
}
