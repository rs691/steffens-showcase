import { Github, Globe, Linkedin } from "lucide-react";
import Link from "next/link";

const profileLinks = [
  {
    href: "https://github.com/rs691/steffens-showcase",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/robert-stewart-m",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://robert-stewart.dev",
    label: "Portfolio",
    icon: Globe,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h3 className="font-headline text-xl font-semibold text-foreground sm:text-2xl">
            Steffens Sign &amp; Design
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed sm:text-lg">
            A full-stack shop experience — production app replica for recruiters. Not the official
            business site.
          </p>
          <p className="mt-2 text-sm sm:text-base">
            Created by{" "}
            <a
              href="https://robert-stewart.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-2 hover:text-primary hover:underline"
            >
              Robert Stewart
            </a>
          </p>

          <nav
            aria-label="Profile links"
            className="mt-8 grid w-full max-w-md grid-cols-3 gap-4"
          >
            {profileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-md px-2 py-2 text-foreground transition-colors hover:text-primary"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background/50">
                  <link.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm font-medium sm:text-base">{link.label}</span>
              </a>
            ))}
          </nav>

          <Link
            href="/contact"
            className="mt-6 text-base font-medium text-foreground underline-offset-4 hover:text-primary hover:underline sm:text-lg"
          >
            Contact
          </Link>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-base">
          <p>&copy; {new Date().getFullYear()} Robert Stewart</p>
        </div>
      </div>
    </footer>
  );
}
