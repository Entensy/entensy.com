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
//               SiGreensock , SiElectron , SiStorybook
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
// devicon (custom SVG — sourced from @iconify-json/devicon)
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
      { name: "C#", icon: "DeviconCsharp", color: "#9B59D7", bgColor: "rgba(155,89,215,0.1)" },
      { name: "Java", icon: "FaJava", color: "#ED8B00", bgColor: "rgba(237,139,0,0.1)" },
      { name: "Python", icon: "SiPython", color: "#3776AB", bgColor: "rgba(55,118,171,0.1)" },
      { name: "C", icon: "DeviconC", color: "#5C87B2", bgColor: "rgba(92,135,178,0.1)" },
      { name: "C++", icon: "DeviconCplusplus", color: "#00599C", bgColor: "rgba(0,89,156,0.1)" },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", bgColor: "rgba(247,223,30,0.1)" },
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", bgColor: "rgba(49,120,198,0.1)" },
      { name: "Go", icon: "SiGo", color: "#00ACD7", bgColor: "rgba(0,172,215,0.1)" },
      { name: "PHP", icon: "SiPhp", color: "#777BB4", bgColor: "rgba(119,123,180,0.1)" },
      { name: "Rust", icon: "SiRust", color: "#CE422B", bgColor: "rgba(206,66,43,0.1)" },
      { name: "Ruby", icon: "SiRuby", color: "#CC342D", bgColor: "rgba(204,52,45,0.1)" },
      { name: "Swift", icon: "SiSwift", color: "#F05138", bgColor: "rgba(240,81,56,0.1)" },
      { name: "Dart", icon: "SiDart", color: "#0175C2", bgColor: "rgba(1,117,194,0.1)" },
      { name: "Scala", icon: "SiScala", color: "#DC322F", bgColor: "rgba(220,50,47,0.1)" },
      { name: "Elixir", icon: "SiElixir", color: "#9B59D7", bgColor: "rgba(155,89,215,0.1)" },
      { name: "Haskell", icon: "SiHaskell", color: "#9B7EE0", bgColor: "rgba(155,126,224,0.1)" },
    ],
  },
  {
    id: "frontend",
    labelKey: "stacks.categories.frontend",
    color: "#61DAFB",
    items: [
      // color is theme-aware: overridden in StacksSection (white dark / black light)
      { name: "React", icon: "SiReact", color: "#61DAFB", bgColor: "rgba(97,218,251,0.1)" },
      { name: "Vue.js", icon: "SiVuedotjs", color: "#4FC08D", bgColor: "rgba(79,192,141,0.1)" },
      { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF", bgColor: "rgba(255,255,255,0.08)" },
      { name: "Nuxt.js", icon: "SiNuxt", color: "#00DC82", bgColor: "rgba(0,220,130,0.1)" },
      { name: "Angular", icon: "SiAngular", color: "#DD0031", bgColor: "rgba(221,0,49,0.1)" },
      { name: "Svelte", icon: "SiSvelte", color: "#FF3E00", bgColor: "rgba(255,62,0,0.1)" },
      { name: "Astro", icon: "SiAstro", color: "#FF5D01", bgColor: "rgba(255,93,1,0.1)" },
      { name: "Solid.js", icon: "SiSolid", color: "#4F88C6", bgColor: "rgba(79,136,198,0.1)" },
      { name: "Vite", icon: "SiVite", color: "#646CFF", bgColor: "rgba(100,108,255,0.1)" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4", bgColor: "rgba(6,182,212,0.1)" },
      { name: "Bootstrap", icon: "SiBootstrap", color: "#7952B3", bgColor: "rgba(121,82,179,0.1)" },
      { name: "SASS/SCSS", icon: "SiSass", color: "#CC6699", bgColor: "rgba(204,102,153,0.1)" },
      { name: "Redux", icon: "SiRedux", color: "#764ABC", bgColor: "rgba(118,74,188,0.1)" },
      { name: "Three.js", icon: "SiThreedotjs", color: "#049EF4", bgColor: "rgba(4,158,244,0.1)" },
      { name: "WebAssembly", icon: "SiWebassembly", color: "#654FF0", bgColor: "rgba(101,79,240,0.1)" },
      { name: "Webpack", icon: "SiWebpack", color: "#6D9FD1", bgColor: "rgba(109,159,209,0.1)" },
      { name: "Framer Motion", icon: "SiFramer", color: "#0055FF", bgColor: "rgba(0,85,255,0.1)" },
      { name: "GSAP", icon: "SiGreensock", color: "#88CE02", bgColor: "rgba(136,206,2,0.1)" },
      { name: "Electron", icon: "SiElectron", color: "#47848F", bgColor: "rgba(71,132,143,0.1)" },
      { name: "Storybook", icon: "SiStorybook", color: "#FF4785", bgColor: "rgba(255,71,133,0.1)" },
    ],
  },
  {
    id: "backend",
    labelKey: "stacks.categories.backend",
    color: "#68A063",
    items: [
      { name: "Node.js", icon: "SiNodedotjs", color: "#339933", bgColor: "rgba(51,153,51,0.1)" },
      { name: "Laravel", icon: "SiLaravel", color: "#FF2D20", bgColor: "rgba(255,45,32,0.1)" },
      { name: "NestJS", icon: "SiNestjs", color: "#E0234E", bgColor: "rgba(224,35,78,0.1)" },
      { name: "Django", icon: "SiDjango", color: "#44B78B", bgColor: "rgba(68,183,139,0.1)" },
      { name: "FastAPI", icon: "SiFastapi", color: "#009688", bgColor: "rgba(0,150,136,0.1)" },
      // Flask & Express use neutral gray — their logos are black/white
      { name: "Flask", icon: "SiFlask", color: "#9E9E9E", bgColor: "rgba(158,158,158,0.1)" },
      { name: "Spring", icon: "SiSpring", color: "#6DB33F", bgColor: "rgba(109,179,63,0.1)" },
      { name: "Express.js", icon: "SiExpress", color: "#9E9E9E", bgColor: "rgba(158,158,158,0.1)" },
      { name: "Ruby on Rails", icon: "SiRubyonrails", color: "#CC0000", bgColor: "rgba(204,0,0,0.1)" },
      { name: "REST APIs", icon: "SiPostman", color: "#FF6C37", bgColor: "rgba(255,108,55,0.1)" },
      { name: "GraphQL", icon: "SiGraphql", color: "#E10098", bgColor: "rgba(225,0,152,0.1)" },
    ],
  },
  {
    id: "databases",
    labelKey: "stacks.categories.databases",
    color: "#336791",
    items: [
      { name: "PostgreSQL", icon: "SiPostgresql", color: "#336791", bgColor: "rgba(51,103,145,0.1)" },
      { name: "MySQL", icon: "SiMysql", color: "#4479A1", bgColor: "rgba(68,121,161,0.1)" },
      { name: "MongoDB", icon: "SiMongodb", color: "#47A248", bgColor: "rgba(71,162,72,0.1)" },
      { name: "Redis", icon: "SiRedis", color: "#DC382D", bgColor: "rgba(220,56,45,0.1)" },
      { name: "Firebase", icon: "SiFirebase", color: "#FFCA28", bgColor: "rgba(255,202,40,0.1)" },
      { name: "Supabase", icon: "SiSupabase", color: "#3ECF8E", bgColor: "rgba(62,207,142,0.1)" },
      { name: "MariaDB", icon: "SiMariadb", color: "#1E8CAE", bgColor: "rgba(30,140,174,0.1)" },
      { name: "Cassandra", icon: "SiApachecassandra", color: "#1287B1", bgColor: "rgba(18,135,177,0.1)" },
      { name: "SQLite", icon: "SiSqlite", color: "#2E7ED6", bgColor: "rgba(46,126,214,0.1)" },
      { name: "Elasticsearch", icon: "SiElasticsearch", color: "#FEC514", bgColor: "rgba(254,197,20,0.1)" },
      { name: "SQL Server", icon: "FaDatabase", color: "#CC2927", bgColor: "rgba(204,41,39,0.1)" },
    ],
  },
  {
    id: "mobile",
    labelKey: "stacks.categories.mobile",
    color: "#61DAFB",
    items: [
      { name: "React Native", icon: "SiReact", color: "#61DAFB", bgColor: "rgba(97,218,251,0.1)" },
      { name: "Flutter", icon: "SiFlutter", color: "#02569B", bgColor: "rgba(2,86,155,0.1)" },
      { name: "Ionic", icon: "SiIonic", color: "#3880FF", bgColor: "rgba(56,128,255,0.1)" },
      // Expo's official color is near-black — use neutral gray for visibility
      { name: "Expo", icon: "SiExpo", color: "#9B9B9B", bgColor: "rgba(155,155,155,0.1)" },
      { name: "Kotlin", icon: "SiKotlin", color: "#7F52FF", bgColor: "rgba(127,82,255,0.1)" },
      { name: "Swift (iOS)", icon: "SiSwift", color: "#F05138", bgColor: "rgba(240,81,56,0.1)" },
    ],
  },
  {
    id: "devops",
    labelKey: "stacks.categories.devops",
    color: "#F05032",
    items: [
      { name: "Docker", icon: "SiDocker", color: "#2496ED", bgColor: "rgba(36,150,237,0.1)" },
      { name: "Kubernetes", icon: "SiKubernetes", color: "#326CE5", bgColor: "rgba(50,108,229,0.1)" },
      { name: "Terraform", icon: "SiTerraform", color: "#7B42BC", bgColor: "rgba(123,66,188,0.1)" },
      { name: "AWS", icon: "FaAws", color: "#FF9900", bgColor: "rgba(255,153,0,0.1)" },
      { name: "GCP", icon: "SiGooglecloud", color: "#4285F4", bgColor: "rgba(66,133,244,0.1)" },
      // No SiMicrosoftazure in react-icons — badge renders name-only
      { name: "Azure", icon: "", color: "#0078D4", bgColor: "rgba(0,120,212,0.1)" },
      { name: "Nginx", icon: "SiNginx", color: "#009639", bgColor: "rgba(0,150,57,0.1)" },
      // Apache Kafka official color is near-black — use Apache red for visibility
      { name: "Apache Kafka", icon: "SiApachekafka", color: "#D83B3B", bgColor: "rgba(216,59,59,0.1)" },
      { name: "Git", icon: "SiGit", color: "#F05032", bgColor: "rgba(240,80,50,0.1)" },
      { name: "Jenkins", icon: "SiJenkins", color: "#D24939", bgColor: "rgba(210,73,57,0.1)" },
      { name: "Ansible", icon: "SiAnsible", color: "#EE0000", bgColor: "rgba(238,0,0,0.1)" },
      { name: "CI/CD", icon: "SiGithubactions", color: "#2088FF", bgColor: "rgba(32,136,255,0.1)" },
      { name: "Prometheus", icon: "SiPrometheus", color: "#E6522C", bgColor: "rgba(230,82,44,0.1)" },
      { name: "Grafana", icon: "SiGrafana", color: "#F46800", bgColor: "rgba(244,104,0,0.1)" },
      { name: "Linux", icon: "SiLinux", color: "#FCC624", bgColor: "rgba(252,198,36,0.1)" },
      // Vercel's official color is black — use near-white for dark-theme visibility
      { name: "Vercel", icon: "SiVercel", color: "#EEEEEE", bgColor: "rgba(238,238,238,0.06)" },
      { name: "Netlify", icon: "SiNetlify", color: "#00C7B7", bgColor: "rgba(0,199,183,0.1)" },
      // Heroku official purple is very dark — lightened for visibility
      { name: "Heroku", icon: "SiHeroku", color: "#9B87CF", bgColor: "rgba(155,135,207,0.1)" },
      { name: "Cloudflare", icon: "SiCloudflare", color: "#F38020", bgColor: "rgba(243,128,32,0.1)" },
      { name: "Stripe", icon: "SiStripe", color: "#635BFF", bgColor: "rgba(99,91,255,0.1)" },
    ],
  },
  {
    id: "gamedev",
    labelKey: "stacks.categories.gamedev",
    color: "#478CBF",
    items: [
      // Unity & Unreal official colors are near-black — adjusted for dark-theme visibility
      { name: "Unity", icon: "SiUnity", color: "#C8C8C8", bgColor: "rgba(200,200,200,0.07)" },
      { name: "Unreal Engine", icon: "SiUnrealengine", color: "#3E8CCB", bgColor: "rgba(62,140,203,0.1)" },
      { name: "Godot", icon: "SiGodotengine", color: "#478CBF", bgColor: "rgba(71,140,191,0.1)" },
      { name: "Blender", icon: "SiBlender", color: "#E87D0D", bgColor: "rgba(232,125,13,0.1)" },
      { name: "OpenGL", icon: "SiOpengl", color: "#5586A4", bgColor: "rgba(85,134,164,0.1)" },
      { name: "Vulkan", icon: "SiVulkan", color: "#AC162C", bgColor: "rgba(172,22,44,0.1)" },
      // Steam official color is black — use a recognizable Steam blue
      { name: "Steam", icon: "SiSteam", color: "#70B2FF", bgColor: "rgba(112,178,255,0.1)" },
    ],
  },
  {
    id: "design",
    labelKey: "stacks.categories.design",
    color: "#A259FF",
    items: [
      { name: "Figma", icon: "DeviconFigma", color: "#A259FF", bgColor: "rgba(162,89,255,0.1)" },
      { name: "Illustrator", icon: "DeviconIllustrator", color: "#FF9A00", bgColor: "rgba(255,154,0,0.1)" },
      { name: "Sketch", icon: "SiSketch", color: "#F7B500", bgColor: "rgba(247,181,0,0.1)" },
      { name: "Canva", icon: "SiCanva", color: "#00C4CC", bgColor: "rgba(0,196,204,0.1)" },
    ],
  },
];
