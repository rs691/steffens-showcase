import { Github, Globe, Linkedin, Mail } from "lucide-react";

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
  {
    href: "/contact",
    label: "Contact",
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center gap-3 px-4 py-6 text-center sm:py-8">
        <p className="text-sm sm:text-base">
          <span className="font-headline font-semibold text-foreground">Steffens Sign &amp; Design</span>{" "}
          — portfolio demo by{" "}
          <a
            href="https://robert-stewart.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
          >
            Robert Stewart
          </a>
        </p>

        <nav aria-label="Profile links" className="flex items-center gap-5">
          {profileLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              title={link.label}
              aria-label={link.label}
              className="text-foreground transition-colors hover:text-primary"
            >
              <link.icon className="h-5 w-5" aria-hidden />
            </a>
          ))}
        </nav>

        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Robert Stewart</p>
      </div>
    </footer>
  );
}
