"use client"

import { useEffect, useState } from "react"
import { Briefcase, GraduationCap, Target, Award } from "lucide-react"
import Image from "next/image"
import { About } from "@/lib/types/portfolio"

const iconMap = {
  GraduationCap,
  Briefcase,
  Target,
  Award,
}

export function AboutSection() {
  const [about, setAbout] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/portfolio/about")
      .then((res) => res.json())
      .then((data) => {
        setAbout(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch about data:", error)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (!about) return <div>Error loading data</div>

  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium tracking-widest uppercase text-accent mb-3">About Me</h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground">Know Me More</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left - Image */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image src={about.image} alt={about.name} fill className="object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent -z-10" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-7">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              I'm <span className="text-accent">{about.name}</span>,
            </h3>
            <p className="text-lg text-muted-foreground mb-6">{about.bio}</p>

            <p className="text-muted-foreground leading-relaxed mb-6">{about.detailedBio}</p>

            <p className="text-muted-foreground leading-relaxed mb-8">{about.additionalInfo}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">Name:</span>
                <span className="text-muted-foreground">{about.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">Email:</span>
                <span className="text-muted-foreground">{about.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">From:</span>
                <span className="text-muted-foreground">{about.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">Phone:</span>
                <span className="text-muted-foreground">{about.phone}</span>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {about.highlights.map((item) => {
            const IconComponent = iconMap[item.icon]
            return (
              <div
                key={item.label}
                className="text-center p-6 border border-border hover:border-accent transition-colors group"
              >
                <IconComponent className="h-8 w-8 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-foreground mb-1">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
