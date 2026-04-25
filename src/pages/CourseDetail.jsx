import { use } from "react";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import Button from "../components/Button";
import Card, { CardBody, CardHeader } from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import LessonItem from "../components/LessonItem";
import { fetchCourseById } from "../api/mockApi";
import { getResource } from "../api/resourceCache";
import useUserStore from "../store/userStore";
import useCourseProgress from "../hooks/useCourseProgress";

export default function CourseDetail() {
  const { id } = useParams();
  const course = use(getResource(`course:${id}`, () => fetchCourseById(id)));

  const enrollment = useUserStore((s) => s.enrollments[id]);
  const enroll = useUserStore((s) => s.enroll);
  const unenroll = useUserStore((s) => s.unenroll);
  const toggleLesson = useUserStore((s) => s.toggleLesson);

  const enrolled = Boolean(enrollment);
  const { completed, total, pct } = useCourseProgress(id, course?.lessons?.length);
  const completedIds = enrollment?.completedLessons ?? [];

  if (!course) {
    return (
      <div className="py-10 text-center">
        <p className="mb-4 text-sm text-fg-muted">Course not found.</p>
        <Link to="/courses">
          <Button variant="secondary">Back to courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg"
        >
          <FaArrowLeft className="h-3 w-3" />
          All courses
        </Link>
      </div>

      <Card>
        <CardBody>
          <p className="mb-3 text-xs font-medium text-brand">
            {course.category}
          </p>
          <h1 className="mb-2 text-3xl font-semibold tracking-tight text-fg">
            {course.title}
          </h1>
          <p className="mb-4 text-sm text-fg-muted">
            by {course.instructor} &middot; {course.level} &middot;{" "}
            {course.duration} &middot; {course.lessons.length} lessons
          </p>
          <p className="mb-6 text-fg">{course.description}</p>

          {enrolled ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <ProgressBar value={pct} />
                <p className="mt-1 text-xs text-fg-muted">
                  {completed} of {total} lessons completed
                </p>
              </div>
              <Button variant="secondary" onClick={() => unenroll(id)}>
                Unenroll
              </Button>
            </div>
          ) : (
            <Button onClick={() => enroll(id)} size="lg">
              Enroll now
            </Button>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-fg">Course content</h2>
          <p className="text-sm text-fg-muted">
            {enrolled
              ? "Check off lessons as you complete them."
              : "Enroll to track your progress."}
          </p>
        </CardHeader>
        <ul>
          {course.lessons.map((lesson, i) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              index={i}
              completed={completedIds.includes(lesson.id)}
              href={enrolled ? `/courses/${id}/lessons/${lesson.id}` : undefined}
              onToggle={() => {
                if (!enrolled) {
                  toast.info("Please enroll in this course to track lessons.", {
                    toastId: `enroll-required-${id}`,
                  });
                  return;
                }
                toggleLesson(id, lesson.id);
              }}
            />
          ))}
        </ul>
      </Card>
    </div>
  );
}
