import { use } from "react";
import { Link, Navigate } from "react-router";
import Card, { CardBody } from "../components/Card";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import EmptyState from "../components/EmptyState";
import { fetchCourses } from "../api/mockApi";
import { getResource } from "../api/resourceCache";
import useUserStore from "../store/userStore";

export default function Dashboard() {
  const name = useUserStore((s) => s.name);
  const enrollments = useUserStore((s) => s.enrollments);
  const resetUserData = useUserStore((s) => s.resetUserData);

  const courses = use(getResource("courses", fetchCourses));

  // Anyone reaching the dashboard without a name is redirected home.
  if (!name) return <Navigate to="/" replace />;

  const myCourses = buildMyCourses(courses, enrollments);
  const stats = buildStats(myCourses);

  const handleDeleteData = () => {
    const confirmed = window.confirm(
      "Delete all your local data? This will remove your name, enrollments, and progress."
    );
    if (confirmed) resetUserData();
  };

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader name={name} />

      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Enrolled" value={stats.enrolledCount} />
        <StatCard label="In progress" value={stats.inProgressCount} />
        <StatCard label="Completed" value={stats.completedCount} />
        <StatCard
          label="Lessons done"
          value={`${stats.completedLessons}/${stats.totalLessons}`}
        />
      </section>

      <MyCoursesSection myCourses={myCourses} />

      <DangerZone onDelete={handleDeleteData} />
    </div>
  );
}


// Combine the raw course list with the user's enrollment data so each item
// already carries its own progress percentage and enrollment record.
function buildMyCourses(courses, enrollments) {
  return courses
    .filter((course) => enrollments[course.id])
    .map((course) => {
      const enrollment = enrollments[course.id];
      const completedCount = enrollment.completedLessons.length;
      const pct = course.lessonCount
        ? (completedCount / course.lessonCount) * 100
        : 0;
      return { ...course, enrollment, pct };
    });
}


function buildStats(myCourses) {
  const totalLessons = myCourses.reduce(
    (sum, course) => sum + (course.lessonCount ?? 0),
    0
  );
  const completedLessons = myCourses.reduce(
    (sum, course) => sum + course.enrollment.completedLessons.length,
    0
  );

  return {
    enrolledCount: myCourses.length,
    inProgressCount: myCourses.filter((c) => c.pct > 0 && c.pct < 100).length,
    completedCount: myCourses.filter((c) => c.pct === 100).length,
    totalLessons,
    completedLessons,
  };
}

function getCtaLabel(pct) {
  if (pct === 100) return "Review";
  if (pct > 0) return "Continue";
  return "Start";
}

function DashboardHeader({ name }) {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-fg">
        Welcome back, {name}
      </h1>
      <p className="mt-1 text-sm text-fg-muted">Your learning at a glance.</p>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <Card>
      <CardBody>
        <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
          {label}
        </p>
        <p className="mt-1 text-3xl font-semibold text-fg">{value}</p>
      </CardBody>
    </Card>
  );
}

function MyCoursesSection({ myCourses }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-fg">
        My courses
      </h2>

      {myCourses.length === 0 ? (
        <EmptyState
          title="No enrollments yet"
          description="Browse the catalog and enroll in a course to start tracking your progress."
          action={
            <Link to="/courses">
              <Button>Browse courses</Button>
            </Link>
          }
        />
      ) : (
        <div className="flex flex-col gap-4">
          {myCourses.map((course) => (
            <EnrolledCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}

function EnrolledCourseCard({ course }) {
  const completedCount = course.enrollment.completedLessons.length;
  const isComplete = course.pct === 100;

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="mb-2 text-xs font-medium text-brand">
              {course.category}
              {isComplete && (
                <span className="ml-2 text-success">&middot; Completed</span>
              )}
            </p>

            <h3 className="text-lg font-semibold text-fg">
              <Link to={`/courses/${course.id}`} className="hover:text-brand">
                {course.title}
              </Link>
            </h3>
            <p className="text-sm text-fg-muted">
              by {course.instructor} &middot; {course.level}
            </p>
          </div>

          <Link to={`/courses/${course.id}`}>
            <Button variant="secondary">{getCtaLabel(course.pct)}</Button>
          </Link>
        </div>

        <div className="mt-4">
          <ProgressBar value={course.pct} />
          <p className="mt-1 text-xs text-fg-muted">
            {completedCount} of {course.lessonCount} lessons
          </p>
        </div>
      </CardBody>
    </Card>
  );
}

function DangerZone({ onDelete }) {
  return (
    <section className="mt-4 border-t border-line pt-6">
      <h2 className="mb-1 text-sm font-semibold text-fg">Danger zone</h2>
      <p className="mb-3 text-xs text-fg-muted">
        Remove your name, enrollments, and progress from this device to start fresh.
      </p>
      <Button variant="danger" size="sm" onClick={onDelete}>
        Delete user data
      </Button>
    </section>
  );
}
