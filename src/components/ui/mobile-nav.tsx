"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/dummy/nav-data";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetTitle />
        <div className="flex flex-col gap-6 mt-10">
          <nav className="flex flex-col gap-4 ">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="text-lg font-medium transition-colors hover:text-primary py-2 border-b border-border  px-4"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 mt-auto px-4">
            <Button asChild className="w-full" onClick={() => setOpen(false)}>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
