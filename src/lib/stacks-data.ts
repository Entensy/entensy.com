// ---- Available icon keys for the `icon` field -----------------------------------------
// Must be a key registered in src/lib/icon-registry.ts.
// Use "" (empty string) for a text-only badge with no icon.
//
// react-icons/si
//   Languages:  SiPython , SiJavascript , SiTypescript , SiGo , SiPhp
//               SiRust , SiRuby , SiSwift , SiDart , SiScala , SiElixir , SiHaskell
//   Frontend:   SiReact , SiVuedotjs , SiNextdotjs , SiNuxt , SiAngular , SiSvelte
//               SiAstro , SiSolid , SiVite , SiTailwindcss , SiBootstrap , SiSass
//               SiRedux , SiThreedotjs , SiWebassembly , SiWebpack , SiFramer
//               SiGreensock , SiElectron , SiStorybook , SiAlpinedotjs , SiInertia
//   Backend:    SiNodedotjs , SiLaravel , SiNestjs , SiDjango , SiFastapi , SiFlask
//               SiSpring , SiExpress , SiRubyonrails , SiPostman , SiGraphql
//   Databases:  SiPostgresql , SiMysql , SiMongodb , SiRedis , SiFirebase , SiSupabase
//               SiMariadb , SiApachecassandra , SiSqlite , SiElasticsearch
//   Mobile:     SiFlutter , SiIonic , SiExpo , SiKotlin
//   DevOps:     SiDocker , SiKubernetes , SiTerraform , SiGooglecloud , SiNginx
//               SiApachekafka , SiGit , SiJenkins , SiAnsible , SiGithubactions
//               SiPrometheus , SiGrafana ,SiLinux ,SiVercel ,SiNetlify ,SiHeroku
//              SiCloudflare ,SiStripe
//   Game / 3D:  SiUnity , SiUnrealengine , SiGodotengine , SIBlender , SIOpengl
//               SiVulkan , SiSteam , SiSketch , SiCanva
// react-icons/fa
//   FaJava , FaAws , FaDatabase
// devicon (custom SVG - sourced from @iconify-json/devicon)
//   DeviconCsharp , DeviconIllustrator , DeviconC , DeviconCplusplus , DeviconFigma
// ---------------------------------------------------------------------------------------

export interface TechItem {
  name: string;
  icon: string; // react-icons/si or react-icons/fa icon name, or "" for no icon
  color: string;
  bgColor: string;
}

export interface StackCategory {
  id: string;
  labelKey: string;
  color: string;
  items: TechItem[];
}

export const stackCategories: StackCategory[] = [
  {
    id: "languages",
    labelKey: "stacks.categories.languages",
    color: "#3178C6",
    items: [
      { name: "PHP", icon: "SiPhp", color: "#777BB4", bgColor: "rgba(119,123,180,0.1)" },
      { name: "Python", icon: "SiPython", color: "#3776AB", bgColor: "rgba(55,118,171,0.1)" },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", bgColor: "rgba(247,223,30,0.1)" },
      { name: "Go", icon: "SiGo", color: "#00ACD7", bgColor: "rgba(0,172,215,0.1)" },
      { name: "C#", icon: "DeviconCsharp", color: "#9B59D7", bgColor: "rgba(155,89,215,0.1)" },
      { name: "Dart", icon: "SiDart", color: "#FF5D01", bgColor: "rgba(255,93,1,0.1)" },
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", bgColor: "rgba(49,120,198,0.1)" },
      { name: "Swift", icon: "SiSwift", color: "#F05138", bgColor: "rgba(240,81,56,0.1)" },
    ],
  },
  {
    id: "frontend",
    labelKey: "stacks.categories.frontend",
    color: "#61DAFB",
    items: [
      // Frameworks & Libraries
      { name: "React", icon: "SiReact", color: "#61DAFB", bgColor: "rgba(97,218,251,0.1)" },
      { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF", bgColor: "rgba(255,255,255,0.08)" },
      { name: "Vue.js", icon: "SiVuedotjs", color: "#4FC08D", bgColor: "rgba(79,192,141,0.1)" },
      { name: "Nuxt.js", icon: "SiNuxt", color: "#00DC82", bgColor: "rgba(0,220,130,0.1)" },
      { name: "Svelte", icon: "SiSvelte", color: "#FF3E00", bgColor: "rgba(255,62,0,0.1)" },
      { name: "Solid.js", icon: "SiSolid", color: "#4F88C6", bgColor: "rgba(79,136,198,0.1)" },
      { name: "Alpine.js", icon: "SiAlpinedotjs", color: "#77C1D2", bgColor: "rgba(119,193,210,0.1)" },
      { name: "Inertia.js", icon: "SiInertia", color: "#9553E9", bgColor: "rgba(149,83,233,0.1)" },

      // Meta Frameworks
      { name: "Astro", icon: "SiAstro", color: "#FF5D01", bgColor: "rgba(255,93,1,0.1)" },

      // Styling
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4", bgColor: "rgba(6,182,212,0.1)" },
      { name: "Bootstrap", icon: "SiBootstrap", color: "#7952B3", bgColor: "rgba(121,82,179,0.1)" },
      { name: "SASS/SCSS", icon: "SiSass", color: "#CC6699", bgColor: "rgba(204,102,153,0.1)" },

      // Build Tools
      { name: "Vite", icon: "SiVite", color: "#646CFF", bgColor: "rgba(100,108,255,0.1)" },
      { name: "Webpack", icon: "SiWebpack", color: "#6D9FD1", bgColor: "rgba(109,159,209,0.1)" },

      // Animation
      { name: "Framer Motion", icon: "SiFramer", color: "#0055FF", bgColor: "rgba(0,85,255,0.1)" },
      { name: "GSAP", icon: "SiGreensock", color: "#88CE02", bgColor: "rgba(136,206,2,0.1)" },

      // 3D & Performance
      { name: "Three.js", icon: "SiThreedotjs", color: "#049EF4", bgColor: "rgba(4,158,244,0.1)" },
      { name: "WebAssembly", icon: "SiWebassembly", color: "#654FF0", bgColor: "rgba(101,79,240,0.1)" },

      // Desktop & DX
      { name: "Electron", icon: "SiElectron", color: "#47848F", bgColor: "rgba(71,132,143,0.1)" },
      { name: "Storybook", icon: "SiStorybook", color: "#FF4785", bgColor: "rgba(255,71,133,0.1)" },
    ],
  },
  {
    id: "backend",
    labelKey: "stacks.categories.backend",
    color: "#68A063",
    items: [
      // Runtime / Backend JS
      { name: "Node.js", icon: "SiNodedotjs", color: "#339933", bgColor: "rgba(51,153,51,0.1)" },
      { name: "Express.js", icon: "SiExpress", color: "#9E9E9E", bgColor: "rgba(158,158,158,0.1)" },
      { name: "NestJS", icon: "SiNestjs", color: "#E0234E", bgColor: "rgba(224,35,78,0.1)" },

      // PHP Ecosystem
      { name: "Laravel", icon: "SiLaravel", color: "#FF2D20", bgColor: "rgba(255,45,32,0.1)" },

      // Python Ecosystem
      { name: "Django", icon: "SiDjango", color: "#44B78B", bgColor: "rgba(68,183,139,0.1)" },
      { name: "FastAPI", icon: "SiFastapi", color: "#009688", bgColor: "rgba(0,150,136,0.1)" },
      { name: "Flask", icon: "SiFlask", color: "#9E9E9E", bgColor: "rgba(158,158,158,0.1)" },

      // APIs & Data Layer
      { name: "REST APIs", icon: "SiPostman", color: "#FF6C37", bgColor: "rgba(255,108,55,0.1)" },
      { name: "GraphQL", icon: "SiGraphql", color: "#E10098", bgColor: "rgba(225,0,152,0.1)" },
    ],
  },
  {
    id: "databases",
    labelKey: "stacks.categories.databases",
    color: "#336791",
    items: [
      // Relational Databases (SQL)
      { name: "PostgreSQL", icon: "SiPostgresql", color: "#336791", bgColor: "rgba(51,103,145,0.1)" },
      { name: "MySQL", icon: "SiMysql", color: "#4479A1", bgColor: "rgba(68,121,161,0.1)" },
      { name: "MariaDB", icon: "SiMariadb", color: "#1E8CAE", bgColor: "rgba(30,140,174,0.1)" },
      { name: "SQLite", icon: "SiSqlite", color: "#2E7ED6", bgColor: "rgba(46,126,214,0.1)" },
      { name: "SQL Server", icon: "FaDatabase", color: "#CC2927", bgColor: "rgba(204,41,39,0.1)" },

      // NoSQL Databases
      { name: "MongoDB", icon: "SiMongodb", color: "#47A248", bgColor: "rgba(71,162,72,0.1)" },
      { name: "Cassandra", icon: "SiApachecassandra", color: "#1287B1", bgColor: "rgba(18,135,177,0.1)" },

      // Cache / In-memory
      { name: "Redis", icon: "SiRedis", color: "#DC382D", bgColor: "rgba(220,56,45,0.1)" },

      // Backend-as-a-Service (BaaS)
      { name: "Firebase", icon: "SiFirebase", color: "#FFCA28", bgColor: "rgba(255,202,40,0.1)" },
      { name: "Supabase", icon: "SiSupabase", color: "#3ECF8E", bgColor: "rgba(62,207,142,0.1)" },

      // Search / Indexing
      { name: "ElasticSearch", icon: "SiElasticsearch", color: "#FEC514", bgColor: "rgba(254,197,20,0.1)" },
      { name: "OpenSearch", icon: "SiElasticsearch", color: "#FEC514", bgColor: "rgba(254,197,20,0.1)" },
    ],
  },
  {
    id: "mobile",
    labelKey: "stacks.categories.mobile",
    color: "#61DAFB",
    items: [
      // Cross-platform Frameworks
      { name: "React Native", icon: "SiReact", color: "#61DAFB", bgColor: "rgba(97,218,251,0.1)" },
      { name: "Flutter", icon: "SiFlutter", color: "#02569B", bgColor: "rgba(2,86,155,0.1)" },
      { name: "Ionic", icon: "SiIonic", color: "#3880FF", bgColor: "rgba(56,128,255,0.1)" },

      // Tooling / Ecosystem
      { name: "Expo", icon: "SiExpo", color: "#9B9B9B", bgColor: "rgba(155,155,155,0.1)" },
    ],
  },
  {
    id: "devops",
    labelKey: "stacks.categories.devops",
    color: "#F05032",
    items: [
      // Cloud Providers
      { name: "AWS", icon: "FaAws", color: "#FF9900", bgColor: "rgba(255,153,0,0.1)" },

      // Containers & Orchestration
      { name: "Docker", icon: "SiDocker", color: "#2496ED", bgColor: "rgba(36,150,237,0.1)" },
      { name: "Kubernetes", icon: "SiKubernetes", color: "#326CE5", bgColor: "rgba(50,108,229,0.1)" },

      // Infrastructure as Code / Automation
      { name: "Terraform", icon: "SiTerraform", color: "#7B42BC", bgColor: "rgba(123,66,188,0.1)" },
      { name: "Ansible", icon: "SiAnsible", color: "#EE0000", bgColor: "rgba(238,0,0,0.1)" },

      // CI/CD
      { name: "CI/CD", icon: "SiGithubactions", color: "#2088FF", bgColor: "rgba(32,136,255,0.1)" },
      { name: "Jenkins", icon: "SiJenkins", color: "#D24939", bgColor: "rgba(210,73,57,0.1)" },

      // Observability / Monitoring
      { name: "Prometheus", icon: "SiPrometheus", color: "#E6522C", bgColor: "rgba(230,82,44,0.1)" },
      { name: "Grafana", icon: "SiGrafana", color: "#F46800", bgColor: "rgba(244,104,0,0.1)" },

      // Networking / Servers
      { name: "Nginx", icon: "SiNginx", color: "#009639", bgColor: "rgba(0,150,57,0.1)" },
      { name: "Apache Kafka", icon: "SiApachekafka", color: "#D83B3B", bgColor: "rgba(216,59,59,0.1)" },

      // Developer Tools
      { name: "Git", icon: "SiGit", color: "#F05032", bgColor: "rgba(240,80,50,0.1)" },
      { name: "Linux", icon: "SiLinux", color: "#FCC624", bgColor: "rgba(252,198,36,0.1)" },

      // Hosting / Deployment Platforms
      { name: "Vercel", icon: "SiVercel", color: "#EEEEEE", bgColor: "rgba(238,238,238,0.06)" },
      { name: "Netlify", icon: "SiNetlify", color: "#00C7B7", bgColor: "rgba(0,199,183,0.1)" },
      { name: "Heroku", icon: "SiHeroku", color: "#9B87CF", bgColor: "rgba(155,135,207,0.1)" },

      // Edge / Security / Payments
      { name: "Cloudflare", icon: "SiCloudflare", color: "#F38020", bgColor: "rgba(243,128,32,0.1)" },
      { name: "Stripe", icon: "SiStripe", color: "#635BFF", bgColor: "rgba(99,91,255,0.1)" },
    ],
  },
];
