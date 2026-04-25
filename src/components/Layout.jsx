import { Suspense } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GetStartedModal from "./GetStartedModal";
import Spinner from "./Spinner";
import useUserStore from "../store/userStore";

export default function Layout() {
  const getStartedOpen = useUserStore((s) => s.getStartedOpen);

  return (
    <div className="flex min-h-screen flex-col bg-app text-fg">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      {getStartedOpen && <GetStartedModal />}
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
