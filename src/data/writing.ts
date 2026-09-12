/** Writing — three real published pieces with real URLs. */

export interface Article {
  index: string;
  title: string;
  excerpt: string;
  topic: string;
  publication: string;
  date: string;
  url: string;
}

export const articles: Article[] = [
  {
    index: "001",
    title: "LangChain Deep Dive: Designing Modular LLM Applications",
    excerpt:
      "A modular approach to LLM application design — chains, agents, and retrieval wired as composable parts rather than one monolithic prompt.",
    topic: "AI / LLM Engineering",
    publication: "Medium",
    date: "Apr 2026",
    url: "https://medium.com/@krishnayaswanthp/langchain-deep-dive-designing-modular-llm-applications-060a595c1fab",
  },
  {
    index: "002",
    title: "The End of the “Reading Grind”",
    excerpt:
      "Flat technical text is a cognitive bottleneck. NotebookLM’s cinematic video overviews change how dense material gets absorbed.",
    topic: "AI / Learning Systems",
    publication: "LinkedIn",
    date: "Mar 2026",
    url: "https://www.linkedin.com/posts/panchagnula-krishna-yaswanth-9b0413307_notebooklm-artificialintelligence-systemdesign-activity-7436404526427009024-7Ovq",
  },
  {
    index: "003",
    title: "The Ripple Effect of DNS: Analyzing the AWS Outage",
    excerpt:
      "One DNS failure in US-East-1 rippled into Snapchat, Fortnite, and Reddit — a close reading of how the outage spread.",
    topic: "Infrastructure / Networking",
    publication: "LinkedIn",
    date: "Oct 2025",
    url: "https://www.linkedin.com/posts/panchagnula-krishna-yaswanth-9b0413307_aws-cloudcomputing-networking-activity-7387136667628834817-Mo1b",
  },
];
