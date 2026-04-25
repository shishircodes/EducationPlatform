import { Link } from "react-router";
import Card, { CardBody, CardFooter } from "./Card";
import ProgressBar from "./ProgressBar";
import Button from "./Button";

export default function CourseCard({ course, progress, enrolled }) {
  return (
    <Card className="flex h-full flex-col">
      <CardBody className="flex-1">
        <p className="mb-2 text-xs font-medium text-brand">
          {course.category}
        </p>
        <h3 className="mb-1 text-lg font-semibold text-fg">
          <Link to={`/courses/${course.id}`} className="hover:text-brand">
            {course.title}
          </Link>
        </h3>
        <p className="mb-3 text-sm text-fg-muted">
          by {course.instructor} &middot; {course.level} &middot; {course.duration}
        </p>
        <p className="text-sm text-fg line-clamp-3">{course.description}</p>
      </CardBody>
      <CardFooter className="flex flex-col gap-3">
        {enrolled && typeof progress === "number" && (
          <ProgressBar value={progress} showLabel={false} />
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs text-fg-muted">
            {course.lessonCount ?? course.lessons?.length ?? 0} lessons
          </span>
          <Link to={`/courses/${course.id}`}>
            <Button variant={enrolled ? "secondary" : "primary"} size="sm">
              {enrolled ? "Continue" : "View course"}
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
