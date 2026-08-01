"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, CalendarCheck, Check, Loader2 } from "lucide-react";
import {
  buttonClasses,
  type ButtonVariant,
  type ButtonSize,
} from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type ReserveDialogProps = {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type Details = {
  name: string;
  phone: string;
  party: string;
  date: string;
  time: string;
};

function prettyDate(value: string) {
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function prettyTime(value: string) {
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h)) return value;
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

const today = () => new Date().toISOString().split("T")[0];

export function ReserveDialog({
  label = "Reserve a Table",
  variant = "primary",
  size = "md",
  className,
}: ReserveDialogProps) {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState<Details | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const descId = useId();

  // Open: lock scroll, focus first field, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = triggerRef.current;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 20);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(t);
      previouslyFocused?.focus();
    };
  }, [open]);

  function close() {
    setOpen(false);
    // Reset the form state a moment after the dialog closes.
    window.setTimeout(() => {
      setConfirmed(null);
      setError(null);
      setSubmitting(false);
    }, 200);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    // Read the form before any await — currentTarget is nulled after the handler.
    const form = new FormData(e.currentTarget);
    const details: Details = {
      name: String(form.get("name") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      party: String(form.get("party") ?? ""),
      date: String(form.get("date") ?? ""),
      time: String(form.get("time") ?? ""),
    };
    if (
      !details.name ||
      !details.phone ||
      !details.party ||
      !details.date ||
      !details.time
    ) {
      setError("Please fill in every field so we can hold your table.");
      return;
    }
    if (details.phone.replace(/\D/g, "").length < 8) {
      setError("Please enter a phone number we can reach you on.");
      return;
    }
    if (details.date < today()) {
      setError("Please choose today or a future date.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      // Same-origin route handler; it holds the webhook URL and secret.
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setError(
          data?.error ??
            "We couldn't send that just now. Please try again, or call us.",
        );
        return;
      }
      setConfirmed(details);
    } catch {
      setError("We couldn't reach us just now — please check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={buttonClasses(variant, size, className)}
      >
        {label}
      </button>

      {/* Portalled to <body>: an ancestor with a transform (e.g. .animate-rise,
          which keeps translateY(0) via fill-mode both) would otherwise become
          the containing block and the overlay would no longer track the viewport. */}
      {open && createPortal(
        <div
          className="fixed inset-0 z-[300] flex h-[100svh] items-end justify-center p-0 sm:items-center sm:p-4"
          role="presentation"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-espresso-900/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className={cn(
              "relative flex w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-surface shadow-lg",
              "max-h-[92svh] sm:max-h-[calc(100svh-2rem)] sm:rounded-2xl",
            )}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close reservation form"
              className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-pill bg-surface/80 text-text-muted backdrop-blur-sm hover:bg-surface-cream"
            >
              <X size={18} aria-hidden />
            </button>

            <div className="overflow-y-auto overscroll-contain p-6 sm:p-8">
              {confirmed ? (
                <div role="status" aria-live="polite" className="pt-2 text-center">
                  <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-pill bg-primary/12 text-primary">
                    <Check size={26} aria-hidden />
                  </span>
                  <h2 id={titleId} className="font-display text-2xl text-heading">
                    Table noted
                  </h2>
                  <p id={descId} className="mt-3 text-text-muted">
                    Thanks, {confirmed.name.split(" ")[0]} — your table for{" "}
                    <strong className="text-text">{confirmed.party}</strong> on{" "}
                    <strong className="text-text">{prettyDate(confirmed.date)}</strong> at{" "}
                    <strong className="text-text">{prettyTime(confirmed.time)}</strong>{" "}
                    is noted. We&apos;ll confirm on{" "}
                    <strong className="text-text">{confirmed.phone}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className={buttonClasses("primary", "md", "mt-6 w-full")}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-pill bg-primary/12 text-primary">
                      <CalendarCheck size={22} aria-hidden />
                    </span>
                    <div>
                      <h2 id={titleId} className="font-display text-2xl text-heading">
                        Reserve a table
                      </h2>
                      <p id={descId} className="text-sm text-text-muted">
                        Tell us when you&apos;re coming and we&apos;ll save you a seat.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={onSubmit} noValidate className="space-y-4">
                    <Field label="Your name" htmlFor="res-name">
                      <input
                        ref={firstFieldRef}
                        id="res-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="e.g. Ama Ngassa"
                        className={fieldClass}
                      />
                    </Field>

                    {/* Required: without a contact channel the cafe cannot confirm
                        the table or reach the guest if plans change. WhatsApp is
                        the dominant channel in Douala, so phone leads. */}
                    <Field label="Phone / WhatsApp" htmlFor="res-phone">
                      <input
                        id="res-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        placeholder="e.g. +237 6 90 00 00 00"
                        className={fieldClass}
                      />
                    </Field>

                    <Field label="Party size" htmlFor="res-party">
                      <select id="res-party" name="party" required defaultValue="2" className={fieldClass}>
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9+"].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === "1" ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </Field>

                    {/* Date before time: asking for a time first, pre-filled, ahead
                        of an empty required date read as backwards. Single column
                        until sm — two native pickers side by side are cramped at 320px. */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Date" htmlFor="res-date">
                        <input
                          id="res-date"
                          name="date"
                          type="date"
                          required
                          min={today()}
                          defaultValue={today()}
                          className={fieldClass}
                        />
                      </Field>

                      <Field label="Time" htmlFor="res-time">
                        <input
                          id="res-time"
                          name="time"
                          type="time"
                          required
                          defaultValue="18:00"
                          className={fieldClass}
                        />
                      </Field>
                    </div>

                    {error && (
                      <p role="alert" className="text-sm font-medium text-danger">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      aria-busy={submitting}
                      className={buttonClasses("primary", "lg", "w-full")}
                    >
                      {submitting && (
                        <Loader2 size={18} aria-hidden className="animate-spin" />
                      )}
                      {submitting ? "Sending…" : "Confirm reservation"}
                    </button>
                    {/* text-muted, not text-subtle: subtle is 3.19:1 on white and
                        this is reassurance copy, not decoration. */}
                    <p className="text-center text-xs text-text-muted">
                      No payment needed · Free cancellation · We hold your table for
                      15 minutes.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

// text-base (16px), not text-sm: mobile Safari zooms the viewport on focus for
// any input under 16px, which yanks the layout mid-booking. py-3 keeps the
// control at the 44px minimum target size.
//
// No `outline-none` here. It used to be, which killed the caramel focus ring —
// the base-layer rule in theme.css is written with :where() and so has zero
// specificity, losing to any utility that sets outline.
const fieldClass =
  "w-full rounded-md border border-border-strong bg-surface-cream px-3.5 py-3 text-base text-text " +
  "placeholder:text-text-subtle focus:border-primary";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5")}>
      <label htmlFor={htmlFor} className="block text-xs font-bold uppercase tracking-label text-text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
