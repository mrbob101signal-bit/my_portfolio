"use client"

import { useEffect, useState } from "react"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { Experience } from "@/lib/types/portfolio"

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/portfolio/experience")
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch experience data:", error)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <section id="experience" className="py-24 px-6 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium tracking-widest uppercase text-accent mb-3">Experience</h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground">My Work History</p>
        </div>

        <div className="relative pl-8 border-l-2 border-accent/30 space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[41px] top-0 w-4 h-4 bg-accent rounded-full border-4 border-background" />

              <div className="bg-card p-6 border border-border hover:border-accent hover:shadow-lg transition-all">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="flex items-center gap-2 text-accent font-medium">
                    <Briefcase className="h-4 w-4" />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    {exp.location}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4" />
                    {exp.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">{exp.title}</h3>

                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-accent mt-1.5 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
