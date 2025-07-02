import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    console.log("Received form data:", { name, email, phone, message });

    // ✅ Validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // ✅ Check API Keys
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_ADDRESS) {
      console.log("Email service not configured. Received data:", {
        name,
        email,
        phone,
        message,
      });

      return NextResponse.json(
        { message: "Message saved. Email service not configured." },
        { status: 200 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const fromEmail = "onboarding@resend.dev"; // ✅ Dev-safe
    const internalEmail = process.env.EMAIL_ADDRESS;

    // ✅ Email to Owner/Admin
    const adminEmail = await resend.emails.send({
      from: fromEmail,
      to: [internalEmail],
      reply_to: email,
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p style="margin-top: 20px;">Sent from Saral Events website.</p>
      `,
    });

    console.log("Admin email response:", adminEmail);

    // ✅ Confirmation Email to Sender
    const senderEmail = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: "Thank you for contacting Saral Events!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out to <strong>Saral Events</strong>.</p>
        <p>We have received your message:</p>
        <blockquote>${message}</blockquote>
        <p>Our team will get back to you shortly.</p>
        <br/>
        <p>📞 For urgent queries, call +91-98765-43210.</p>
        <p>✨ Plan Less, Celebrate More!</p>
      `,
    });

    console.log("Sender email response:", senderEmail);

    return NextResponse.json(
      { message: "Message sent successfully! Confirmation emails sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
