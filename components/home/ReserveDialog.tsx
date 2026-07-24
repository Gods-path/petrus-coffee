"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X, CalendarCheck, Check } from "lucide-react";
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

type Details = { name: string; party: string; date: string; time: string };

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
    }, 200);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const details: Details = {
      name: String(form.get("name") ?? "").trim(),
      party: String(form.get("party") ?? ""),
      date: String(form.get("date") ?? ""),
      time: String(form.get("time") ?? ""),
    };
    if (!details.name || !details.party || !details.date || !details.time) {
      setError("Please fill in every field so we can hold your table.");
      return;
    }
    if (details.date < today()) {
      setError("Please choose today or a future date.");
      return;
    }
    setError(null);
    setConfirmed(details);
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

      {open && (
        <div
          className="fixed inset-0 z-[300] flex items-end justify-center p-0 sm:items-center sm:p-4"
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
            className="relative w-full max-w-md rounded-t-2xl bg-surface p-6 shadow-lg sm:rounded-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close reservation form"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-pill text-text-muted hover:bg-surface-cream"
            >
              <X size={18} aria-hidden />
            </button>

            {confirmed ? (
              <div className="pt-2 text-center">
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
                  <strong className="text-text">{prettyTime(confirmed.time)}</strong> is
                  noted. We&apos;ll confirm by WhatsApp or email shortly.
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

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Party size" htmlFor="res-party">
                      <select id="res-party" name="party" required defaultValue="" className={fieldClass}>
                        <option value="" disabled>
                          Select
                        </option>
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9+"].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === "1" ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
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

                  <Field label="Date" htmlFor="res-date">
                    <input
                      id="res-date"
                      name="date"
                      type="date"
                      required
                      min={today()}
                      className={fieldClass}
                    />
                  </Field>

                  {error && (
                    <p role="alert" className="text-sm font-medium text-danger">
                      {error}
                    </p>
                  )}

                  <button type="submit" className={buttonClasses("primary", "lg", "w-full")}>
                    Confirm reservation
                  </button>
                  <p className="text-center text-xs text-text-subtle">
                    No payment needed. We&apos;ll hold your table for 15 minutes.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const fieldClass =
  "w-full rounded-md border border-border-strong bg-surface-cream px-3.5 py-2.5 text-sm text-text " +
  "placeholder:text-text-subtle focus:border-primary focus:outline-none focus-visible:outline-none";

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
