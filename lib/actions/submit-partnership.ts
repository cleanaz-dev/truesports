// lib/actions/submit-partnership.ts
"use server"

import { sendEmail } from "@/lib/email/send";
import PartnershipEmail from "../email/templates/partnership-email";

export async function submitPartnershipAction(formData: FormData) {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const interest = formData.get("interest") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !interest || !message) {
    return { error: "Please fill out all required fields." };
  }

  try {
    await sendEmail({
      to: "raymond@truesportslive.com", // The inbox receiving the inquiries
      subject: `Partnership Inquiry: ${company || name}`,
      react: PartnershipEmail({ name, company, email, interest, message }),
      from: process.env.FROM_EMAIL!,
      replyTo: email, // This allows you to hit "Reply" in your email client and go directly to the sender
    });

    return { success: true };
  } catch (error) {
    console.error("Form submission error:", error);
    return { error: "Failed to send your message. Please try again later." };
  }
}