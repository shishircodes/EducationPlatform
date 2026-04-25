export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
      <h3 className="text-base font-semibold text-fg">{title}</h3>
      {description && (
        <p className="mx-auto mt-1 max-w-md text-sm text-fg-muted">{description}</p>
      )}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
