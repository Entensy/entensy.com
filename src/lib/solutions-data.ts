export interface Solution {
  id: string;
  icon: string; // react-icons/fi icon name
  color: string;
  size: "small" | "medium" | "large"; // bento grid sizing
  titleKey: string;
  descKey: string;
}

export const solutions: Solution[] = [
  {
    id: "business-websites",
    icon: "FiGlobe",
    color: "#E11D48",
    size: "large",
    titleKey: "solutions.items.business_websites.title",
    descKey: "solutions.items.business_websites.desc",
  },
  {
    id: "company-portals",
    icon: "FiLayers",
    color: "#D97706",
    size: "medium",
    titleKey: "solutions.items.company_portals.title",
    descKey: "solutions.items.company_portals.desc",
  },
  {
    id: "ecommerce",
    icon: "FiShoppingCart",
    color: "#7C3AED",
    size: "medium",
    titleKey: "solutions.items.ecommerce.title",
    descKey: "solutions.items.ecommerce.desc",
  },
  {
    id: "booking",
    icon: "FiCalendar",
    color: "#0891B2",
    size: "small",
    titleKey: "solutions.items.booking.title",
    descKey: "solutions.items.booking.desc",
  },
  {
    id: "dashboards",
    icon: "FiGrid",
    color: "#059669",
    size: "small",
    titleKey: "solutions.items.dashboards.title",
    descKey: "solutions.items.dashboards.desc",
  },
  {
    id: "crm-erp",
    icon: "FiDatabase",
    color: "#DB2777",
    size: "large",
    titleKey: "solutions.items.crm_erp.title",
    descKey: "solutions.items.crm_erp.desc",
  },
  {
    id: "saas",
    icon: "FiCloud",
    color: "#2563EB",
    size: "medium",
    titleKey: "solutions.items.saas.title",
    descKey: "solutions.items.saas.desc",
  },
  {
    id: "mobile-apps",
    icon: "FiSmartphone",
    color: "#EA580C",
    size: "medium",
    titleKey: "solutions.items.mobile_apps.title",
    descKey: "solutions.items.mobile_apps.desc",
  },
  {
    id: "internal-tools",
    icon: "FiTool",
    color: "#9333EA",
    size: "small",
    titleKey: "solutions.items.internal_tools.title",
    descKey: "solutions.items.internal_tools.desc",
  },
  {
    id: "government",
    icon: "FiFlag",
    color: "#475569",
    size: "small",
    titleKey: "solutions.items.government.title",
    descKey: "solutions.items.government.desc",
  },
  {
    id: "branding",
    icon: "FiBriefcase",
    color: "#A78BFA",
    size: "large",
    titleKey: "solutions.items.branding.title",
    descKey: "solutions.items.branding.desc",
  },
  {
    id: "mvp-startup",
    icon: "FiZap",
    color: "#EF4444",
    size: "medium",
    titleKey: "solutions.items.mvp_startup.title",
    descKey: "solutions.items.mvp_startup.desc",
  },
  {
    id: "maintenance",
    icon: "FiSettings",
    color: "#22D3EE",
    size: "small",
    titleKey: "solutions.items.maintenance.title",
    descKey: "solutions.items.maintenance.desc",
  },
];
