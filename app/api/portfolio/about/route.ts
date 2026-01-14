import { NextRequest, NextResponse } from "next/server"
import { getAbout, updatePortfolioData, getPortfolioData } from "@/lib/portfolio-data"

export async function GET() {
  try {
    const about = await getAbout()
    return NextResponse.json(about)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const currentData = await getPortfolioData()
    const updatedData = await updatePortfolioData({
      ...currentData,
      about: { ...currentData.about, ...body },
    })
    return NextResponse.json(updatedData.about)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update about data" }, { status: 500 })
  }
}
