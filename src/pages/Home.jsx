import { use } from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import Button from "../components/Button";
import CourseCard from "../components/CourseCard";
import { fetchCourses } from "../api/mockApi";
import { getResource } from "../api/resourceCache";
import useUserStore from "../store/userStore";

export default function Home() {
  const courses = use(getResource("courses", fetchCourses)).slice(0, 3);
  const enrollments = useUserStore((s) => s.enrollments);
  const name = useUserStore((s) => s.name);
  const openGetStarted = useUserStore((s) => s.openGetStarted);
  const loggedIn = Boolean(name);

  const enrolledCount = Object.keys(enrollments).length;

  return (
    <div className="flex flex-col gap-20">
      <section className="pt-6">
        <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-fg sm:text-6xl">
          Learn at your own pace,{" "}
          <span className="text-brand">build for real.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-fg-muted">
          Browse curated courses, enroll with a click, and track your progress
          lesson by lesson. Your progress is saved on this device.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/courses">
            <Button size="lg">Browse courses</Button>
          </Link>
          {loggedIn ? (
            <Link to="/dashboard">
              <Button variant="secondary" size="lg">
                My dashboard ({enrolledCount})
              </Button>
            </Link>
          ) : (
            <Button variant="ink" size="lg" onClick={openGetStarted} className="gap-2">
              Start Learning <FaArrowRight />
            </Button>
          )}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-fg">
              Featured courses
            </h2>
            <p className="text-sm text-fg-muted">Popular starting points</p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
          >
            View all
            <FaArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              enrolled={Boolean(enrollments[c.id])}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
