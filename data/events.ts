export type CafeEvent = {
  id: string;
  title: string;
  cadence: string; // e.g. "Every Friday"
  time: string; // e.g. "7:00 PM"
  description: string;
  tag: string; // short label, e.g. "Live music"
  image: string;
  imageAlt: string;
};

/** Recurring events at Petrus Coffee. Shown on the homepage. */
export const events: CafeEvent[] = [
  {
    id: "acoustic-fridays",
    title: "Acoustic Fridays",
    cadence: "Every Friday",
    time: "7:00 PM – 9:30 PM",
    description:
      "Local musicians fill the room with live acoustic sets while the espresso machine keeps humming. Come early for a good seat, stay late for the encore.",
    tag: "Live music",
    image:
      "/images/photo-14715215.webp",
    imageAlt: "A musician playing acoustic guitar in a warm coffee shop",
  },
  {
    id: "cup-of-origin",
    title: "Cup of Origin",
    cadence: "Every Saturday",
    time: "10:00 AM – 11:30 AM",
    description:
      "A guided tasting of single-origin Cameroonian coffee. Meet the beans from Mount Cameroon and the Western Highlands, and learn to taste what makes each one sing.",
    tag: "Coffee tasting",
    image:
      "/images/photo-22938072.webp",
    imageAlt: "A scoop lifting freshly roasted coffee beans",
  },
];
