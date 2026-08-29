"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Send, Check } from "lucide-react";
import { sendContact, type ContactState } from "@/lib/contact-action";
import { cn } from "@/lib/cn";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction] = useActionState(sendContact, initialState);

  if (state.status === "success") {
    return (
      <div className="glass rounded-[var(--radius-glass)] p-8 text-center md:p-10">
        <div className="bg-accent mx-auto grid h-12 w-12 place-items-center rounded-full text-[var(--accent-fg)]">
          <Check className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <h3 className="font-display text-fg mt-5 text-2xl">{state.message ?? "Sent."}</h3>
        <p className="text-fg-muted mt-3 text-sm leading-relaxed">
          I read every message and reply within a couple of days. If it's urgent, drop me a line on
          LinkedIn.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden
      />

      <Field label="Your name" name="name" error={state.fieldErrors?.name}>
        <input
          name="name"
          required
          maxLength={120}
          autoComplete="name"
          className="text-fg placeholder:text-fg-subtle w-full bg-transparent text-base focus:outline-none"
          placeholder="Alex Chen"
        />
      </Field>

      <Field label="Email" name="email" error={state.fieldErrors?.email}>
        <input
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className="text-fg placeholder:text-fg-subtle w-full bg-transparent text-base focus:outline-none"
          placeholder="alex@company.com"
        />
      </Field>

      <Field label="What's on your mind?" name="message" error={state.fieldErrors?.message}>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={5000}
          className="text-fg placeholder:text-fg-subtle w-full resize-none bg-transparent text-base focus:outline-none"
          placeholder="A project, a role, a question. Whatever you've got."
        />
      </Field>

      {state.status === "error" && state.message && !state.fieldErrors && (
        <div className="border-border text-fg-muted rounded-xl border bg-[var(--glass-tint)] px-4 py-3 text-sm">
          {state.message}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={name}
      className={cn(
        "glass focus-within:border-fg-muted block rounded-[var(--radius-glass)] px-5 py-4 transition-colors",
        error && "border-red-400/40",
      )}
    >
      <span className="text-fg-subtle block text-xs font-medium tracking-[0.16em] uppercase">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-2 block text-xs text-red-300">{error}</span>}
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group bg-accent inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium text-[var(--accent-fg)] transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-px hover:shadow-[0_8px_32px_-8px_var(--accent-glow)] disabled:opacity-60"
    >
      {pending ? (
        <>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
          Sending…
        </>
      ) : (
        <>
          Send message
          <Send
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </>
      )}
    </button>
  );
}
