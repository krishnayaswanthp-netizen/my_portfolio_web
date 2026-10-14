/** Site identity + navigation — single source of truth. */

export const site = {
  name: "Krishna Yaswanth Panchagnula",
  shortName: "Krishna Yaswanth",
  initials: "KY",
  role: "Software Engineer",
  tagline: "Software Engineer // Systems • AI • Full-Stack",
  positioning: "I build backend systems, AI engines, and complete web applications.",
  bio: "I like understanding how things work, solving engineering problems, and turning ideas into working software.",
  location: "India (Available Globally)",
  locationShort: "Hyderabad, IN",
  status: "ONLINE // BUILDING",
  email: "krishnayaswanthp@gmail.com",
  portfolio: "https://kyp-portfolio.netlify.app",
  github: "https://github.com/krishnayaswanthp-netizen",
  githubHandle: "@krishnayaswanthp-netizen",
  linkedin: "https://www.linkedin.com/in/panchagnula-krishna-yaswanth-9b0413307/",
  linkedinLabel: "Panchagnula Krishna Yaswanth",
  resume: "/resume/my_resume.pdf",
  formEndpoint: "https://formspree.io/f/meordgjn",
} as const;

export const nav = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "approach", label: "Approach" },
  { id: "about", label: "About" },
  { id: "writing", label: "Writing" },
  { id: "achievements", label: "Milestones" },
] as const;
