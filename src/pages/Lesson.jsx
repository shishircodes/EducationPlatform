import { use } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import Button from "../components/Button";
import Card, { CardBody, CardHeader } from "../components/Card";
import { fetchCourseById } from "../api/mockApi";
import { getResource } from "../api/resourceCache";
import useUserStore from "../store/userStore";

// Same placeholder video used for every lesson for prototype
const PLACEHOLDER_VIDEO_ID = "Y-x0efG1seA";

export default function Lesson() {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const course = use(getResource(`course:${id}`, () => fetchCourseById(id)));

  const enrollment = useUserStore((s) => s.enrollments[id]);
  const markLessonComplete = useUserStore((s) => s.markLessonComplete);

  if (!course) return <NotFoundFallback message="Course not found." />;

  const lessonIndex = course.lessons.findIndex((l) => l.id === lessonId);
  const lesson = course.lessons[lessonIndex];

  if (!lesson) return <NotFoundFallback message="Lesson not found." />;

  const enrolled = Boolean(enrollment);
  if (!enrolled) return <EnrollPrompt courseId={id} />;

  const prevLesson = course.lessons[lessonIndex - 1] ?? null;
  const nextLesson = course.lessons[lessonIndex + 1] ?? null;
  const isCompleted = enrollment.completedLessons.includes(lesson.id);
  const isLastLesson = nextLesson === null;

  const handleNext = () => {
    markLessonComplete(id, lesson.id);
    if (nextLesson) {
      navigate(`/courses/${id}/lessons/${nextLesson.id}`);
    } else {
      toast.success("Course complete! Nice work.");
      navigate(`/courses/${id}`);
    }
  };

  const handlePrevious = () => {
    if (prevLesson) {
      navigate(`/courses/${id}/lessons/${prevLesson.id}`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          to={`/courses/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg"
        >
          <FaArrowLeft className="h-3 w-3" />
          {course.title}
        </Link>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-line bg-black">
        <iframe
          key={lesson.id}
          src={`https://www.youtube.com/embed/${PLACEHOLDER_VIDEO_ID}`}
          title={lesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>

      <Card>
        <CardHeader>
          <p className="text-xs font-medium text-fg-muted">
            Lesson {lessonIndex + 1} of {course.lessons.length} &middot;{" "}
            {lesson.duration}
            {isCompleted && (
              <span className="ml-2 text-success">&middot; Completed</span>
            )}
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-fg">
            {lesson.title}
          </h1>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-fg-muted">
            This is a sample description. Every lesson has same video at the moment.
          </p>
        </CardBody>
      </Card>

      <LessonNav
        prevLesson={prevLesson}
        nextLesson={nextLesson}
        isLastLesson={isLastLesson}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}

//Sub-components 

function LessonNav({ prevLesson, nextLesson, isLastLesson, onPrevious, onNext }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={!prevLesson}
        className="gap-2"
      >
        <FaArrowLeft className="h-3 w-3" />
        Previous
      </Button>

      <Button onClick={onNext} className="gap-2">
        {isLastLesson ? (
          <>
            Finish course <FaCheckCircle />
          </>
        ) : (
          <>
            Next <FaArrowRight className="h-3 w-3" />
          </>
        )}
      </Button>
    </div>
  );
}

function EnrollPrompt({ courseId }) {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-sm text-fg-muted">
        You need to enroll in this course before viewing lessons.
      </p>
      <Link to={`/courses/${courseId}`}>
        <Button>Go to course page</Button>
      </Link>
    </div>
  );
}

function NotFoundFallback({ message }) {
  return (
    <div className="py-10 text-center">
      <p className="mb-4 text-sm text-fg-muted">{message}</p>
      <Link to="/courses">
        <Button variant="secondary">Back to courses</Button>
      </Link>
    </div>
  );
}
