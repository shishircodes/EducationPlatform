import { courses, enrollments } from './mockData';

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function getCourses() {
  await delay();
  return [...courses];
}

export async function getCourseById(id) {
  await delay(200);
  return courses.find((c) => c.id === id) ?? null;
}

export async function getEnrolledCourses() {
  await delay();
  return enrollments
    .map((e) => {
      const course = courses.find((c) => c.id === e.courseId);
      return course ? { ...course, ...e } : null;
    })
    .filter(Boolean);
}

export async function getProgressSummary() {
  await delay();
  const enrolled = await getEnrolledCourses();
  const totalCourses = enrolled.length;
  const completed = enrolled.filter((e) => e.progress === 100).length;
  const inProgress = enrolled.filter((e) => e.progress > 0 && e.progress < 100).length;
  const avgProgress = totalCourses
    ? Math.round(enrolled.reduce((s, e) => s + e.progress, 0) / totalCourses)
    : 0;
  const totalLessonsCompleted = enrolled.reduce((s, e) => s + e.completedLessons, 0);
  return {
    totalCourses,
    completed,
    inProgress,
    avgProgress,
    totalLessonsCompleted,
    enrolled,
  };
}
