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
//             "Framer Motion" , "GSAP" , "Electron" , "Storybook" , "Alpine.js" , "Inertia.js"
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
    id: "procurement-erp",
    titleKey: "projects.procurement_erp.title",
    descKey: "projects.procurement_erp.desc",
    gradient: "from-[#3B82F6]/20 to-[#7C3AED]/20",
    stacks: ["PHP", "Laravel", "Tailwind CSS", "Vite", "MySQL"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "queue-ticketing",
    titleKey: "projects.queue_ticketing.title",
    descKey: "projects.queue_ticketing.desc",
    gradient: "from-[#10B981]/20 to-[#06B6D4]/20",
    stacks: ["PHP", "Laravel", "Tailwind CSS", "Vite", "MySQL", "Redis"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "retail-pos",
    titleKey: "projects.retail_pos.title",
    descKey: "projects.retail_pos.desc",
    gradient: "from-[#F59E0B]/20 to-[#EF4444]/20",
    stacks: ["PHP", "Laravel", "Alpine.js", "Tailwind CSS", "Vite", "MySQL", "Docker"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "project-finance",
    titleKey: "projects.project_finance.title",
    descKey: "projects.project_finance.desc",
    gradient: "from-[#8B5CF6]/20 to-[#EC4899]/20",
    stacks: ["PHP", "Laravel", "Alpine.js", "Tailwind CSS", "Vite", "MySQL"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "real-estate",
    titleKey: "projects.real_estate.title",
    descKey: "projects.real_estate.desc",
    gradient: "from-[#C9A84C]/20 to-[#10B981]/20",
    stacks: ["PHP", "Laravel", "Tailwind CSS", "Vite", "MySQL", "Docker"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "restaurant-qr",
    titleKey: "projects.restaurant_qr.title",
    descKey: "projects.restaurant_qr.desc",
    gradient: "from-[#FC002A]/20 to-[#F59E0B]/20",
    stacks: ["PHP", "JavaScript", "Laravel", "Vue.js", "MySQL", "Stripe"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "digital-book",
    titleKey: "projects.digital_book.title",
    descKey: "projects.digital_book.desc",
    gradient: "from-[#06B6D4]/20 to-[#8B5CF6]/20",
    stacks: ["PHP", "TypeScript", "Laravel", "Inertia.js", "Svelte", "Tailwind CSS", "Vite", "GSAP", "SQLite", "Stripe"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "electronics-ecommerce",
    titleKey: "projects.electronics_ecommerce.title",
    descKey: "projects.electronics_ecommerce.desc",
    gradient: "from-[#3B82F6]/20 to-[#06B6D4]/20",
    stacks: ["PHP", "JavaScript", "Laravel", "Vue.js", "Inertia.js", "Tailwind CSS", "Vite", "MySQL"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "bookstore",
    titleKey: "projects.bookstore.title",
    descKey: "projects.bookstore.desc",
    gradient: "from-[#EC4899]/20 to-[#C9A84C]/20",
    stacks: ["PHP", "Laravel", "Alpine.js", "Tailwind CSS", "Vite", "MySQL"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "login-tracking",
    titleKey: "projects.login_tracking.title",
    descKey: "projects.login_tracking.desc",
    gradient: "from-[#EF4444]/20 to-[#7C3AED]/20",
    stacks: ["PHP", "Laravel", "Alpine.js", "Tailwind CSS", "Vite", "MySQL"],
    visitUrl: undefined,
    githubUrl: undefined,
  },
];
