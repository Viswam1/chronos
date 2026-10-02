export type Technique = {
  slug: string;
  name: string;
  origin: string;
  summary: string;
  accent: string;
  href: string;
};

export const TECHNIQUES: Technique[] = [
  {
    slug: "pomodoro",
    name: "Pomodoro",
    origin: "Italy, 1980s",
    summary: "25-minute focus blocks with 5-minute breaks.",
    accent: "#e63946",
    href: "/pomodoro",
  },
  {
    slug: "qin_han",
    name: "Qin/Han Workday",
    origin: "China, 221 BCE – 220 CE",
    summary: "A structured 5AM–5PM imperial workday.",
    accent: "#d4a017",
    href: "/qin-han",
  },
  {
    slug: "asante_cycle",
    name: "Asante Adaduanan",
    origin: "West Africa, Asante Empire",
    summary: "A 42-day cyclical planning rhythm.",
    accent: "#2a9d8f",
    href: "/asante",
  },
  {
    slug: "egyptian_flow",
    name: "Egyptian Water Clock",
    origin: "Ancient Egypt",
    summary: "Deep, uninterrupted flow timed like water.",
    accent: "#1e6fbf",
    href: "/egyptian",
  },
  {
    slug: "greco_roman",
    name: "Greco-Roman Routine",
    origin: "Greece & Rome",
    summary: "A day of lectio, disputatio, gymnasium, examinatio.",
    accent: "#8d99ae",
    href: "/greco-roman",
  },
];
