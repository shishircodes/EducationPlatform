import Badge from './Badge';
import Button from './Button';
import ProgressBar from './ProgressBar';

export default function CourseCard({ course, progress, onAction, actionLabel }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3">
          <Badge tone="indigo">{course.category}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{course.level}</span>
          <span>{course.duration}</span>
        </div>
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
          {course.title}
        </h3>
        <p className="line-clamp-2 text-sm text-slate-600">{course.description}</p>
        <div className="text-xs text-slate-500">By {course.instructor}</div>

        {typeof progress === 'number' && (
          <ProgressBar value={progress} className="mt-1" />
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="text-sm font-medium text-slate-800">
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </div>
          <Button size="sm" onClick={() => onAction?.(course)}>
            {actionLabel ?? 'View'}
          </Button>
        </div>
      </div>
    </div>
  );
}
