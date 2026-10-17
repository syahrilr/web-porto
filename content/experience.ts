export type Job = { period: string; title: string; company: string; summary: string; bullets: string[]; stack: string[] };

export const experience: Job[] = [
  {
    period: "Feb 2025 — Present",
    title: "Fullstack Developer",
    company: "PT Brilyan Trimatra Utama",
    summary: "Full-time, remote. AI and data systems for water-resource, healthcare and agribusiness clients.",
    bullets: [
      "Built RAG systems with hybrid retrieval (MongoDB exact search + Milvus/Zilliz vector search with bge-m3) over SOP and regulation documents.",
      "Designed Neo4j knowledge graphs linking assets, sensors, rainfall, water level, pump operations and operator logbooks.",
      "Integrated real-time sensor data (TDengine, SCADA tag APIs) for pump-station and flood monitoring.",
      "Built MCP servers and LLM copilots (Ollama, Groq, Gemini) on top of graph and document data.",
      "Automated scheduled aggregation and ingestion into Neo4j with n8n.",
      "Developed an academic information system, a student admission portal and other web apps.",
    ],
    stack: ["Next.js", "Express", "Neo4j", "MongoDB", "Milvus", "n8n", "MCP"],
  },
  {
    period: "Aug — Nov 2021",
    title: "Fullstack Developer (Intern)",
    company: "SBU Pelayanan Kapal, PT Pelabuhan Indonesia Jasa Maritim",
    summary: "Internship in the ship services unit.",
    bullets: [
      "Built a Laravel application to manage and organize agreement records.",
      "Digitized the documentation workflow so records are easier to find across the organization.",
    ],
    stack: ["Laravel"],
  },
];
