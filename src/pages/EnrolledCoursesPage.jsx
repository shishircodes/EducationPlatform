import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getEnrolledCourses } from '../api/mockApi';
import CourseCard from '../components/CourseCard';
import PageHeader from '../components/PageHeader';
import Spinner from '../components/Spinner';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';

export default function EnrolledCoursesPage() {
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    getEnrolledCourses().then((data) => {
      setEnrolled(data);
      setLoading(false);
    });
  }, []);

  const filtered = enrolled.filter((c) => {
    if (filter === 'in-progress') return c.progress > 0 && c.progress < 100;
    if (filter === 'completed') return c.progress === 100;
    return true;
  });

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div>
      <PageHeader
        title="My Learning"
        subtitle="Pick up where you left off."
      />

      <div className="mb-6 flex gap-2 border-b border-slate-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`px-4 py-2 text-sm font-medium transition ${
              filter === t.key
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner label="Loading your courses..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No courses yet"
          description="Browse the catalog and enroll to start learning."
          action={
            <Link to="/courses">
              <Button>Browse Courses</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={course.progress}
              actionLabel={course.progress === 100 ? 'Review' : 'Continue'}
              onAction={(c) => navigate(`/courses/${c.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
