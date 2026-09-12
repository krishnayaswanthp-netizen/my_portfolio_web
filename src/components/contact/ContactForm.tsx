/** ContactForm — quiet correspondence form. Inline validation, real Formspree endpoint. */

import { useState } from "react";
import { site } from "../../data/site";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const validators: Record<keyof Fields, (v: string) => string> = {
  name: (v) => (v.trim() ? "" : "Name is required"),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Valid email is required"),
  message: (v) => (v.trim() ? "" : "Message is required"),
};

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const set = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const blur = (key: keyof Fields) => () => {
    const msg = validators[key](fields[key]);
    setErrors((er) => ({ ...er, [key]: msg || undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    (Object.keys(fields) as (keyof Fields)[]).forEach((key) => {
      const msg = validators[key](fields[key]);
      if (msg) next[key] = msg;
    });
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target as HTMLFormElement),
      });
      if (res.ok) {
        setStatus("sent");
        setFields({ name: "", email: "", message: "" });
      } else {
        setStatus("failed");
      }
    } catch {
      setStatus("failed");
    }
  };

  const inputClass = (hasError?: string) =>
    `w-full rounded-xl border bg-bone-100/5 px-4 py-3 text-bone-50 placeholder:text-bone-100/30 transition-colors focus:bg-bone-100/10 focus:outline-none ${
      hasError ? "border-rust-400" : "border-bone-100/15 focus:border-bone-100/40"
    }`;

  return (
    <form onSubmit={submit} noValidate className="rounded-[20px] border border-bone-100/12 bg-ink-900/60 p-6 backdrop-blur-sm sm:p-8">
      <p className="mono-label mb-6 text-bone-100/50">Or write here —</p>

      <div className="space-y-5">
        <div>
          <label htmlFor="cf-name" className="mono-label mb-2 block text-bone-100/60">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={set("name")}
            onBlur={blur("name")}
            className={inputClass(errors.name)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
          />
          {errors.name && (
            <p id="cf-name-error" className="mono-label mt-2 text-rust-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-email" className="mono-label mb-2 block text-bone-100/60">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={set("email")}
            onBlur={blur("email")}
            className={inputClass(errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
          />
          {errors.email && (
            <p id="cf-email-error" className="mono-label mt-2 text-rust-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-message" className="mono-label mb-2 block text-bone-100/60">
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            value={fields.message}
            onChange={set("message")}
            onBlur={blur("message")}
            className={inputClass(errors.message)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "cf-message-error" : undefined}
          />
          {errors.message && (
            <p id="cf-message-error" className="mono-label mt-2 text-rust-400">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mono-label mt-6 w-full rounded-full bg-bone-50 py-3.5 text-ink-950 transition-colors hover:bg-rust-400 hover:text-ink-950 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p role="status" aria-live="polite" className="mono-label mt-4 min-h-4 text-center">
        {status === "sent" && <span className="text-moss-400">Received — I will reply by email.</span>}
        {status === "failed" && (
          <span className="text-rust-400">Delivery failed — email me directly instead.</span>
        )}
      </p>
    </form>
  );
}
