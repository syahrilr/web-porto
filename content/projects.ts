export type DiagramNode = { label: string; sub?: string };

export type Project = {
  slug: string;
  title: string;
  client: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
  problem: string;
  built: string[];
  diagram: DiagramNode[];
  diagramNote: string;
  highlights: { value: string; label: string }[];
  prototype?: string;
  tag: string;
  art: "contour" | "graph" | "flow" | "grid" | "pulse" | "radar";
  start: string; // YYYY-MM, first commit
};

export type OtherProject = { year: string; title: string; stack: string; href?: string };

const water = "a regional water-resources agency in Indonesia";
const clinics = "primary-care clinics";

export const featured: Project[] = [
  {
    slug: "water-rag",
    tag: "Water · Flood control",
    art: "contour",
    title: "Water-Resources RAG Platform",
    client: water,
    role: "Main developer",
    start: "2025-11",
    period: "Nov 2025 — Present",
    summary: "Question answering over live pump-station SCADA data, flood records, SOPs and operator logbooks.",
    stack: ["Express", "React", "MongoDB", "Zilliz", "Neo4j", "TDengine", "LangChain", "Ollama", "Groq", "n8n", "MCP"],
    problem:
      "Operators and supervisors needed answers that span very different sources: live pump telemetry, historical water level and rainfall, scanned SOP documents and hourly operator logbooks. Each lived in a different system, so a simple question about why an area flooded meant checking several tools by hand.",
    built: [
      "Hybrid retrieval for SOPs and regulations: exact keyword search in MongoDB plus semantic search in Zilliz (bge-m3) over parent-child chunks, with scoring and de-duplication.",
      "An intent router that sends real-time and graph questions to MCP tool servers (SCADA alarms, water level, Neo4j) and document questions to retrieval.",
      "A Neo4j graph linking locations, assets and tags with pump cycles, daily pump efficiency, hourly water level and rainfall, flood events, logbook entries and damage reports.",
      "LLM answers via Ollama or Groq per request, with prompts that change by question type, returned with sources and the Cypher trail.",
      "Document upload and ingestion from the UI, OCR for scanned SOP PDFs, and n8n workflows for scheduled ingestion and sending answers to WhatsApp.",
      "Answer-quality evaluation with RAGAS and AI Verify Moonshot benchmarks.",
    ],
    diagram: [
      { label: "SCADA & historians", sub: "TDengine, MongoDB" },
      { label: "Ingest", sub: "n8n, OCR, chunking" },
      { label: "Stores", sub: "MongoDB + Zilliz + Neo4j" },
      { label: "Router", sub: "MCP tools or hybrid retrieval" },
      { label: "LLM", sub: "Ollama / Groq" },
      { label: "Chat UI", sub: "answer + sources" },
    ],
    diagramNote:
      "Real-time and graph questions go through MCP tools; SOP and regulation questions go through hybrid retrieval. Both meet in one prompt.",
    highlights: [
      { value: "5", label: "question domains" },
      { value: "460+", label: "commits" },
      { value: "1024-d", label: "bge-m3 embeddings" },
      { value: "3", label: "MCP tool servers" },
    ],
  },
  {
    slug: "flood-knowledge-graph",
    tag: "Knowledge graph",
    art: "graph",
    title: "Flood-Control Knowledge Graph",
    client: water,
    role: "Main developer",
    start: "2026-06",
    period: "Jun 2026 — Present",
    summary: "A Neo4j knowledge graph of pump stations with energy-efficiency analysis, flood early warning and role-aware Graph-RAG chat.",
    stack: ["TypeScript", "Next.js", "Express", "Neo4j GDS", "MongoDB", "Leaflet", "Cytoscape", "Gemini", "MCP", "Turborepo"],
    problem:
      "Pump-station data sat in SCADA historians and spreadsheets as flat tag lists. There was no single model of how areas, stations, pumps and sensors relate, so questions about energy use or flood risk had no good place to be answered.",
    built: [
      "A pnpm + Turborepo monorepo with an Express API, a Next.js dashboard and shared packages for the graph schema, an MCP server and types.",
      "A seeding pipeline from the master tag workbook into Neo4j, plus ETL from the MongoDB historian.",
      "Pump energy-efficiency analysis from current, power and water-level telemetry.",
      "Early warning from water level and rainfall, with alerts to Telegram, email and n8n webhooks.",
      "Graph-RAG chat with Gemini, limited by role-based access control and showing a mini graph for each answer.",
    ],
    diagram: [
      { label: "SCADA HMI", sub: "+ tag workbook" },
      { label: "MongoDB historian" },
      { label: "Neo4j graph", sub: "GDS" },
      { label: "Express API", sub: "+ MCP server" },
      { label: "Next.js dashboard", sub: "Graph-RAG chat (Gemini)" },
    ],
    diagramNote: "Raw telemetry stays in MongoDB; the graph holds structure and aggregates, and every UI view and chat answer reads from it.",
    highlights: [
      { value: "154", label: "pumps" },
      { value: "46", label: "locations modelled" },
      { value: "3", label: "use cases" },
      { value: "220+", label: "commits" },
    ],
  },
  {
    slug: "visual-etl",
    tag: "Healthcare · Data",
    art: "flow",
    title: "Visual ETL Platform for Health Data",
    client: clinics,
    role: "Developer",
    start: "2026-04",
    period: "Apr — Jul 2026",
    summary: "Drag-and-drop mapping of clinic CSV/API data onto a Neo4j schema, with an LLM copilot that can call MCP tools.",
    stack: ["Next.js 16", "React 19", "React Flow", "Three.js", "Express", "Prisma", "PostgreSQL", "Neo4j", "Milvus", "MCP", "n8n"],
    problem:
      "Clinic data from SIMPUS exports and APIs had to be loaded into a Neo4j graph for analysis. Writing Cypher by hand for every new source was slow and error-prone, especially for people who are not developers.",
    built: [
      "A node editor (React Flow) to map source columns onto graph labels and relationships.",
      "Generation of idempotent Cypher so pipelines can be re-run safely.",
      "A chatbot copilot with tool calling over internal tools and user-registered external MCP servers.",
      "RAG over an uploaded document knowledge base backed by Milvus.",
      "Graceful degradation when external services (MCP server, n8n) are unreachable.",
    ],
    diagram: [
      { label: "CSV / API sources", sub: "SIMPUS" },
      { label: "Visual mapper", sub: "React Flow" },
      { label: "Cypher generator", sub: "idempotent" },
      { label: "Neo4j" },
      { label: "LLM copilot", sub: "MCP tools + Milvus RAG" },
    ],
    diagramNote: "The mapping is the single source; Cypher is generated from it, so the same pipeline can run again without duplicating data.",
    highlights: [
      { value: "160+", label: "commits" },
      { value: "3", label: "workspace packages" },
    ],
  },
  {
    slug: "scada-tag-master",
    tag: "Water · SCADA",
    art: "grid",
    title: "SCADA Tag Master Data",
    client: water,
    role: "Developer",
    start: "2026-07",
    period: "Jul 2026 — Present",
    summary: "One source of truth for flood-control SCADA tags, from area down to individual sensor, mapped to where their history lives.",
    stack: ["Express", "MongoDB", "Mongoose", "TypeScript", "React", "Vite", "Tailwind CSS", "shadcn/ui", "PM2"],
    problem:
      "Thousands of SCADA tags were tracked in one spreadsheet with a sheet per location. Other systems (RAG, knowledge graph, dashboards) needed a reliable, queryable reference for which tag belongs to which asset and where its history is stored.",
    built: [
      "Seeded the workbook into MongoDB once; the database then became the source of truth, with management of areas, locations, buildings, assets and tags.",
      "A historian API mapping master tags to four MongoDB historian databases (water level, pumps, rainfall) and to live OPC UA values in TDengine, documented with Swagger.",
      "A React dashboard to browse and edit the hierarchy.",
      "A production deploy runbook for a single Node process on PM2.",
    ],
    diagram: [
      { label: "Tag workbook", sub: "one-time seed" },
      { label: "MongoDB master data" },
      { label: "Express API", sub: "Swagger" },
      { label: "Historian lookup", sub: "MongoDB + TDengine" },
      { label: "React dashboard" },
    ],
    diagramNote: "Area → location → building → asset → tag, with each tag pointing to the historian collection and column that stores its values.",
    highlights: [
      { value: "5,045", label: "tags" },
      { value: "403", label: "assets" },
      { value: "46", label: "locations" },
      { value: "24", label: "areas" },
    ],
  },
  {
    slug: "clinical-decision-support",
    tag: "Healthcare",
    art: "pulse",
    title: "Clinical Decision Support for Primary Care",
    client: clinics,
    role: "Developer",
    start: "2026-03",
    period: "Mar — May 2026",
    summary: "Decision support for clinic staff: patient records, drug checks, similar-case search and an MCP server over a clinical knowledge graph.",
    stack: ["Next.js", "shadcn/ui", "Neo4j", "MCP", "Gemini", "Redis"],
    problem:
      "Clinic staff record visits in SIMPUS but get little help at the point of care: no drug-allergy warnings, no view of similar past cases and no quick population overview.",
    built: [
      "Patient, visit and medical-record screens with an audit trail.",
      "Drug checks for allergies and interactions, and similar-case search.",
      "ICD-10 coded diagnoses with INA-CBG reference data, and analytics including cost variance.",
      "An MCP server exposing the clinical Neo4j graph as tools: read-only Cypher, schema, patient search and profile, population stats, top diseases, comorbidity network, screening summary, visit trends and high-risk patients.",
      "AI assistance with Gemini, plus an agentic command center with clinical entity extraction.",
    ],
    diagram: [
      { label: "SIMPUS records" },
      { label: "Neo4j clinical graph" },
      { label: "MCP server", sub: "10 tools" },
      { label: "CDSS API", sub: "Gemini" },
      { label: "Clinic web app" },
    ],
    diagramNote: "The same graph serves the clinic app and any MCP-capable assistant, with read-only access for ad-hoc queries.",
    highlights: [{ value: "10", label: "MCP tools" }],
  },
  {
    slug: "rainfall-nowcasting",
    tag: "Water · Weather",
    art: "radar",
    title: "Rainfall Radar Detection & Nowcasting",
    client: water,
    role: "Developer",
    start: "2025-10",
    period: "Oct 2025 — Present",
    summary: "Captures BMKG weather-radar images, reads rainfall per pump-station location and tracks forecast accuracy over time.",
    stack: ["Next.js", "Leaflet", "MongoDB", "Python", "OpenCV"],
    problem:
      "Pump operators react to rain they can already see. Public radar and forecasts exist, but nothing turned them into per-location rainfall numbers that could be stored, compared and used ahead of time.",
    built: [
      "Scheduled capture of BMKG radar imagery and per-location rainfall detection, stored in MongoDB.",
      "Forecast-versus-actual comparison and accuracy tracking, with historical backfill from Open-Meteo.",
      "Map views (Leaflet, KML locations) and scheduled sync of pump status data.",
      "A Python nowcasting prototype using DualTVL1 optical flow to extrapolate radar 10–180 minutes ahead in 10-minute steps.",
    ],
    diagram: [
      { label: "BMKG radar", sub: "scheduled capture" },
      { label: "Rain detection", sub: "per location" },
      { label: "MongoDB" },
      { label: "Optical-flow nowcast", sub: "Python, OpenCV" },
      { label: "Dashboard", sub: "Next.js, Leaflet" },
    ],
    diagramNote: "Every capture is stored, so forecasts can be scored against what actually fell.",
    highlights: [
      { value: "10–180 min", label: "nowcast horizon" },
      { value: "10 min", label: "forecast step" },
    ],
    prototype: "Nowcasting (10–180 min) is a prototype",
  },
];

export const other: OtherProject[] = [
  { year: "2026", title: "Plantation Analytics Chatbot & MCP Server", stack: "Next.js · Express · PostgreSQL · Neo4j · MCP" },
  { year: "2025", title: "Multimodal RAG for Medical Records", stack: "Python · Streamlit · FAISS" },
  { year: "2025", title: "University Academic & Admission Systems", stack: "Next.js · TypeScript · Tailwind CSS" },
  { year: "2025", title: "AI Clinical Tutor", stack: "Django · Transformers · Redis" },
  { year: "2026", title: "Travel Agency Website + CMS", stack: "Next.js · Prisma · shadcn/ui" },
  { year: "2026", title: "Internal App Launcher", stack: "Tauri · React · Vite" },
  { year: "2024", title: "REST vs tRPC Performance Study (thesis)", stack: "Next.js · tRPC · Prisma · JMeter", href: "https://github.com/syahrilr/tugas-akhir-rest-trpc" },
  { year: "2021", title: "Agreement Management System", stack: "Laravel", href: "https://github.com/fznrl/aplikasi-rekapan-perjanjian" },
];

// Timeline groups: newest year first, newest start first within a year.
export function groupByYear(projects: Project[]) {
  const sorted = [...projects].sort((a, b) => b.start.localeCompare(a.start));
  const years = [...new Set(sorted.map((p) => p.start.slice(0, 4)))];
  return years.map((year) => ({ year, items: sorted.filter((p) => p.start.startsWith(year)) }));
}

export const getProject = (slug: string) => featured.find((p) => p.slug === slug);
