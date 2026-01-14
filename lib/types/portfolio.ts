import { ReactNode } from "react"

export interface About {
  additionalInfo: ReactNode
  name: string
  title: string
  bio: string
  detailedBio: string
  email: string
  phone: string
  location: string
  image: string
  highlights: Highlight[]
}

export interface Highlight {
  icon: "GraduationCap" | "Briefcase" | "Target" | "Award"
  value: string
  label: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  duration: string
  description: string[]
}

export interface Education {
  id: string
  institution: string
  program: string
  specialization: string
  period: string
  status: "Current" | "Completed"
}

export interface Skill {
  id: string
  name: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  link?: string
  github?: string
}

export interface ContactInfo {
  email: string
  phone: string
  linkedin: string
  github: string
  facebook: string
}

export interface PortfolioData {
  about: About
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  contact: ContactInfo
}
