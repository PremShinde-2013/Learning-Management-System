// Types for the configuration
interface NavItem {
  label: string;
  href: string;
}

interface SocialLinks {
  github: string;
  twitter: string;
  docs: string;
  discord: string;
  sponsor: string;
  linkedin?: string; // Optional additional social
}

interface SiteConfigType {
  name: string;
  description: string;
  navItems: NavItem[];
  navMenuItems: NavItem[];
  links: SocialLinks;
}

// Shared navigation items to avoid duplication
const navigationItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

// Main configuration
export const siteConfig: SiteConfigType = {
  name: "LearniflyPro",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: navigationItems,
  navMenuItems: navigationItems,
  links: {
    github: "https://github.com/PremShinde-2013",
    twitter: "https://github.com/PremShinde-2013", // Should probably be Twitter URL
    docs: "https://github.com/PremShinde-2013",
    discord: "https://github.com/PremShinde-2013",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

export type SiteConfig = typeof siteConfig;
