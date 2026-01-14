import fs from "fs"
import path from "path"
import { PortfolioData } from "@/lib/types/portfolio"

const dataFilePath = path.join(process.cwd(), "data", "portfolio.json")

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const fileContents = fs.readFileSync(dataFilePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading portfolio data:", error)
    throw new Error("Failed to load portfolio data")
  }
}

export async function updatePortfolioData(data: Partial<PortfolioData>): Promise<PortfolioData> {
  try {
    const currentData = await getPortfolioData()
    const updatedData = { ...currentData, ...data }
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2))
    } catch (writeError) {
      console.warn("Could not write to file (read-only filesystem on Vercel):", writeError)
      // On Vercel, file writes will fail but we still return the updated data
      // Note: Changes won't persist across deployments
    }
    return updatedData
  } catch (error) {
    console.error("Error updating portfolio data:", error)
    throw new Error("Failed to update portfolio data")
  }
}

export async function getAbout() {
  const data = await getPortfolioData()
  return data.about
}

export async function getExperience() {
  const data = await getPortfolioData()
  return data.experience
}

export async function getEducation() {
  const data = await getPortfolioData()
  return data.education
}

export async function getSkills() {
  const data = await getPortfolioData()
  return data.skills
}

export async function getProjects() {
  const data = await getPortfolioData()
  return data.projects
}

export async function getContact() {
  const data = await getPortfolioData()
  return data.contact
}
