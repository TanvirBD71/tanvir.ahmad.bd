"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import MotionSection from "@/components/MotionSection";
import SectionHeading from "@/components/SectionHeading";
import { SocialIcon } from "@/components/SocialIcons";
import { contact, site } from "@/lib/content";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validate(values: {
  name: string;
  email: string;
  message: string;
}): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate({ name, email, message });
    setErrors(nextErrors);
    setSubmitError(null);
    setSuccess(false);

    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setSubmitError(data.error || "Could not send your message. Please try again.");
        return;
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <MotionSection
      id="contact"
      ariaLabelledby="contact-heading"
      className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24"
    >
      <SectionHeading
        id="contact-heading"
        eyebrow={contact.eyebrow}
        title={contact.title}
        description={contact.description}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal">
              Direct
            </p>
            <a
              href={`mailto:${site.email}`}
              title={`Email ${site.email}`}
              className="focus-ring mt-2 inline-block rounded-lg text-lg font-semibold text-navy hover:text-teal"
            >
              {site.email}
            </a>
            <p className="mt-3">
              <a
                href={site.phoneHref}
                title={`Call ${site.phone}`}
                className="focus-ring rounded-lg font-medium text-navy hover:text-teal"
              >
                {site.phone}
              </a>
              <span className="mx-2 text-muted">·</span>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="focus-ring rounded-lg text-sm font-medium text-teal hover:text-teal-dark"
              >
                WhatsApp
              </a>
            </p>
            <p className="mt-2">
              <a
                href={site.website}
                target="_blank"
                rel="noopener noreferrer"
                title="Visit website tanvir.ahmad.bd"
                className="focus-ring rounded-lg text-sm font-semibold text-teal drop-shadow-[0_0_10px_rgba(13,148,136,0.45)] transition hover:text-teal-dark hover:drop-shadow-[0_0_14px_rgba(13,148,136,0.6)]"
              >
                {site.website.replace(/^https?:\/\//, "")}
              </a>
            </p>
            <p className="mt-3 text-muted">{site.location}</p>
          </div>

          <ul className="flex flex-wrap gap-3" aria-label="Social links">
            {contact.socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    social.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-navy/10 bg-panel/90 px-4 py-2.5 text-sm font-medium text-navy transition duration-300 hover:scale-[1.03] hover:border-teal/40 hover:bg-teal-light/50 hover:text-teal dark:border-teal/20"
                  aria-label={social.name}
                  title={social.name}
                >
                  <SocialIcon name={social.icon} />
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="glass-panel rounded-3xl p-6 md:p-8"
          noValidate
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-navy">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={sending}
                className="focus-ring w-full rounded-2xl border border-navy/10 bg-panel px-4 py-3 text-navy outline-none transition focus:border-teal disabled:opacity-60 dark:border-teal/20"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
              />
              {errors.name ? (
                <p id="contact-name-error" className="mt-1.5 text-sm text-accent-rose" role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-navy">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={sending}
                className="focus-ring w-full rounded-2xl border border-navy/10 bg-panel px-4 py-3 text-navy outline-none transition focus:border-teal disabled:opacity-60 dark:border-teal/20"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
              />
              {errors.email ? (
                <p id="contact-email-error" className="mt-1.5 text-sm text-accent-rose" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-sm font-semibold text-navy"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={sending}
                className="focus-ring w-full resize-y rounded-2xl border border-navy/10 bg-panel px-4 py-3 text-navy outline-none transition focus:border-teal disabled:opacity-60 dark:border-teal/20"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
              />
              {errors.message ? (
                <p
                  id="contact-message-error"
                  className="mt-1.5 text-sm text-accent-rose"
                  role="alert"
                >
                  {errors.message}
                </p>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-coral px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/20 transition hover:bg-coral-hover disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
            title="Send your message"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              "Send message"
            )}
          </button>

          {submitError ? (
            <p className="mt-4 text-sm text-accent-rose" role="alert">
              {submitError}
            </p>
          ) : null}

          {success ? (
            <p
              className="mt-4 flex items-start gap-2 rounded-2xl bg-teal-light/70 px-4 py-3 text-sm text-teal-dark"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {contact.successMessage}
            </p>
          ) : null}
        </form>
      </div>
    </MotionSection>
  );
}
