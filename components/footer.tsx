import { Linkedin, Github, Facebook, ArrowUp } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/mr-chhinh", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/chhinh007", label: "GitHub" },
  { icon: Facebook, href: "https://facebook.com/pu.chhinh", label: "Facebook" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} <span className="text-white font-medium">OEUN Chhinh</span>. All Rights
            Reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-accent transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <Link
        href="#home"
        className="absolute right-6 bottom-6 w-10 h-10 bg-accent text-white flex items-center justify-center hover:bg-accent/90 transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Link>
    </footer>
  )
}
