import { Github, Mail } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: "#section1", label: "Section 1" },
  { href: "#section2", label: "Section 2" },
  { href: "#section3", label: "Section 3" },
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
