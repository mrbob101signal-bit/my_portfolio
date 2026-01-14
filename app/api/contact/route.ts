import { NextRequest, NextResponse } from "next/server"
import { saveContact, getContacts, deleteContact, updateContactStatus } from "@/lib/contact-data"
import { sendContactNotification, sendContactConfirmation } from "@/lib/email-service"

export async function GET() {
  try {
    const contacts = await getContacts()
    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Save to database
    const contact = await saveContact({
      name,
      email,
      subject,
      message,
    })

    // Send notification email to portfolio owner
    const ownerEmail = process.env.EMAIL_USER || "oeunchhinh@gmail.com"
    try {
      await sendContactNotification(name, email, subject, message, ownerEmail)
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError)
      // Continue even if email fails - message is still saved to database
    }

    // Send confirmation email to sender
    try {
      await sendContactConfirmation(name, email, subject)
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Continue even if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
        contact,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error processing contact:", error)
    console.error("Error details:", JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: "Failed to process your message", details: String(error) },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: "Contact ID is required" },
        { status: 400 }
      )
    }

    await deleteContact(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: "Contact ID and status are required" },
        { status: 400 }
      )
    }

    if (!["read", "unread"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      )
    }

    await updateContactStatus(id, status)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update contact status" },
      { status: 500 }
    )
  }
}
