"use client";
import { Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="ghost"
      size="icon"
    >
      <Sun className="h-5 w-5" />
    </Button>
  );
}
