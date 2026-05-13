"use server";

import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/content/site";

const schema = z.object({
  name: z.string().min(2, "Name is too short").max(120),
  email: z.string().email("That doesn't look like a valid email"),
  message: z.string().min(10, "Tell me a little more").max(5000),
  // Honeypot — should always be empty
  website: z.string().max(0).optional(),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const k = issue.path[0] as keyof NonNullable<ContactState["fieldErrors"]>;
      if (k && !fieldErrors[k]) fieldErrors[k] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  const { name, email, message, website } = parsed.data;
  if (website) return { status: "success", message: "Thanks." };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  // Graceful no-key path — log so dev can see it locally
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — message would have been sent:", { name, email });
    return {
      status: "success",
      message: "Got it. I'll get back to you soon.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `Portfolio <noreply@${new URL(site.url).hostname}>`,
      to,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
    });
    return { status: "success", message: "Got it. I'll get back to you soon." };
  } catch (err) {
    console.error("[contact] send failed", err);
    return { status: "error", message: "Couldn't send right now. Try emailing me directly." };
  }
}
