import { Link } from "react-router";

export default function LessonItem({
  lesson,
  index,
  completed,
  onToggle,
  href,
}) {
  const numberLabel = String(index + 1).padStart(2, "0");

  const titleContent = (
    <span
      className={`text-sm ${
        completed ? "text-fg-subtle line-through" : "text-fg"
      }`}
    >
      <span className="mr-2 text-fg-subtle">{numberLabel}</span>
      {lesson.title}
    </span>
  );

  return (
    <li className="flex items-center gap-3 border-b border-line-muted px-4 py-3 last:border-b-0 hover:bg-surface-muted">
      <input
        id={`lesson-${lesson.id}`}
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="h-4 w-4 rounded border-line accent-brand"
      />
      <div className="flex flex-1 items-center justify-between gap-3">
        {href ? (
          <Link to={href} className="hover:underline">
            {titleContent}
          </Link>
        ) : (
          <label
            htmlFor={`lesson-${lesson.id}`}
            className="cursor-pointer"
          >
            {titleContent}
          </label>
        )}
        <span className="shrink-0 text-xs text-fg-muted">
          {lesson.duration}
        </span>
      </div>
    </li>
  );
}
