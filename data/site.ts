/** Shared site metadata used by the header, footer, and reservation copy. */
export const site = {
  name: "Petrus Coffee",
  tagline: "Specialty coffee in the heart of Douala",
  neighbourhood: "Bonapriso, Douala",
  address: "Rue Njo-Njo, Bonapriso, Douala, Cameroon",
  phone: "+237 6 90 00 00 00",
  email: "hello@petruscoffee.cm",
  hours: [
    { days: "Monday – Thursday", time: "7:00 AM – 9:00 PM" },
    { days: "Friday", time: "7:00 AM – 10:30 PM" },
    { days: "Saturday", time: "8:00 AM – 10:30 PM" },
    { days: "Sunday", time: "8:00 AM – 6:00 PM" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "WhatsApp", href: "https://wa.me/2376900000000" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
] as const;
