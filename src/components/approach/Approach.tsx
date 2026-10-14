import Icon from "../common/Icon";

export default function Approach() {
  const bands = [
    {
      num: "01",
      numBg: "bg-electric-blue text-white",
      title: "Backend Systems & Resilient APIs",
      desc: "FastAPI, Flask, async workers, REST endpoints, rate limiting, and relational schema integrity.",
      bgColor: "bg-[#333229] hover:bg-[#3D3C32]",
      stack: ["Python", "FastAPI", "Flask", "REST", "SQL"],
    },
    {
      num: "02",
      numBg: "bg-bright-lime text-warm-charcoal",
      title: "AI & Retrieval-Augmented Generation (RAG)",
      desc: "LangChain, vector embeddings, chunking strategies, semantic retrieval, and hallucination prevention.",
      bgColor: "bg-[#3D3C32] hover:bg-[#47463B]",
      stack: ["LangChain", "RAG", "ChromaDB", "Groq", "LLMs"],
    },
    {
      num: "03",
      numBg: "bg-tangerine text-warm-charcoal",
      title: "Data Processing & Sanitization Pipelines",
      desc: "High-volume catalog extraction, structured attribute normalization, metadata sanitization, and audit logs.",
      bgColor: "bg-[#47463B] hover:bg-[#525144]",
      stack: ["Extraction", "Normalization", "Security", "Docker"],
    },
    {
      num: "04",
      numBg: "bg-bright-lime text-warm-charcoal",
      title: "Full-Stack Delivery & User Experience",
      desc: "Modern TypeScript, responsive React components, containerization, clear interfaces, and cloud deploys.",
      bgColor: "bg-[#525144] hover:bg-[#5C5B4D]",
      stack: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Vite"],
    },
  ];

  return (
    <section
      className="w-full bg-warm-charcoal text-white flex flex-col border-y-[2.5px] border-warm-charcoal"
      id="approach"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        {/* Left Label Pillar */}
        <div className="md:col-span-3 bg-warm-charcoal flex flex-col items-center justify-center p-8 md:p-12 text-center border-b md:border-b-0 md:border-r-[2.5px] border-white/10">
          <span className="font-headline text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-bright-lime md:-rotate-90 whitespace-nowrap">
            How I<br className="hidden md:inline" /> Build
          </span>
        </div>

        {/* Right Color Bands: Engineering Pillars */}
        <div className="md:col-span-9 flex flex-col">
          {bands.map((band, idx) => (
            <div
              key={band.num}
              className={`group ${band.bgColor} px-6 py-8 md:py-9 transition-all duration-300 flex items-center justify-between cursor-pointer ${
                idx < bands.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`font-mono text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center border-[2px] border-white/20 shadow-[2px_2px_0px_#292820] ${band.numBg}`}
                >
                  {band.num}
                </span>
                <div>
                  <h3 className="font-headline text-lg md:text-xl font-extrabold uppercase text-white group-hover:translate-x-1 transition-transform">
                    {band.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-white/70 mt-0.5 max-w-xl">
                    {band.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2 font-mono text-[10px] text-white/50">
                    {band.stack.map((s) => (
                      <span key={s} className="bg-white/10 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <Icon
                name="arrow_forward"
                size={24}
                className="text-bright-lime group-hover:rotate-45 transition-transform shrink-0 ml-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
