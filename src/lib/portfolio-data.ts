// ---- Available stack name strings for the `stacks` array ------------------------------
// This is a curated list of popular technologies. You can add any string you want, but
// only the ones listed below will show an icon and color. The rest will render as plain
// Each string must match a TechItem.name defined in stacks-data.ts to show
// its icon and color. Any other string is allowed - it renders as a plain
// text pill with no icon.
//
// Languages:  "C#" , "Java" , "Python" , "C" , "C++" , "JavaScript" , "TypeScript"
//             "Go" , "PHP" , "Rust" , "Ruby" , "Swift" , "Dart" , "Scala"
//             "Elixir" , "Haskell"
// Frontend:   "React" , "Vue.js" , "Next.js" , "Nuxt.js" , "Angular" , "Svelte"
//             "Astro" , "Solid.js" , "Vite" , "Tailwind CSS" , "Bootstrap"
//             "SASS/SCSS" , "Redux" , "Three.js" , "WebAssembly" , "Webpack"
//             "Framer Motion" , "GSAP" , "Electron" , "Storybook"
// Backend:    "Node.js" , "Laravel" , "NestJS" , "Django" , "FastAPI" , "Flask"
//             "Spring" , "Express.js" , "Ruby on Rails" , "REST APIs" , "GraphQL"
// Databases:  "PostgreSQL" , "MySQL" , "MongoDB" , "Redis" , "Firebase" , "Supabase"
//             "MariaDB" , "Cassandra" , "SQLite" , "Elasticsearch" , "SQL Server"
// Mobile:     "React Native" , "Flutter" , "Ionic" , "Expo" , "Kotlin" , "Swift (iOS)"
// DevOps:     "Docker" , "Kubernetes" , "Terraform" , "AWS" , "GCP" , "Azure"
//             "Nginx" , "Apache Kafka" , "Git" , "Jenkins" , "Ansible" , "CI/CD"
//             "Prometheus" , "Grafana" , "Linux" , "Vercel" , "Netlify" , "Heroku"
//             "Cloudflare" , "Stripe"
// Game / 3D:  "Unity" , "Unreal Engine" , "Godot" , "Blender" , "OpenGL" , "Vulkan"
//             "Steam"
// Design:     "Figma" , "Illustrator" , "Sketch" , "Canva"
// ---------------------------------------------------------------------------------------

export interface PortfolioProject {
  id: string;
  titleKey: string;
  descKey: string;
  image?: string;
  gradient: string;
  stacks: string[];
  visitUrl?: string;
  githubUrl?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "ecommerce-platform",
    titleKey: "projects.ecommerce.title",
    descKey: "projects.ecommerce.desc",
    gradient: "from-[#FC002A]/20 to-[#7C3AED]/20",
    stacks: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Astro"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "admin-dashboard",
    titleKey: "projects.dashboard.title",
    descKey: "projects.dashboard.desc",
    gradient: "from-[#3B82F6]/20 to-[#06B6D4]/20",
    stacks: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    visitUrl: "#",
    githubUrl: undefined,
  },
  {
    id: "mobile-banking",
    titleKey: "projects.banking.title",
    descKey: "projects.banking.desc",
    gradient: "from-[#10B981]/20 to-[#3B82F6]/20",
    stacks: ["React Native", "GraphQL", "Node.js", "PostgreSQL"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "saas-analytics",
    titleKey: "projects.analytics.title",
    descKey: "projects.analytics.desc",
    gradient: "from-[#C9A84C]/20 to-[#F59E0B]/20",
    stacks: ["Vue.js", "Laravel", "MySQL", "Docker"],
    visitUrl: "#",
    githubUrl: "#",
  },
  {
    id: "company-portal",
    titleKey: "projects.portal.title",
    descKey: "projects.portal.desc",
    gradient: "from-[#8B5CF6]/20 to-[#EC4899]/20",
    stacks: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    visitUrl: undefined,
    githubUrl: "#",
  },
  {
    id: "booking-system",
    titleKey: "projects.booking.title",
    descKey: "projects.booking.desc",
    gradient: "from-[#06B6D4]/20 to-[#3B82F6]/20",
    stacks: ["React", "Node.js", "MySQL", "REST API"],
    visitUrl: "#",
    githubUrl: undefined,
  },
  {
    id: "crm-system",
    titleKey: "projects.crm.title",
    descKey: "projects.crm.desc",
    gradient: "from-[#EC4899]/20 to-[#FC002A]/20",
    stacks: ["React", "Laravel", "PostgreSQL", "Docker"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
];
