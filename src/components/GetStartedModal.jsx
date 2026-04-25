import { useState } from "react";
import Button from "./Button";
import useUserStore from "../store/userStore";

export default function GetStartedModal() {
  const closeGetStarted = useUserStore((s) => s.closeGetStarted);
  const login = useUserStore((s) => s.login);
  const [name, setName] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm"
      onClick={closeGetStarted}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-line bg-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-1 text-xl font-semibold tracking-tight text-fg">
          Welcome to learn-to-dev
        </h2>
        <p className="mb-5 text-sm text-fg-muted">
          Enter your name to get started. Your progress is saved on this device.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(name);
          }}
          className="flex flex-col gap-3"
        >
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft"
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={closeGetStarted}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
