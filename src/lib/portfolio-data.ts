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
