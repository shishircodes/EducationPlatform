import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";
import useUserStore from "../store/userStore";
import { createUser } from "../api/mockApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email }) {
  const errors = {};
  if (!name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

export default function GetStartedModal() {
  const closeGetStarted = useUserStore((s) => s.closeGetStarted);
  const login = useUserStore((s) => s.login);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate({ name, email });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    setSubmitting(true);
    try {
      await createUser({ name: name.trim(), email: email.trim() });
      login({ name, email });
      toast.success(`Welcome, ${name.trim()}!`);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't create your account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
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
          Tell us a bit about yourself to get started. Your progress is saved on
          this device.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Field
            id="get-started-name"
            label="Name"
            type="text"
            value={name}
            onChange={setName}
            placeholder="Your name here..."
            error={errors.name}
            autoFocus
          />

          <Field
            id="get-started-email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="youremail@example.com"
            error={errors.email}
          />

          <div className="mt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={closeGetStarted}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ id, label, type, value, onChange, placeholder, error, autoFocus }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger-soft"
            : "border-line focus:border-brand focus:ring-brand-soft"
        }`}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
