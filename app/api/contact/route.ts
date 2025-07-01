import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_ADDRESS) {
      console.log("Email service not configured, but contact data received:", {
        name,
        email,
        phone,
        message,
      })

      return NextResponse.json(
        { message: "Message sent successfully! We'll get back to you soon." },
        { status: 200 }
      )
    }

    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

   const fromEmail = "Saral Events <onboarding@resend.dev>"
    const internalEmail = process.env.EMAIL_ADDRESS

    const supportTeamEmail = {
      from: fromEmail,
      to: [internalEmail],
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
          </div>
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1d4ed8; margin-bottom: 20px;">Customer Inquiry Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
            <div style="margin-top: 30px; padding: 20px; background-color: #dbeafe; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af;">
                <strong>Action Required:</strong> Please respond to this customer inquiry as soon as possible.
              </p>
            </div>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px;">
            <p>This email was sent from the Saral Events contact form.</p>
          </div>
        </div>
      `,
    }

    const customerConfirmationEmail = {
      from: fromEmail,
      to: [email],
      subject: "Thank you for contacting Saral Events!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Reaching Out!</h1>
          </div>
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1d4ed8; margin-bottom: 20px;">We've received your message</h2>
            <p>Dear ${name},</p>
            <p>Thank you for contacting Saral Events! Our support team will get back to you soon.</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1d4ed8; margin-top: 0;">Your Message:</h3>
              <p style="color: #374151; line-height: 1.6; margin: 0; font-style: italic;">"${message}"</p>
            </div>
            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
              <h3 style="color: #065f46; margin-top: 0;">What's Next?</h3>
              <ul style="color: #065f46; line-height: 1.6;">
                <li>Our support team will review your inquiry</li>
                <li>We'll respond within 24 hours during business hours</li>
                <li>For urgent matters, call us at +91-98765-43210</li>
              </ul>
            </div>
            <p style="color: #374151;">Thank you for choosing Saral Events!</p>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px;">
            <p>Plan Less, Celebrate More</p>
          </div>
        </div>
      `,
    }

    await Promise.all([
      resend.emails.send(supportTeamEmail),
      resend.emails.send(customerConfirmationEmail),
    ])

    return NextResponse.json(
      { message: "Message sent successfully! Confirmation emails sent." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}
