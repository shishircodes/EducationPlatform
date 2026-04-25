export default function LessonItem({ lesson, index, completed, onToggle }) {
  return (
    <li className="flex items-center gap-3 border-b border-line-muted px-4 py-3 last:border-b-0 hover:bg-surface-muted">
      <input
        id={`lesson-${lesson.id}`}
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="h-4 w-4 rounded border-line accent-brand"
      />
      <label
        htmlFor={`lesson-${lesson.id}`}
        className="flex flex-1 items-center justify-between gap-3"
      >
        <span
          className={`text-sm ${
            completed ? "text-fg-subtle line-through" : "text-fg"
          }`}
        >
          <span className="mr-2 text-fg-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
          {lesson.title}
        </span>
        <span className="shrink-0 text-xs text-fg-muted">{lesson.duration}</span>
      </label>
    </li>
  );
}
