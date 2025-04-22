"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className = "" }: NavLinkProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (href === "#") {
        setIsActive(window.scrollY < 100);
        return;
      }

      const section = document.querySelector(href);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isInView = rect.top <= 500 && rect.bottom >= 500;

      setIsActive(isInView);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [href]);

  return (
    <Link
      href={href}
      className={`nav-link ${isActive ? "nav-link-active" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}
