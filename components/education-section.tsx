"use client"

import { useEffect, useState } from "react"
import { GraduationCap, Award } from "lucide-react"
import { Education } from "@/lib/types/portfolio"

const iconMap = {
  GraduationCap: GraduationCap,
  Award: Award,
}

export function EducationSection() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/portfolio/education")
      .then((res) => res.json())
      .then((data) => {
        setEducation(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch education data:", error)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <section id="education" className="py-24 px-6 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium tracking-widest uppercase text-accent mb-3">Education</h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground">My Academic Journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((item) => {
            const IconComponent = item.status === "Current" ? GraduationCap : Award
            return (
              <div
                key={item.id}
                className="bg-card p-8 border border-border hover:border-accent hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                    <IconComponent className="h-6 w-6 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium mb-3">
                      {item.status}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-1">{item.program}</h3>
                    <p className="text-accent font-medium mb-2">{item.institution}</p>
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-medium">Specialization:</span> {item.specialization}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Period:</span> {item.period}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
