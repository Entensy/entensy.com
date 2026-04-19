export interface Service {
  id: string;
  icon: string; // Lucide icon name
  color: string;
  gradientFrom: string;
  gradientTo: string;
  titleKey: string;
  descKey: string;
}

export const services: Service[] = [
  {
    id: "custom-software",
    icon: "Code2",
    color: "#F43F5E",
    gradientFrom: "#F43F5E",
    gradientTo: "#FB7185",
    titleKey: "services.items.custom_software.title",
    descKey: "services.items.custom_software.desc",
  },
  {
    id: "web-app",
    icon: "Globe",
    color: "#C9A84C",
    gradientFrom: "#C9A84C",
    gradientTo: "#F5D47B",
    titleKey: "services.items.web_app.title",
    descKey: "services.items.web_app.desc",
  },
  {
    id: "mobile-app",
    icon: "Smartphone",
    color: "#7C3AED",
    gradientFrom: "#7C3AED",
    gradientTo: "#A78BFA",
    titleKey: "services.items.mobile_app.title",
    descKey: "services.items.mobile_app.desc",
  },
  {
    id: "ui-ux",
    icon: "Palette",
    color: "#EC4899",
    gradientFrom: "#EC4899",
    gradientTo: "#F9A8D4",
    titleKey: "services.items.ui_ux.title",
    descKey: "services.items.ui_ux.desc",
  },
  {
    id: "tech-consulting",
    icon: "Brain",
    color: "#06B6D4",
    gradientFrom: "#06B6D4",
    gradientTo: "#67E8F9",
    titleKey: "services.items.tech_consulting.title",
    descKey: "services.items.tech_consulting.desc",
  },
  {
    id: "agile-pm",
    icon: "Kanban",
    color: "#10B981",
    gradientFrom: "#10B981",
    gradientTo: "#6EE7B7",
    titleKey: "services.items.agile_pm.title",
    descKey: "services.items.agile_pm.desc",
  },
  {
    id: "maintenance",
    icon: "Wrench",
    color: "#F59E0B",
    gradientFrom: "#F59E0B",
    gradientTo: "#FCD34D",
    titleKey: "services.items.maintenance.title",
    descKey: "services.items.maintenance.desc",
  },
  {
    id: "business-analysis",
    icon: "BarChart3",
    color: "#3B82F6",
    gradientFrom: "#3B82F6",
    gradientTo: "#93C5FD",
    titleKey: "services.items.business_analysis.title",
    descKey: "services.items.business_analysis.desc",
  },
  {
    id: "modernization",
    icon: "RefreshCw",
    color: "#8B5CF6",
    gradientFrom: "#8B5CF6",
    gradientTo: "#C4B5FD",
    titleKey: "services.items.modernization.title",
    descKey: "services.items.modernization.desc",
  },
  {
    id: "mvp",
    icon: "Rocket",
    color: "#EA580C",
    gradientFrom: "#EA580C",
    gradientTo: "#FB923C",
    titleKey: "services.items.mvp.title",
    descKey: "services.items.mvp.desc",
  },
];
