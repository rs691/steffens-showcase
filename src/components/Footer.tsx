import { Github, Globe, Linkedin } from "lucide-react";
import Link from "next/link";

const profileLinks = [
  {
    href: "https://github.com/rs691/steffens-showcase",
    label: "GitHub repository",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/robert-stewart-m",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://robert-stewart.dev",
    label: "Portfolio site",
    icon: Globe,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-lg space-y-3">
            <h3 className="font-headline text-xl font-semibold text-foreground">
              Steffens Sign &amp; Design
            </h3>
            <p className="text-base leading-relaxed">
              Portfolio demo by{" "}
              <a
                href="https://robert-stewart.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline-offset-2 hover:text-primary hover:underline"
              >
                Robert Stewart
              </a>
              . A full-stack shop experience for recruiters — not an official business site.
            </p>
            <p>
              <Link href="/contact" className="text-base hover:text-primary">
                Contact / demo inquiry form
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {profileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/40 text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm sm:text-left sm:text-base">
          <p>
            &copy; {new Date().getFullYear()} Robert Stewart. Portfolio demo — not affiliated with a
            live woodworking business.
          </p>
        </div>
      </div>
    </footer>
  );
}
