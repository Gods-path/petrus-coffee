import { Hero } from "@/components/home/Hero";
import { PopularItems } from "@/components/home/PopularItems";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { EventsSection } from "@/components/home/EventsSection";
import { ReserveCTA } from "@/components/home/ReserveCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularItems />
      <StoryTeaser />
      <EventsSection />
      <ReserveCTA />
    </>
  );
}
