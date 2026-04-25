import { use, useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import CourseCard from "../components/CourseCard";
import { fetchCourses, fetchCategories } from "../api/mockApi";
import { getResource } from "../api/resourceCache";
import useUserStore from "../store/userStore";

export default function Courses() {
  const courses = use(getResource("courses", fetchCourses));
  const categories = ["All", ...use(getResource("categories", fetchCategories))];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const enrollments = useUserStore((s) => s.enrollments);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      const matchesCat = category === "All" || c.category === category;
      return matchesQ && matchesCat;
    });
  }, [courses, query, category]);

  const progressFor = (courseId, lessonCount) => {
    const e = enrollments[courseId];
    if (!e || !lessonCount) return 0;
    return (e.completedLessons.length / lessonCount) * 100;
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-fg">
          All courses
        </h1>
        <p className="text-sm text-fg-muted">
          Filter, search, and enroll in any course below.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses..."
          className="w-full rounded-full border border-line bg-surface px-4 py-2 text-sm text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft sm:max-w-xs"
        />

        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="cursor-pointer appearance-none rounded-full border border-line bg-surface py-2 pl-4 pr-10 text-sm font-medium text-fg focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All categories" : c}
              </option>
            ))}
          </select>
          <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-fg-muted" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-fg-muted">
          No courses match your filters.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              enrolled={Boolean(enrollments[c.id])}
              progress={progressFor(c.id, c.lessonCount)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
