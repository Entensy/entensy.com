export interface TechItem {
  name: string;
  icon: string; // react-icons/si icon name, or "" for no icon
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
      // SiDotnet is the best available substitute for C# in react-icons v5
      { name: "C#", icon: "SiDotnet", color: "#512BD4", bgColor: "rgba(81,43,212,0.1)" },
      { name: "Java", icon: "SiJava", color: "#ED8B00", bgColor: "rgba(237,139,0,0.1)" },
      { name: "Python", icon: "SiPython", color: "#3776AB", bgColor: "rgba(55,118,171,0.1)" },
      { name: "C", icon: "SiC", color: "#A8B9CC", bgColor: "rgba(168,185,204,0.1)" },
      { name: "C++", icon: "SiCplusplus", color: "#00599C", bgColor: "rgba(0,89,156,0.1)" },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", bgColor: "rgba(247,223,30,0.1)" },
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", bgColor: "rgba(49,120,198,0.1)" },
      { name: "Go", icon: "SiGo", color: "#00ACD7", bgColor: "rgba(0,172,215,0.1)" },
      { name: "PHP", icon: "SiPhp", color: "#777BB4", bgColor: "rgba(119,123,180,0.1)" },
    ],
  },
  {
    id: "frontend",
    labelKey: "stacks.categories.frontend",
    color: "#61DAFB",
    items: [
      { name: "React", icon: "SiReact", color: "#61DAFB", bgColor: "rgba(97,218,251,0.1)" },
      { name: "Vue.js", icon: "SiVuedotjs", color: "#4FC08D", bgColor: "rgba(79,192,141,0.1)" },
      // color is theme-aware: overridden in StacksSection (white dark / black light)
      { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF", bgColor: "rgba(255,255,255,0.08)" },
      { name: "Nuxt.js", icon: "SiNuxt", color: "#00DC82", bgColor: "rgba(0,220,130,0.1)" },
      { name: "Astro", icon: "SiAstro", color: "#FF5D01", bgColor: "rgba(255,93,1,0.1)" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4", bgColor: "rgba(6,182,212,0.1)" },
      { name: "SASS/SCSS", icon: "SiSass", color: "#CC6699", bgColor: "rgba(204,102,153,0.1)" },
      { name: "Framer Motion", icon: "SiFramer", color: "#0055FF", bgColor: "rgba(0,85,255,0.1)" },
      { name: "GSAP", icon: "SiGreensock", color: "#88CE02", bgColor: "rgba(136,206,2,0.1)" },
    ],
  },
  {
    id: "backend",
    labelKey: "stacks.categories.backend",
    color: "#68A063",
    items: [
      { name: "Node.js", icon: "SiNodedotjs", color: "#339933", bgColor: "rgba(51,153,51,0.1)" },
      { name: "Laravel", icon: "SiLaravel", color: "#FF2D20", bgColor: "rgba(255,45,32,0.1)" },
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
      { name: "MariaDB", icon: "SiMariadb", color: "#003545", bgColor: "rgba(0,53,69,0.15)" },
      { name: "Cassandra", icon: "SiApachecassandra", color: "#1287B1", bgColor: "rgba(18,135,177,0.1)" },
      { name: "SQLite", icon: "SiSqlite", color: "#003B57", bgColor: "rgba(0,59,87,0.15)" },
      // No react-icons/si icon exists for SQL Server; badge shows name only
      { name: "SQL Server", icon: "", color: "#CC2927", bgColor: "rgba(204,41,39,0.1)" },
    ],
  },
  {
    id: "mobile",
    labelKey: "stacks.categories.mobile",
    color: "#61DAFB",
    items: [
      { name: "React Native", icon: "SiReact", color: "#61DAFB", bgColor: "rgba(97,218,251,0.1)" },
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
      // No react-icons/si icon exists for AWS; badge shows name only
      { name: "AWS", icon: "", color: "#FF9900", bgColor: "rgba(255,153,0,0.1)" },
      { name: "Nginx", icon: "SiNginx", color: "#009639", bgColor: "rgba(0,150,57,0.1)" },
      { name: "Apache Kafka", icon: "SiApachekafka", color: "#231F20", bgColor: "rgba(100,100,100,0.1)" },
      { name: "Ansible", icon: "SiAnsible", color: "#EE0000", bgColor: "rgba(238,0,0,0.1)" },
      { name: "Puppet", icon: "SiPuppet", color: "#FFAE1A", bgColor: "rgba(255,174,26,0.1)" },
      { name: "CI/CD", icon: "SiGithubactions", color: "#2088FF", bgColor: "rgba(32,136,255,0.1)" },
      { name: "Linux", icon: "SiLinux", color: "#FCC624", bgColor: "rgba(252,198,36,0.1)" },
    ],
  },
  {
    id: "design",
    labelKey: "stacks.categories.design",
    color: "#F24E1E",
    items: [
      { name: "Figma", icon: "SiFigma", color: "#F24E1E", bgColor: "rgba(242,78,30,0.1)" },
      // No react-icons/si icon exists for Adobe Illustrator; badge shows name only
      { name: "Illustrator", icon: "", color: "#FF9A00", bgColor: "rgba(255,154,0,0.1)" },
    ],
  },
];
