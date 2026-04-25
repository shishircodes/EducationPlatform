// This is here for this assignment only. I know it is critical to put this in .env file
const BASE_URL = "https://69ea242515c7e2d5126961c6.mockapi.io/api";

export async function fetchCourses() {
  try {
    const response = await fetch(`${BASE_URL}/courses`);

    const courses = await response.json();

    if (!Array.isArray(courses) || courses.length === 0) {
      return [];
    }

    return courses.map((course) => ({
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      level: course.level,
      duration: course.duration,
      category: course.category,
      description: course.description,
      lessonCount: course.lessons?.length ?? 0,
    }));
  } catch (error) {
    console.error("Network error while fetching courses:", error);
    return [];
  }
}

export async function fetchCourseById(id) {
  try {
    const response = await fetch(`${BASE_URL}/courses?id=${id}`);
    const matches = await response.json();
    return matches[0] ?? null;
  } catch (error) {
    console.error(`Network error while fetching course ${id}:`, error);
    return null;
  }
}

//This function just logs new users to mockAPI json. It has no use in the app.
export async function createUser({ name, email }) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create user (${response.status})`);
  }

  return response.json();
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${BASE_URL}/courses`);
    const courses = await response.json();

    if (!Array.isArray(courses)) {
      return [];
    }

    const categories = courses.map((course) => course.category);
    return [...new Set(categories)];
  } catch (error) {
    console.error("Network error while fetching categories:", error);
    return [];
  }
}
