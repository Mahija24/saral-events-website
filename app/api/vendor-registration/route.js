import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { businessName, email, phone, category } = await request.json();

    if (!businessName || !email || !phone || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_ADDRESS) {
      console.log("Email service not configured, but registration data received:", {
        businessName,
        email,
        phone,
        category,
      });

      return NextResponse.json(
        { message: "Registration successful! We'll contact you within 24 hours." },
        { status: 200 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const senderEmail = "Saral Events <onboarding@resend.dev>"; // Replace with your verified domain email when ready
    const internalEmail = process.env.EMAIL_ADDRESS;

    const vendorTeamEmail = {
      from: senderEmail,
      to: [internalEmail],
      subject: `New Vendor Registration - ${businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Vendor Registration</h1>
          </div>
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #ea580c; margin-bottom: 20px;">Vendor Details</h2>
            <p><strong>Business Name:</strong> ${businessName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Category:</strong> ${category}</p>
            <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #92400e;">
                <strong>Action Required:</strong> Please review this vendor application and contact them within 24 hours.
              </p>
            </div>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px;">
            <p>This email was sent from the Saral Events vendor registration system.</p>
          </div>
        </div>
      `,
    };

    const vendorConfirmationEmail = {
      from: senderEmail,
      to: [email],
      subject: "Welcome to Saral Events - Registration Received!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Saral Events!</h1>
          </div>
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #ea580c; margin-bottom: 20px;">Thank you for your interest!</h2>
            <p>Dear ${businessName} team,</p>
            <p>We've successfully received your vendor registration. Here's what happens next:</p>
            <ul style="color: #374151;">
              <li><strong>Business Name:</strong> ${businessName}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Category:</strong> ${category}</li>
            </ul>
            <p>We’ll contact you within 24 hours to continue the onboarding process.</p>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px;">
            <p>Thank you for choosing Saral Events!</p>
            <p>Plan Less, Celebrate More</p>
          </div>
        </div>
      `,
    };

    const ownerResponse = await resend.emails.send(vendorTeamEmail);
    console.log("✅ Owner email sent:", ownerResponse);

    const userResponse = await resend.emails.send(vendorConfirmationEmail);
    console.log("📩 User email sent to:", email);
    console.log("🧾 Resend response:", userResponse);

    return NextResponse.json(
      { message: "Registration successful! Confirmation emails sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Vendor registration error:", error);
    return NextResponse.json(
      { error: "Failed to process registration. Please try again." },
      { status: 500 }
    );
  }
}
