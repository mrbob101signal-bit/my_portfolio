import { NextRequest, NextResponse } from "next/server"
import { getExperience, updatePortfolioData, getPortfolioData } from "@/lib/portfolio-data"
import { Experience } from "@/lib/types/portfolio"

export async function GET() {
  try {
    const experience = await getExperience()
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experience data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const currentData = await getPortfolioData()
    const newExperience: Experience = {
      id: Date.now().toString(),
      ...body,
    }
    const updatedData = await updatePortfolioData({
      ...currentData,
      experience: [...currentData.experience, newExperience],
    })
    return NextResponse.json(newExperience, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const currentData = await getPortfolioData()
    const updatedExperience = currentData.experience.map((exp) => (exp.id === body.id ? body : exp))
    await updatePortfolioData({
      ...currentData,
      experience: updatedExperience,
    })
    return NextResponse.json(body)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const currentData = await getPortfolioData()
    const updatedExperience = currentData.experience.filter((exp) => exp.id !== body.id)
    await updatePortfolioData({
      ...currentData,
      experience: updatedExperience,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
  }
}
