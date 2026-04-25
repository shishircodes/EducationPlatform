# Learn-to-Dev | Education Platform

## Live Link https://learntodev.vercel.app/

The Frontend of Modern Education Platform is a web-based interactive educational interface for students to find and enroll in courses, track enrollment status, and see their progression. This app will create a real learning environment that will help students view and select available courses and then enroll into those chosen courses, study their material in each chosen course and also monitor their progress in an individual dashboard.

## Project Overview

learn-to-Dev is a react web application, which was created as part of the ICT930 Advanced Web Application Development project. It represents a solution to the **Education/Training Platform** use case by providing the following functionality:

- A filtered/searchable course catalog
- Detailed information about specific courses including individual lesson breakdowns 
- User ability to register/enroll into courses and track individual lesson progress 
- Personalized Dashboard displaying aggregated metrics
- Persistent user sessions via local storage

## Technology Stack

- React 19 - Javacript library
- Vite - Build tool
- TailwindCSS - Theme and Styling
- React-Router - Client navigation
- Zustand - Client-side State Management
- React-icons - Icon Pack
- React-Toastify - For popup to notify user
- Mock API - Data source

## Installation Instructions

1. **Prerequisites**
   Ensure you have [Node.js](https://nodejs.org), **npm**, and [Git](https://git-scm.com) installed on your computer.

2. **Clone the Repository**
   ```bash
   git clone https://github.com/shishircodes/EducationPlatform.git
   ```

3. **Navigate to the Directory**
   ```bash
   cd EducationPlatform
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Run the Application**
   ```bash
   npm run dev
   ```

## Key Features

- Multi-page Navigation - Client side routing using react-router across Home, courses, course detail and dashboard
- Course Discovery - List of course is fetched asynchronously along with features like search and category filters
- Enrollment System - Users register using their name and email via a global modal and enroll in courses. Enrollment state is persisted in localStorage of the browser.
- Progress Tracking - User can tick off the completed course which results in progress bar and percentage tracker being updated.
- User Dashboard - All the user stats about course progression is displayed with visual progress indicators.
- Responsive Design - This web app supports all display sizes from phones to large desktop monitors.
- Loading and Empty States - The webapp uses Suspense to manage loading state. It has Spinners, empty state illustrations and error handling for all async operations.
- Persistent Sessions - Zustand's persist middleware save the user data to localStorage of browser automatically.

## Design Decisions

- Component Architecture - UI components (Button, Card, Badge, Spinner) are seperated from feature components (CourseCard, LessionItem) and Layout shells (Navbar, Footer, Layout) which promotes the reusability and enhances good system design practices.
- State Management - Zustand was selected for state management because of its minimal API and excellent DX. The zustand store handles authentication, enrollments and course progression in one centralized place.
- Data Layer - A dedicated /api module is developed to make MOCKApi calls returning objects and handling all errors so that UI never crashes on a failed request to MOCKApi.io server.
- Styling - Tailwind CSS is used for styling of this web application because of its utility first styling that keeps component files co-located with their styles and makes sure there is consistent spacing and colour schemes through custom theme variables.
- Accessibility - This web application has used semantic HTML elements and aria labels are used through out different areas of web app. The global modal traps focus can also be closed using a escape key or overlay click.