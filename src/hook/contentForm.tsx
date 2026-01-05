"use client";

import { useMutation } from "@tanstack/react-query";
import { createContactRequest } from "@/action/contact";
import type { ContactFormValues } from "../../type";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";
type ContactActionResult = Awaited<ReturnType<typeof createContactRequest>>;

export const useCreateContactRequest = () => {
  const mutation = useMutation({
    mutationFn: (values: ContactFormValues) => createContactRequest(values),
  });

  const status: SubmissionStatus = mutation.isPending
    ? "submitting"
    : mutation.data?.ok
      ? "success"
      : mutation.data
        ? "error"
        : "idle";

  const error =
    mutation.data && !mutation.data.ok ? mutation.data.formError ?? null : null;

  const submit = (values: ContactFormValues): Promise<ContactActionResult> =>
    mutation.mutateAsync(values);

  return { status, error, submit };
};
