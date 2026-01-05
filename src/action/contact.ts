"use server";

import { db } from "@/lib/db";
import { sendContactLeadEmail, sendVerificationEmail } from "@/lib/mail";
import { contactFormSchema, type ContactFormValues } from "../../type";

type ContactActionResult =
  | { ok: true }
  | {
      ok: false;
      fieldErrors: Partial<Record<keyof ContactFormValues, string>>;
      formError?: string;
    };

export async function createContactRequest(
  values: ContactFormValues,
): Promise<ContactActionResult> {
  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    const flattened = parsed.error.flatten().fieldErrors;

    (Object.keys(flattened) as (keyof ContactFormValues)[]).forEach((key) => {
      const message = flattened[key]?.[0];
      if (message) {
        fieldErrors[key] = message;
      }
    });

    return { ok: false, fieldErrors };
  }

  try {
    await db.contactRequest.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        message: parsed.data.message,
      },
    });

    try {
      await Promise.all([
        sendContactLeadEmail(parsed.data),
        sendVerificationEmail(parsed.data.email, "contact-request"),
      ]);
    } catch (mailError) {
      console.error("[createContactRequest] email failed:", mailError);
    }

    return { ok: true };
  } catch (error) {
    console.error("[createContactRequest] failed:", error);
    return {
      ok: false,
      fieldErrors: {},
      formError: "Something went wrong. Please try again.",
    };
  }
}
