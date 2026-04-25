import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      name: "",
      email: "",
      enrollments: {},
      getStartedOpen: false,

      isLoggedIn: () => Boolean(get().name),

      login: ({ name, email }) => {
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        if (!trimmedName || !trimmedEmail) return;
        set({
          name: trimmedName,
          email: trimmedEmail,
          getStartedOpen: false,
        });
      },

      resetUserData: () =>
        set({ name: "", email: "", enrollments: {} }),

      openGetStarted: () => set({ getStartedOpen: true }),
      closeGetStarted: () => set({ getStartedOpen: false }),

      isEnrolled: (courseId) => Boolean(get().enrollments[courseId]),

      enroll: (courseId) =>
        set((s) => {
          if (!s.name) return { getStartedOpen: true };
          if (s.enrollments[courseId]) return s;
          return {
            enrollments: {
              ...s.enrollments,
              [courseId]: {
                enrolledAt: new Date().toISOString(),
                completedLessons: [],
              },
            },
          };
        }),

      unenroll: (courseId) =>
        set((s) => {
          const next = { ...s.enrollments };
          delete next[courseId];
          return { enrollments: next };
        }),

      toggleLesson: (courseId, lessonId) =>
        set((s) => {
          const current = s.enrollments[courseId];
          if (!current) return s;
          const done = current.completedLessons.includes(lessonId)
            ? current.completedLessons.filter((id) => id !== lessonId)
            : [...current.completedLessons, lessonId];
          return {
            enrollments: {
              ...s.enrollments,
              [courseId]: { ...current, completedLessons: done },
            },
          };
        }),

      // Marks a lesson complete (idempotent — never un-completes).
      markLessonComplete: (courseId, lessonId) =>
        set((s) => {
          const current = s.enrollments[courseId];
          if (!current) return s;
          if (current.completedLessons.includes(lessonId)) return s;
          return {
            enrollments: {
              ...s.enrollments,
              [courseId]: {
                ...current,
                completedLessons: [...current.completedLessons, lessonId],
              },
            },
          };
        }),
    }),
    {
      name: "edu-platform-user-v1",
      partialize: (s) => ({
        name: s.name,
        email: s.email,
        enrollments: s.enrollments,
      }),
    }
  )
);

export default useUserStore;

export const useEnrollments = () => useUserStore((s) => s.enrollments);
export const useUserName = () => useUserStore((s) => s.name);
export const useIsLoggedIn = () => useUserStore((s) => Boolean(s.name));
