import { ArrowDown } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/professional-dark-office-workspace-with-computer-c.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4">Welcome to my portfolio</p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          I'm <span className="text-accent">OEUN Chhinh</span>
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-2 text-white/80 text-lg md:text-xl mb-8">
          <span>Web Designer</span>
          <span className="text-accent">|</span>
          <span>PHP Developer</span>
          <span className="text-accent">|</span>
          <span>IT Student</span>
        </div>

        <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
          A passionate 3rd-year IT student at The University of Cambodia with hands-on experience in technical support
          and software development.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#about"
            className="px-8 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
          >
            Discover More
          </Link>
          <Link
            href="#contact"
            className="px-8 py-3 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </div>

      <Link
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-accent transition-colors animate-bounce"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="h-6 w-6" />
      </Link>
    </section>
  )
}
