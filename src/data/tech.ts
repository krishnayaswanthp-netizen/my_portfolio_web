/** Capabilities — every technology verified against the repository.
 *  Each node carries: where it was used (real project references) and
 *  adjacent technologies, so the map reads as a system, not a resume list.
 *  No proficiency percentages. No skill bars.
 */

export interface TechNode {
  name: string;
  /** What Krishna used it for — repo-supported phrasing only. */
  usedFor: string;
  /** Related flagship project indices from the archive. */
  projects: string[];
  /** Names of other nodes this technology connects to. */
  related: string[];
}

export interface TechDomain {
  id: string;
  label: string;
  index: string;
  /** One-line focus statement, repo-supported. */
  focus: string;
  nodes: TechNode[];
}

export const domains: TechDomain[] = [
  {
    id: "backend",
    label: "Backend & Systems",
    index: "01",
    focus:
      "Asynchronous REST endpoints, pipeline serialization, and security sanitization services.",
    nodes: [
      {
        name: "Python",
        usedFor: "The core language across screening, extraction, and vision systems.",
        projects: ["001", "003", "004"],
        related: ["FastAPI", "Flask", "LangChain", "OpenCV"],
      },
      {
        name: "FastAPI",
        usedFor: "Async service layer for the AI screening and extraction engines.",
        projects: ["001", "004"],
        related: ["Python", "REST APIs", "Docker"],
      },
      {
        name: "Flask",
        usedFor: "Service layer for the Opaque sanitization engine.",
        projects: ["003"],
        related: ["Python", "REST APIs", "Docker"],
      },
      {
        name: "REST APIs",
        usedFor: "Every system exposes its pipeline over a clean HTTP interface.",
        projects: ["001", "003", "004"],
        related: ["FastAPI", "Flask", "JWT"],
      },
      {
        name: "Microservices",
        usedFor: "Decomposing pipelines into independently deployable services.",
        projects: ["003"],
        related: ["Docker", "Nginx", "REST APIs"],
      },
      {
        name: "JWT",
        usedFor: "Stateless auth between services and clients.",
        projects: ["001"],
        related: ["bcrypt", "REST APIs"],
      },
      {
        name: "bcrypt",
        usedFor: "Credential hashing behind the auth layer.",
        projects: ["001"],
        related: ["JWT"],
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend & Interfaces",
    index: "02",
    focus:
      "Responsive, authored interfaces — dashboard UX, accessibility, and restrained motion.",
    nodes: [
      {
        name: "React",
        usedFor: "This portfolio and the CivicConnect civic platform.",
        projects: ["007"],
        related: ["TypeScript", "Tailwind CSS", "GSAP"],
      },
      {
        name: "TypeScript",
        usedFor: "Typed interfaces across the production hub and this site.",
        projects: ["002"],
        related: ["React", "Tailwind CSS", "Vite"],
      },
      {
        name: "Tailwind CSS",
        usedFor: "Design-token-driven styling for the cinema production hub.",
        projects: ["002"],
        related: ["React", "CSS"],
      },
      {
        name: "JavaScript",
        usedFor: "Interface engineering for Portfolio Vol. I and scraping tools.",
        projects: ["002", "004"],
        related: ["HTML", "CSS", "React"],
      },
      {
        name: "HTML / CSS",
        usedFor: "Semantic documents and hand-tuned presentation layers.",
        projects: ["004"],
        related: ["JavaScript", "Tailwind CSS"],
      },
      {
        name: "GSAP",
        usedFor: "Scroll choreography and motion systems on this site.",
        projects: ["002"],
        related: ["Lenis", "React"],
      },
      {
        name: "Lenis",
        usedFor: "Momentum scrolling beneath the motion system.",
        projects: ["002"],
        related: ["GSAP"],
      },
    ],
  },
  {
    id: "ai",
    label: "AI & Data Systems",
    index: "03",
    focus:
      "Multi-agent task decomposition, dense retrieval, chunking strategy, and hallucination mitigation.",
    nodes: [
      {
        name: "LangChain",
        usedFor: "Agent orchestration and composable LLM chains across AI systems.",
        projects: ["001", "005", "006"],
        related: ["Agent Architectures", "Tool Calling", "Groq"],
      },
      {
        name: "Agent Architectures",
        usedFor: "Multi-agent task decomposition and autonomous workflows.",
        projects: ["001", "006"],
        related: ["LangChain", "Tool Calling", "MCP"],
      },
      {
        name: "Tool Calling",
        usedFor: "LLM tool-use execution against real services and data.",
        projects: ["001", "006"],
        related: ["LangChain", "Agent Architectures"],
      },
      {
        name: "RAG Pipelines",
        usedFor: "Retrieval-augmented support assistants and knowledge engines.",
        projects: ["004", "005", "006"],
        related: ["ChromaDB", "Vector Search", "LangChain"],
      },
      {
        name: "ChromaDB",
        usedFor: "Dense vector storage beneath every retrieval system.",
        projects: ["004", "005", "006"],
        related: ["Vector Search", "RAG Pipelines"],
      },
      {
        name: "Vector Search",
        usedFor: "High-accuracy context retrieval with tuned chunking strategies.",
        projects: ["004", "005", "006"],
        related: ["ChromaDB", "RAG Pipelines"],
      },
      {
        name: "Groq",
        usedFor: "Fast LLM inference for low-latency screening and support.",
        projects: ["001", "005"],
        related: ["LangChain", "RAG Pipelines"],
      },
      {
        name: "PyTorch",
        usedFor: "Model work inside the Haven support system.",
        projects: ["008"],
        related: ["Hugging Face"],
      },
      {
        name: "Hugging Face",
        usedFor: "Model access and pipelines for AI system components.",
        projects: ["008"],
        related: ["PyTorch"],
      },
      {
        name: "OpenCV",
        usedFor: "Hand-gesture recognition driving the volume control system.",
        projects: ["003"],
        related: ["MediaPipe", "Python"],
      },
      {
        name: "MediaPipe",
        usedFor: "Real-time hand landmark tracking for gesture interfaces.",
        projects: ["003"],
        related: ["OpenCV"],
      },
      {
        name: "MCP",
        usedFor: "Model Context Protocol wiring for agent workflows.",
        projects: ["006"],
        related: ["Agent Architectures", "Tool Calling"],
      },
    ],
  },
  {
    id: "data",
    label: "Data & Storage",
    index: "04",
    focus:
      "Relational schema work and vector storage — the persistence layer under the AI systems.",
    nodes: [
      {
        name: "PostgreSQL",
        usedFor: "Relational storage for the CivicConnect platform.",
        projects: ["007"],
        related: ["MySQL", "SQL"],
      },
      {
        name: "MySQL",
        usedFor: "Accounts and transactional data in the bank management system.",
        projects: ["001"],
        related: ["SQL", "JDBC"],
      },
      {
        name: "MongoDB",
        usedFor: "Document storage across service backends.",
        projects: ["004"],
        related: ["PostgreSQL", "SQL"],
      },
      {
        name: "SQL",
        usedFor: "Schema design and query work across every relational system.",
        projects: ["001", "007"],
        related: ["MySQL", "PostgreSQL", "JDBC"],
      },
      {
        name: "JDBC",
        usedFor: "Java database connectivity in the bank management system.",
        projects: ["001"],
        related: ["MySQL", "Java"],
      },
      {
        name: "Java",
        usedFor: "The AWT-based bank management system interface and logic.",
        projects: ["001"],
        related: ["JDBC", "MySQL"],
      },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure",
    index: "05",
    focus:
      "Containerized delivery behind an Nginx gateway — compose files, routing, and environment config.",
    nodes: [
      {
        name: "Docker",
        usedFor: "Containerized delivery of the sanitizer and AI services.",
        projects: ["003", "008"],
        related: ["Docker Compose", "Nginx"],
      },
      {
        name: "Docker Compose",
        usedFor: "Multi-service orchestration for local and production runs.",
        projects: ["003", "008"],
        related: ["Docker"],
      },
      {
        name: "Nginx",
        usedFor: "Gateway routing and static delivery in front of services.",
        projects: ["003"],
        related: ["Docker", "Microservices"],
      },
      {
        name: "Git",
        usedFor: "Version control across every repository in the archive.",
        projects: ["001", "002", "003", "004"],
        related: ["Vite"],
      },
      {
        name: "Vite",
        usedFor: "Build tooling for the production hub and this portfolio.",
        projects: ["002"],
        related: ["TypeScript", "Git"],
      },
    ],
  },
];

/** All nodes flattened — used for hover relationships across domains. */
export const allNodes: { node: TechNode; domain: TechDomain }[] = domains.flatMap(
  (domain) => domain.nodes.map((node) => ({ node, domain })),
);

export function findNode(name: string): { node: TechNode; domain: TechDomain } | undefined {
  return allNodes.find((entry) => entry.node.name === name);
}

export function projectTitle(index: string): string {
  const map: Record<string, string> = {
    "001": "AI Resume Screener",
    "002": "CineNexus",
    "003": "Opaque",
    "004": "UniPulse AI",
    "005": "RAG Support Assistant",
    "006": "Dense RAG Engine",
    "007": "CivicConnect",
    "008": "Haven",
  };
  return map[index] ?? index;
}
