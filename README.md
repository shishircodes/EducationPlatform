# Learn-to-Dev | Education Platform

Modern Education Platform Frontend built to provide a responsive, web-based educational interface for discovering courses, tracking enrollment status and displaying student/learners progression. The application will replicate an actual learning environment that allows students to view and select available course offerings and enroll into those selected courses, complete individual lessons within each selected course and track their progression within a personalized dashboard.

## Project Overview

learn-to-Dev is a react web application, which was created as part of the ICT930 Advanced Web Application Development project. As such it represents a solution to the **Education/Training Platform** use case by providing the following functionality:

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
   Ensure you have [Node.js](https://nodejs.org), **npm**, and [Git](https://git-scm.com) installed on your machine.

2. **Clone the Repository**
   ```bash
   git clone https://github.com
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