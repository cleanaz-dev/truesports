// lib/actions/submit-dynamic-form.ts
"use server"

import { sendEmail } from "@/lib/email/send";
import DynamicEmail from "../email/templates/dynamic-email";

export async function submitDynamicForm(formData: FormData) {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string | undefined;
  const email = formData.get("email") as string;
  const interest = formData.get("interest") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !interest || !message) {
    return { error: "Please fill out all required fields." };
  }

  try {
    await sendEmail({
      to: "raymond@truesportslive.com", // Corrected domain spelling
      subject: `New Inquiry: ${interest} - ${name}`,
      react: DynamicEmail({
        name,
        company,
        email,
        interest,
        message
      }),
      from: process.env.FROM_EMAIL!, // Added missing required from field
      replyTo: email,                // Added replyTo for convenience
    });

    return { success: true };
  } catch (error) {
    console.error("Form submission error:", error);
    return { error: "Failed to send your message. Please try again later." };
  }
}