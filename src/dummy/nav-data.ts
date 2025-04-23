import { Github, icons, Mail } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export const navItems: NavItem[] = [
  { url: "#section1", title: "Section 1", icon: "House" },
];

export const navSocialLinks = [
  {
    href: "mailto:emilianogalegre@gmail.com",
    icon: Mail,
    label: "Email",
  },
  {
    href: "https://github.com/bk-sin",
    icon: Github,
    label: "GitHub",
  },
];
