import { NavLink } from "react-router";
import { FaCode } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import useUserStore from "../store/userStore";
import Button from "./Button";

const navLink = ({ isActive }) =>
  `relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "text-fg" : "text-fg-muted hover:text-fg"
  }`;

function NavTab({ isActive, children }) {
  return (
    <>
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors ${
          isActive ? "bg-brand" : "bg-transparent"
        }`}
      />
      {children}
    </>
  );
}

export default function Navbar() {
  const name = useUserStore((s) => s.name);
  const openGetStarted = useUserStore((s) => s.openGetStarted);
  const loggedIn = Boolean(name);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-app/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-fg"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-brand-fg">
            <FaCode />
          </span>
          learn-to-dev
        </NavLink>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/" end className={navLink}>
            {({ isActive }) => <NavTab isActive={isActive}>Home</NavTab>}
          </NavLink>
          <NavLink to="/courses" className={navLink}>
            {({ isActive }) => <NavTab isActive={isActive}>Courses</NavTab>}
          </NavLink>
          {loggedIn && (
            <NavLink to="/dashboard" className={navLink}>
              {({ isActive }) => <NavTab isActive={isActive}>Dashboard</NavTab>}
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {loggedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-fg-muted sm:inline">
                Welcome, <span className="font-medium text-fg">{name}</span>
              </span>
            </div>
          ) : (
            <Button size="sm" variant="ink" onClick={openGetStarted} className="gap-2">
              Get Started <FaArrowRight />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
