export default function StatCard({ label, value, hint, tone = 'indigo' }) {
  const tones = {
    indigo: 'text-indigo-600',
    green: 'text-green-600',
    amber: 'text-amber-600',
    slate: 'text-slate-700',
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className={`mt-2 text-3xl font-semibold ${tones[tone]}`}>{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}
