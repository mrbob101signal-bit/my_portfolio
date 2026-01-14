import { NextRequest, NextResponse } from "next/server"
import { getSkills, updatePortfolioData, getPortfolioData } from "@/lib/portfolio-data"
import { Skill } from "@/lib/types/portfolio"

export async function GET() {
  try {
    const skills = await getSkills()
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const currentData = await getPortfolioData()
    const newSkill: Skill = {
      id: Date.now().toString(),
      ...body,
    }
    await updatePortfolioData({
      ...currentData,
      skills: [...currentData.skills, newSkill],
    })
    return NextResponse.json(newSkill, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const currentData = await getPortfolioData()
    const updatedSkills = currentData.skills.map((skill) => (skill.id === body.id ? body : skill))
    await updatePortfolioData({
      ...currentData,
      skills: updatedSkills,
    })
    return NextResponse.json(body)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const currentData = await getPortfolioData()
    const updatedSkills = currentData.skills.filter((skill) => skill.id !== body.id)
    await updatePortfolioData({
      ...currentData,
      skills: updatedSkills,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
  }
}
