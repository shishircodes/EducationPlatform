import { useState } from "react";
import { NavLink } from "react-router";
import { FaCode, FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import useUserStore from "../store/userStore";
import Button from "./Button";

const desktopLink = ({ isActive }) =>
  `relative px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "text-fg" : "text-fg-muted hover:text-fg"
  }`;

const mobileLink = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-brand-soft text-brand"
      : "text-fg-muted hover:bg-surface-muted hover:text-fg"
  }`;

function ActiveUnderline({ isActive }) {
  return (
    <span
      className={`pointer-events-none absolute inset-x-3 -bottom-4 h-0.5 transition-colors ${
        isActive ? "bg-brand" : "bg-transparent"
      }`}
    />
  );
}

export default function Navbar() {
  const name = useUserStore((s) => s.name);
  const openGetStarted = useUserStore((s) => s.openGetStarted);
  const loggedIn = Boolean(name);

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const handleGetStarted = () => {
    closeMenu();
    openGetStarted();
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-app/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-fg"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-brand-fg">
            <FaCode />
          </span>
          learn-to-dev
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/" end className={desktopLink}>
            {({ isActive }) => (
              <>
                Home
                <ActiveUnderline isActive={isActive} />
              </>
            )}
          </NavLink>
          <NavLink to="/courses" className={desktopLink}>
            {({ isActive }) => (
              <>
                Courses
                <ActiveUnderline isActive={isActive} />
              </>
            )}
          </NavLink>
          {loggedIn && (
            <NavLink to="/dashboard" className={desktopLink}>
              {({ isActive }) => (
                <>
                  Dashboard
                  <ActiveUnderline isActive={isActive} />
                </>
              )}
            </NavLink>
          )}
        </nav>

        {/* Desktop auth area */}
        <div className="hidden items-center gap-3 text-sm sm:flex">
          {loggedIn ? (
            <span className="text-fg-muted">
              Welcome, <span className="font-medium text-fg">{name}</span>
            </span>
          ) : (
            <Button
              size="sm"
              variant="ink"
              onClick={openGetStarted}
              className="gap-2"
            >
              Get Started <FaArrowRight />
            </Button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted hover:bg-surface-muted hover:text-fg sm:hidden"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="border-t border-line bg-app sm:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            <NavLink to="/" end onClick={closeMenu} className={mobileLink}>
              Home
            </NavLink>
            <NavLink to="/courses" onClick={closeMenu} className={mobileLink}>
              Courses
            </NavLink>
            {loggedIn && (
              <NavLink
                to="/dashboard"
                onClick={closeMenu}
                className={mobileLink}
              >
                Dashboard
              </NavLink>
            )}

            <div className="mt-3 border-t border-line pt-3">
              {loggedIn ? (
                <p className="px-3 py-2 text-sm text-fg-muted">
                  Welcome,{" "}
                  <span className="font-medium text-fg">{name}</span>
                </p>
              ) : (
                <Button
                  variant="ink"
                  onClick={handleGetStarted}
                  className="w-full gap-2"
                >
                  Get Started <FaArrowRight />
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
