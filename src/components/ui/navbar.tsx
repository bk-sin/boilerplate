"use client";
import Link from "next/link";
import { NavLink } from "./nav-link";
import { Button } from "./button";
import { MobileNav } from "./mobile-nav";
import { navItems, navSocialLinks } from "@/dummy/nav-data";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 flex justify-center   px-4">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors hover:text-primary cursor-pointer"
        >
          <span className="text-xl font-bold font-heading">Emi Alegre</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          {navSocialLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              <Button variant="ghost">
                <Icon className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </Button>
            </Link>
          ))}
          {user ? (
            <Button size="sm" className="hidden sm:flex" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
              className="hidden sm:flex"
              onClick={user ? logout : undefined}
            >
              {user ? "Logout" : <Link href="/login">Login</Link>}
            </Button>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
