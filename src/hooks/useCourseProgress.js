import useUserStore from "../store/userStore";

export default function useCourseProgress(courseId, lessonCount) {
  const enrollment = useUserStore((s) => s.enrollments[courseId]);
  const completed = enrollment?.completedLessons?.length ?? 0;
  const total = lessonCount ?? 0;
  const pct = total > 0 ? (completed / total) * 100 : 0;
  return { completed, total, pct, enrollment };
}
