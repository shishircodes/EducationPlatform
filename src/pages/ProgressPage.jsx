import { useEffect, useState } from 'react';
import { getProgressSummary } from '../api/mockApi';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import Spinner from '../components/Spinner';

export default function ProgressPage() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getProgressSummary().then(setSummary);
  }, []);

  if (!summary) return <Spinner label="Calculating your progress..." />;

  return (
    <div>
      <PageHeader
        title="My Progress"
        subtitle="Track your learning journey across all enrolled courses."
      />

      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Enrolled Courses"
          value={summary.totalCourses}
          tone="indigo"
        />
        <StatCard
          label="Completed"
          value={summary.completed}
          tone="green"
          hint={`${summary.inProgress} in progress`}
        />
        <StatCard
          label="Average Progress"
          value={`${summary.avgProgress}%`}
          tone="amber"
        />
        <StatCard
          label="Lessons Completed"
          value={summary.totalLessonsCompleted}
          tone="slate"
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Course Progress Breakdown
          </h2>
        </div>
        <ul className="divide-y divide-slate-200">
          {summary.enrolled.map((c) => (
            <li
              key={c.id}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center"
            >
              <img
                src={c.thumbnail}
                alt=""
                className="h-16 w-24 flex-shrink-0 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-medium text-slate-900">
                    {c.title}
                  </h3>
                  {c.progress === 100 && <Badge tone="green">Completed</Badge>}
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {c.completedLessons}/{c.lessons} lessons · Last accessed{' '}
                  {c.lastAccessed}
                </p>
                <div className="mt-2">
                  <ProgressBar value={c.progress} showLabel={false} />
                </div>
              </div>
              <div className="w-16 text-right text-sm font-semibold text-slate-700">
                {c.progress}%
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
