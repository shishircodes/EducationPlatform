import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourseById } from '../api/mockApi';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Spinner from '../components/Spinner';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourseById(id).then((c) => {
      setCourse(c);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Spinner label="Loading course..." />;
  if (!course)
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold">Course not found</h2>
        <Link to="/courses" className="mt-3 inline-block text-indigo-600 hover:underline">
          ← Back to courses
        </Link>
      </div>
    );

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Link to="/courses" className="text-sm text-indigo-600 hover:underline">
          ← Back to courses
        </Link>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="aspect-video w-full rounded-xl object-cover shadow"
        />
        <div>
          <div className="flex gap-2">
            <Badge tone="indigo">{course.category}</Badge>
            <Badge>{course.level}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">{course.title}</h1>
          <p className="mt-2 text-slate-600">{course.description}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <span>👨‍🏫 {course.instructor}</span>
          <span>⏱ {course.duration}</span>
          <span>📚 {course.lessons} lessons</span>
          <span>⭐ {course.rating} ({course.students.toLocaleString()} students)</span>
        </div>
      </div>
      <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-3xl font-bold text-slate-900">
          {course.price === 0 ? 'Free' : `$${course.price}`}
        </div>
        <Button className="mt-4 w-full" size="lg">
          Enroll Now
        </Button>
        <Button variant="outline" className="mt-2 w-full">
          Add to Wishlist
        </Button>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {course.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </aside>
    </div>
  );
}
