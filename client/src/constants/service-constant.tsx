export type Service = {
  slug: string;
  title: string;
  description: string;
};

export const services: readonly Service[] = [
  {
    slug: "human-capital",
    title: "Human Capital",
    description:
      "Supporting organizations in managing and developing their people through human capital solutions.",
  },
  {
    slug: "financial-industry-services",
    title: "Financial Industry Services",
    description:
      "Providing services and programs related to the needs of professionals and organizations in the financial industry.",
  },
  {
    slug: "next-level-eduventures",
    title: "Next Level Eduventures",
    description:
      "Developing educational and career-related programs to support learning and professional growth.",
  },
  {
    slug: "business-affiliate",
    title: "Business Affiliate",
    description:
      "Connecting businesses with sales and marketing opportunities through an affiliate-based approach.",
  },
  {
    slug: "branding-marketing",
    title: "Branding & Marketing",
    description:
      "Supporting businesses in developing their brand and marketing activities.",
  },
  {
    slug: "event-organizer",
    title: "Event Organizer",
    description:
      "Planning and organizing events based on the needs and objectives of each organization.",
  },
  {
    slug: "stemspark",
    title: "STEMSpark",
    description:
      "Educational programs that introduce and develop interest in STEM-related learning and activities.",
  },
  {
    slug: "business-improvement",
    title: "Business Improvement",
    description:
      "Supporting organizations in identifying opportunities to improve their business processes and performance.",
  },
  {
    slug: "management-program",
    title: "Management Program",
    description:
      "Programs designed to support management and leadership development.",
  },
];
