/** Secondary works — real GitHub URLs preserved from the archive index. */

export interface SecondaryWork {
  index: string;
  name: string;
  type: string;
  meta: string;
  year: string;
  github?: string;
  media?: string;
}

export const secondaryWorks: SecondaryWork[] = [
  {
    index: "001",
    name: "Bank Management System",
    type: "Banking system",
    meta: "Java AWT · MySQL",
    year: "2025",
    github: "https://github.com/krishnayaswanthp-netizen/project-1",
    media: "/media/bank_management_system_1.png",
  },
  {
    index: "002",
    name: "Live Cricket Score",
    type: "Data / Scraping",
    meta: "Python · Web scraping",
    year: "2025",
    github: "https://github.com/krishnayaswanthp-netizen/cricket-score",
    media: "/media/live_score.png",
  },
  {
    index: "003",
    name: "Volume Control System",
    type: "Computer vision",
    meta: "Python · OpenCV · MediaPipe",
    year: "2025",
    github:
      "https://github.com/krishnayaswanthp-netizen/volume-control-system-using-hand-gesture-recognition",
    media: "/media/volume_control.png",
  },
  {
    index: "004",
    name: "Portfolio, Vol. I",
    type: "Web / Interface",
    meta: "HTML · CSS · JS",
    year: "2025",
    github: "https://github.com/krishnayaswanthp-netizen/portfolio-website",
  },
  {
    index: "005",
    name: "RAG Customer Support Assistant",
    type: "AI / RAG",
    meta: "Python · ChromaDB · Groq",
    year: "2025",
    github:
      "https://github.com/krishnayaswanthp-netizen/RAG_System_for_Food_Application",
    media: "/media/RAG_model.png",
  },
  {
    index: "006",
    name: "Dense RAG Knowledge Engine",
    type: "AI / RAG",
    meta: "Python · ChromaDB · FastAPI",
    year: "2025",
  },
  {
    index: "007",
    name: "CivicConnect",
    type: "Civic platform",
    meta: "React · Node · PostgreSQL",
    year: "2025",
    github: "https://github.com/krishnayaswanthp-netizen/CivicConnect",
    media: "/media/civic-connect.png",
  },
  {
    index: "008",
    name: "Haven — Mental Health Support System",
    type: "AI / Health",
    meta: "FastAPI · Docker · PyTorch",
    year: "2025",
  },
];
