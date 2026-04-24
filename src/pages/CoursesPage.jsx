import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../api/mockApi';
import CourseCard from '../components/CourseCard';
import PageHeader from '../components/PageHeader';
import Spinner from '../components/Spinner';
import EmptyState from '../components/EmptyState';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    getCourses().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(courses.map((c) => c.category))],
    [courses]
  );

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesQuery =
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.instructor.toLowerCase().includes(query.toLowerCase());
      const matchesCat = category === 'All' || c.category === category;
      return matchesQuery && matchesCat;
    });
  }, [courses, query, category]);

  return (
    <div>
      <PageHeader
        title="Explore Courses"
        subtitle="Browse our catalog and start learning today."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search courses or instructors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Spinner label="Loading courses..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No courses found"
          description="Try adjusting your search or category filters."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              actionLabel="View"
              onAction={(c) => navigate(`/courses/${c.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
