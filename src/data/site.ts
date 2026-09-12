/** Site identity + navigation — single source of truth. */

export const site = {
  name: "Panchagnula Krishna Yaswanth",
  shortName: "Krishna Yaswanth",
  initials: "KY",
  role: "Software Engineer",
  positioning: "Building systems across AI × Backend × Interfaces",
  location: "Hyderabad, Telangana, India",
  locationShort: "Hyderabad, IN",
  status: "Open to work",
  email: "krishnayaswanthp@gmail.com",
  github: "https://github.com/krishnayaswanthp-netizen",
  githubHandle: "@krishnayaswanthp-netizen",
  linkedin:
    "https://www.linkedin.com/in/panchagnula-krishna-yaswanth-9b0413307",
  linkedinLabel: "Panchagnula Krishna Yaswanth",
  resume: "/resume/my_resume.pdf",
  formEndpoint: "https://formspree.io/f/meordgjn",
} as const;

export const nav = [
  { id: "work", label: "Work", index: "01" },
  { id: "system", label: "System", index: "02" },
  { id: "about", label: "About", index: "03" },
  { id: "writing", label: "Writing", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
] as const;
