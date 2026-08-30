"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Avoid rendering a theme-dependent icon before hydration confirms the theme.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle light and dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative h-9 w-9 shrink-0"
    >
      {mounted ? (
        <>
          <Sun
            className={
              resolvedTheme === "dark"
                ? "h-4 w-4 scale-0 rotate-90 transition-transform duration-200"
                : "h-4 w-4 scale-100 rotate-0 transition-transform duration-200"
            }
          />
          <Moon
            className={
              resolvedTheme === "dark"
                ? "absolute h-4 w-4 scale-100 rotate-0 transition-transform duration-200"
                : "absolute h-4 w-4 scale-0 -rotate-90 transition-transform duration-200"
            }
          />
        </>
      ) : (
        <span className="h-4 w-4" />
      )}
    </Button>
  );
}
