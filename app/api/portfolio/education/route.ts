import { NextRequest, NextResponse } from "next/server"
import { getEducation, updatePortfolioData, getPortfolioData } from "@/lib/portfolio-data"

export async function GET() {
  try {
    const education = await getEducation()
    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch education data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const currentData = await getPortfolioData()
    const newEducation = {
      id: Date.now().toString(),
      ...body,
    }
    await updatePortfolioData({
      ...currentData,
      education: [...currentData.education, newEducation],
    })
    return NextResponse.json(newEducation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const currentData = await getPortfolioData()
    const updatedEducation = currentData.education.map((edu) => (edu.id === body.id ? body : edu))
    await updatePortfolioData({
      ...currentData,
      education: updatedEducation,
    })
    return NextResponse.json(body)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const currentData = await getPortfolioData()
    const updatedEducation = currentData.education.filter((edu) => edu.id !== body.id)
    await updatePortfolioData({
      ...currentData,
      education: updatedEducation,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 })
  }
}
