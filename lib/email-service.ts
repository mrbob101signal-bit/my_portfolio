import nodemailer, { type Transporter } from "nodemailer"
import type { SendMailOptions } from "nodemailer"

// Configure your email service here
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // TLS, not SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    console.log("Attempting to send email to:", options.to)
    console.log("From:", process.env.EMAIL_FROM || process.env.EMAIL_USER)
    
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || "noreply@portfolio.com",
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    console.log("✅ Email sent successfully to:", options.to)
  } catch (error) {
    console.error("❌ Error sending email:", error)
    throw error
  }
}

export async function sendContactNotification(
  name: string,
  email: string,
  subject: string,
  message: string,
  recipientEmail: string
): Promise<void> {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Subject:</strong> ${subject}</p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <h3 style="color: #333;">Message:</h3>
      <p style="white-space: pre-wrap; color: #666;">${message}</p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p style="color: #999; font-size: 12px;">
        This is an automated email from your portfolio contact form. 
        Please reply directly to the sender's email address.
      </p>
    </div>
  `

  const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This is an automated email from your portfolio contact form.
Please reply directly to the sender's email address.
  `

  await sendEmail({
    to: recipientEmail,
    subject: `New Contact: ${subject}`,
    html: htmlContent,
    text: textContent,
  })
}

export async function sendContactConfirmation(
  name: string,
  email: string,
  subject: string
): Promise<void> {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Thank You for Reaching Out!</h2>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p>Hi ${name},</p>
      
      <p style="color: #666; line-height: 1.6;">
        Thank you for contacting me through my portfolio. I have received your message regarding:
      </p>
      
      <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #007bff;">
        <strong>${subject}</strong>
      </p>
      
      <p style="color: #666; line-height: 1.6;">
        I'll review your message and get back to you as soon as possible.
      </p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p style="color: #999; font-size: 12px;">
        This is an automated confirmation email. Please do not reply to this email.
      </p>
    </div>
  `

  const textContent = `
Thank You for Reaching Out!

Hi ${name},

Thank you for contacting me through my portfolio. I have received your message regarding:

${subject}

I'll review your message and get back to you as soon as possible.

---
This is an automated confirmation email. Please do not reply to this email.
  `

  await sendEmail({
    to: email,
    subject: `Confirmation: We received your message`,
    html: htmlContent,
    text: textContent,
  })
}
