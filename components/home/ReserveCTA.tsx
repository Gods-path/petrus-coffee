import { Container } from "@/components/ui/Container";
import { ReserveDialog } from "./ReserveDialog";

export function ReserveCTA() {
  return (
    <section className="py-section">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-14 text-center text-on-primary sm:px-12">
          {/* subtle caramel glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-pill bg-accent/25 blur-2xl"
          />
          <div className="relative mx-auto max-w-xl">
            <h2 className="font-display text-display-md font-semibold text-on-primary">
              Save yourself a seat
            </h2>
            <p className="mt-4 text-cream-200">
              Whether it&apos;s a quiet morning coffee or a full table for Friday&apos;s
              music, reserving takes a few seconds.
            </p>
            <div className="mt-8 flex justify-center">
              <ReserveDialog variant="inverse" size="lg" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
