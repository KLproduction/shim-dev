"use client";

import { useMutation } from "@tanstack/react-query";
import { createContactRequest } from "@/action/contact";
import type { ContactFormValues } from "../../type";
import { toast } from "sonner";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";
type ContactActionResult = Awaited<ReturnType<typeof createContactRequest>>;

export const useCreateContactRequest = () => {
  const mutation = useMutation({
    mutationFn: (values: ContactFormValues) => createContactRequest(values),
    onSuccess: (result) => {
      if (result.ok) {
        toast.success("Request received. We will reply within 48 hours.");
      } else {
        toast.error(result.formError ?? "Something went wrong. Please try again.");
      }
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
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
