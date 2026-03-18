// lib/data.ts
// ============================================================
// ALL PORTFOLIO CONTENT LIVES HERE — Easy to edit!
// ============================================================

export const personalInfo = {
  name: "Alex Chen",
  firstName: "Alex",
  role: "Full Stack Developer",
  tagline: "Aspiring AI Engineer",
  email: "alex@example.com",
  phone: "+1 (555) 000-0000",
  location: "Your Country",
  github: "https://github.com/alexchen",
  linkedin: "https://linkedin.com/in/alexchen",
  twitter: "https://twitter.com/alexchen",
  resumeUrl: "/resume.pdf",
  bio: [
    "Hey! I'm Alex, a passionate Full Stack Developer with a deep interest in building products that make a difference. I specialize in the MERN stack and Next.js, creating everything from dynamic web apps to RESTful APIs.",
    "My current focus is expanding into AI and Machine Learning — I believe the future of software is intelligent, and I want to be at the forefront of that shift. I'm actively looking for internships or junior developer roles where I can contribute, learn, and grow.",
    "When I'm not coding, you'll find me exploring new tech papers, contributing to open source, or experimenting with side projects.",
  ],
  availability: "Open to Opportunities",
  education: "B.Sc. Computer Science",
};

// ---- SKILLS ----

export interface Skill {
  icon: string;
  title: string;
  items: string[];
}

export const skills: Skill[] = [
  {
    icon: "⚛️",
    title: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "JavaScript (ES6+)", "TypeScript", "HTML5 / CSS3", "Redux", "Framer Motion"],
  },
  {
    icon: "⚙️",
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "GraphQL", "JWT Auth", "Socket.io", "Mongoose"],
  },
  {
    icon: "🗄️",
    title: "Database & Cloud",
    items: ["MongoDB", "PostgreSQL", "Redis", "Firebase", "AWS (basics)", "Vercel", "Docker"],
  },
  {
    icon: "🤖",
    title: "AI / Machine Learning",
    items: ["Python", "scikit-learn", "TensorFlow (basics)", "OpenAI API", "LangChain", "pandas / numpy"],
  },
  {
    icon: "🛠️",
    title: "Tools & DevOps",
    items: ["Git / GitHub", "VS Code", "Postman", "Linux/CLI", "CI/CD", "Nginx"],
  },
  {
    icon: "🎨",
    title: "Design & Soft Skills",
    items: ["Figma", "Responsive Design", "UX Principles", "Problem Solving", "Team Collaboration", "Agile / Scrum"],
  },
];

// ---- PROJECTS ----

export interface Project {
  emoji: string;
  badge: string;
  thumbClass: string;
  title: string;
  description: string;
  features: string[];
  stack: string[];
  liveUrl: string;
  liveLabel: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    emoji: "🛒",
    badge: "Full-Stack MERN",
    thumbClass: "thumb-1",
    title: "ShopSphere — E-Commerce Platform",
    description:
      "A production-ready e-commerce platform with real-time inventory, Stripe payments, admin dashboard, and JWT-secured REST API.",
    features: [
      "User auth with JWT + refresh tokens",
      "Stripe payment integration",
      "Real-time order tracking via Socket.io",
      "Admin dashboard with analytics",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Stripe", "Redux"],
    liveUrl: "https://shopsphere.vercel.app",
    liveLabel: "Live Demo",
    githubUrl: "https://github.com/alexchen/shopsphere",
  },
  {
    emoji: "🤖",
    badge: "AI / ML",
    thumbClass: "thumb-2",
    title: "AskDocs — AI Document Q&A",
    description:
      "Upload any PDF/document and ask questions in natural language. Powered by LangChain, OpenAI embeddings, and a React frontend with streaming responses.",
    features: [
      "RAG pipeline with vector embeddings",
      "Streaming AI responses (SSE)",
      "Multi-document conversation context",
      "Document parsing & chunking",
    ],
    stack: ["Next.js", "LangChain", "OpenAI API", "Pinecone", "Python", "FastAPI"],
    liveUrl: "https://askdocs.vercel.app",
    liveLabel: "Live Demo",
    githubUrl: "https://github.com/alexchen/askdocs",
  },
  {
    emoji: "🔌",
    badge: "REST API",
    thumbClass: "thumb-3",
    title: "DevHub API — Developer Platform",
    description:
      "A robust REST API for a developer community platform. Features full CRUD, rate limiting, API key management, and auto-generated Swagger docs.",
    features: [
      "Role-based access control (RBAC)",
      "API key auth with rate limiting",
      "Auto-generated Swagger/OpenAPI docs",
      "Redis caching & job queues",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Redis", "Swagger", "Jest"],
    liveUrl: "https://devhub-api.vercel.app/docs",
    liveLabel: "API Docs",
    githubUrl: "https://github.com/alexchen/devhub-api",
  },
];

// ---- EXPERIENCE ----

export interface ExperienceItem {
  emoji: string;
  role: string;
  company: string;
  companyType: string;
  period: string;
  description: string;
  tags: string[];
}

export const experiences: ExperienceItem[] = [
  {
    emoji: "💼",
    role: "Frontend Developer Intern",
    company: "TechStartup Co.",
    companyType: "Remote",
    period: "Jun 2024 – Present",
    description:
      "Built and maintained React-based customer-facing dashboards. Improved page load performance by 40% through code splitting and lazy loading. Collaborated with design team to implement pixel-perfect Figma-to-React components. Participated in daily standups and sprint planning.",
    tags: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
  },
  {
    emoji: "🎓",
    role: "Full Stack Development Bootcamp",
    company: "Codecademy / The Odin Project",
    companyType: "Online",
    period: "Jan 2024 – May 2024",
    description:
      "Completed an intensive 5-month full-stack curriculum covering the MERN stack, REST API design, database modeling, authentication, and deployment. Built 12+ projects, including a social media clone and a task management API.",
    tags: ["MERN Stack", "SQL", "Git", "Agile"],
  },
  {
    emoji: "🏫",
    role: "B.Sc. Computer Science",
    company: "University Name",
    companyType: "Your City",
    period: "2021 – Present",
    description:
      "Currently pursuing a degree in Computer Science with a focus on software engineering and data science. Relevant coursework: Data Structures, Algorithms, Database Systems, Machine Learning, Operating Systems. GPA: 3.6 / 4.0.",
    tags: ["Algorithms", "Machine Learning", "OS", "Networks"],
  },
];

// ---- STATS ----

export const githubStats = [
  { number: 47, label: "Repositories" },
  { number: 312, label: "Commits (2024)" },
  { number: 8, label: "PRs Merged" },
  { number: 124, label: "Stars Earned" },
];
