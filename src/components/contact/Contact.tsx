import { useState, type FormEvent } from "react";
import { site } from "../../data/site";
import Icon from "../common/Icon";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setErrorMessage(
          data?.errors?.[0]?.message ||
            "Submission could not be completed via the endpoint. Please email Krishna directly at " +
              site.email
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error reaching form endpoint. Please write directly to " + site.email
      );
    }
  };

  return (
    <section className="w-full bg-surface-dim py-24 px-6 md:px-10 border-b-[2.5px] border-warm-charcoal" id="contact">
      <div className="max-w-4xl mx-auto">
        {/* Tactile Callout Container */}
        <div className="relative bg-card-cream rounded-3xl p-8 md:p-14 border-[2.5px] border-warm-charcoal shadow-[8px_8px_0px_#292820] text-warm-charcoal overflow-hidden">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="bg-bright-lime text-warm-charcoal font-mono text-xs font-bold uppercase px-4 py-1 rounded-full border-[1.5px] border-warm-charcoal shadow-[2px_2px_0px_#292820] mb-4 rotate-[-1deg]">
              ★ LET'S CONNECT ★
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
              Have something interesting to build?
            </h2>
            <p className="font-body text-base text-warm-charcoal/80 max-w-xl leading-relaxed">
              Whether it's a backend system architecture, an AI/RAG project, or an engineering role, I'd love to hear from you.
            </p>
          </div>

          {/* Client-Side Form with Validation & Feedback */}
          <form className="flex flex-col gap-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1" htmlFor="contact-name">
                Your Name
              </label>
              <input
                className="w-full bg-vanilla-cream text-warm-charcoal font-body text-sm px-4 py-3 rounded-xl border-[2px] border-warm-charcoal shadow-[3px_3px_0px_#292820] focus:outline-none focus:border-electric-blue transition-colors"
                id="contact-name"
                name="name"
                placeholder="e.g. Alex Morgan"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1" htmlFor="contact-email">
                Email Address
              </label>
              <input
                className="w-full bg-vanilla-cream text-warm-charcoal font-body text-sm px-4 py-3 rounded-xl border-[2px] border-warm-charcoal shadow-[3px_3px_0px_#292820] focus:outline-none focus:border-electric-blue transition-colors"
                id="contact-email"
                name="email"
                placeholder="alex@domain.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1" htmlFor="contact-message">
                Message / Project Brief
              </label>
              <textarea
                className="w-full bg-vanilla-cream text-warm-charcoal font-body text-sm px-4 py-3 rounded-xl border-[2px] border-warm-charcoal shadow-[3px_3px_0px_#292820] focus:outline-none focus:border-electric-blue resize-none transition-colors"
                id="contact-message"
                name="message"
                placeholder="Tell me about what you're building..."
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            {status === "success" && (
              <div
                id="form-feedback"
                className="p-3.5 rounded-xl font-mono text-xs border-[1.5px] bg-bright-lime/90 border-warm-charcoal text-warm-charcoal shadow-[2px_2px_0px_#292820]"
              >
                ✓ Message sent successfully! I have received your note and will reply to your email promptly.
              </div>
            )}

            {status === "error" && (
              <div
                id="form-feedback"
                className="p-3.5 rounded-xl font-mono text-xs border-[1.5px] bg-coral-pink/90 border-warm-charcoal text-warm-charcoal shadow-[2px_2px_0px_#292820]"
              >
                ⚠ {errorMessage}
              </div>
            )}

            <button
              className="inline-flex items-center justify-center gap-2 bg-electric-blue hover:bg-warm-charcoal text-white font-headline text-sm font-bold uppercase px-8 py-3.5 rounded-full border-[2.5px] border-warm-charcoal shadow-[4px_4px_0px_#292820] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#292820] transition-all cursor-pointer mt-2 disabled:opacity-60"
              id="contact-submit-btn"
              type="submit"
              disabled={status === "submitting"}
            >
              <span>{status === "submitting" ? "Sending Note..." : "Send Message"}</span>
              <Icon name="send" size={18} />
            </button>
          </form>

          {/* Direct channels */}
          <div className="mt-10 pt-6 border-t border-warm-charcoal/15 flex flex-wrap justify-center items-center gap-6 font-mono text-xs text-warm-charcoal/80">
            <a
              className="hover:underline flex items-center gap-1 font-bold text-electric-blue"
              href={`mailto:${site.email}`}
            >
              <Icon name="mail" size={16} />
              <span>{site.email}</span>
            </a>
            <span>•</span>
            <a
              className="hover:underline hover:text-electric-blue"
              href={site.resume}
              rel="noreferrer"
              target="_blank"
            >
              Resume ↗
            </a>
            <span>•</span>
            <a
              className="hover:underline hover:text-electric-blue"
              href={site.github}
              rel="noreferrer"
              target="_blank"
            >
              GitHub ↗
            </a>
            <span>•</span>
            <a
              className="hover:underline hover:text-electric-blue"
              href={site.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn ↗
            </a>
            <span>•</span>
            <a
              className="hover:underline hover:text-electric-blue"
              href={site.portfolio}
              rel="noreferrer"
              target="_blank"
            >
              Live Portfolio ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
