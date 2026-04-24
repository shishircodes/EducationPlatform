import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import EnrolledCoursesPage from './pages/EnrolledCoursesPage';
import ProgressPage from './pages/ProgressPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/enrolled" element={<EnrolledCoursesPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route
            path="*"
            element={
              <div className="py-16 text-center text-slate-600">
                <h1 className="text-2xl font-semibold">404 — Page not found</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
