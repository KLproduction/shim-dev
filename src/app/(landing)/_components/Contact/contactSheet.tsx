"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useContactFormStore } from "@/hook/store";
import { contactFormSchema, type ContactFormValues } from "../../../../../type";
import { useCreateContactRequest } from "@/hook/contentForm";
import { useMediaQuery } from "react-responsive";
import { useEffect, useMemo, useState } from "react";

const ContactHeader = () => (
  <>
    <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
      Contact
    </p>
    <div className="space-y-2">
      <SheetTitle className="text-2xl font-semibold">
        Start a project
      </SheetTitle>
      <SheetDescription className="text-sm">
        Share a few details and we will reply within 48 hours.
      </SheetDescription>
    </div>
  </>
);

const PRESET_MESSAGES: Record<"starter" | "growth" | "pro", string> = {
  starter:
    "Hi! I am interested in the Starter Launch package. I need a high-converting landing page and want to ship fast.\n\nGoals:\n- \nTimeline:\n- \nBudget:\n- ",
  growth:
    "Hi! I am interested in the Growth Site package. I need a business website with CMS so I can update content.\n\nPages needed:\n- \nTimeline:\n- \nBudget:\n- ",
  pro: "Hi! I am interested in the Pro Partner Build. I need a scalable web app with login and admin dashboard.\n\nCore features:\n- \nTimeline:\n- \nBudget:\n- ",
};

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

const useContactSheetForm = () => {
  const { isStarterPreset, isGrowthPreset, isProPreset } =
    useContactFormStore();
  const { status, error, submit } = useCreateContactRequest();
  const presetKey = useMemo(() => {
    if (isStarterPreset) return "starter";
    if (isGrowthPreset) return "growth";
    if (isProPreset) return "pro";
    return null;
  }, [isGrowthPreset, isProPreset, isStarterPreset]);

  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!presetKey) return;
    setValues((prev) => ({
      ...prev,
      message: PRESET_MESSAGES[presetKey],
    }));
  }, [presetKey]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const key = name as keyof ContactFormValues;
      if (!prev[key]) {
        return prev;
      }
      const { [key]: _ignored, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = contactFormSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const nextErrors: FormErrors = {};

      (Object.keys(fieldErrors) as (keyof ContactFormValues)[]).forEach(
        (key) => {
          const message = fieldErrors[key]?.[0];
          if (message) {
            nextErrors[key] = message;
          }
        },
      );

      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const actionResult = await submit(values);
    if (!actionResult.ok) {
      if (Object.keys(actionResult.fieldErrors).length > 0) {
        setErrors(actionResult.fieldErrors);
      }
      return;
    }

    setValues({
      name: "",
      email: "",
      company: "",
      message: "",
    });
  };

  return { values, errors, status, error, handleChange, handleSubmit };
};

const ContactForm = () => {
  const { values, errors, status, error, handleChange, handleSubmit } =
    useContactSheetForm();

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="contact-name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            required
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name ? (
            <p id="contact-name-error" className="text-destructive text-sm">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            required
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email ? (
            <p id="contact-email-error" className="text-destructive text-sm">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-company" className="text-sm font-medium">
            Company
          </label>
          <Input
            id="contact-company"
            name="company"
            placeholder="Company name (optional)"
            autoComplete="organization"
            value={values.company ?? ""}
            onChange={handleChange}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={
              errors.company ? "contact-company-error" : undefined
            }
          />
          {errors.company ? (
            <p id="contact-company-error" className="text-destructive text-sm">
              {errors.company}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-message" className="text-sm font-medium">
            Project notes
          </label>
          <Textarea
            id="contact-message"
            name="message"
            placeholder="Tell us what you want to build"
            rows={4}
            required
            value={values.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
          />
          {errors.message ? (
            <p id="contact-message-error" className="text-destructive text-sm">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          className="bg-accent text-background hover:text-foreground w-full rounded-none sm:w-auto"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send request"}
        </Button>
        <p className="text-muted-foreground text-sm" aria-live="polite">
          {status === "success"
            ? "Request received. We will reply within 48 hours."
            : status === "error"
              ? (error ?? "Something went wrong. Please try again.")
              : "Typical response time: 48 hours."}
        </p>
      </div>
    </form>
  );
};

const ContactSheet = () => {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const { isContactFormOpen, setContactFormOpen } = useContactFormStore();

  return (
    <div className="flex items-center gap-3">
      <Sheet open={isContactFormOpen} onOpenChange={setContactFormOpen}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className="max-h-[90vh] w-full max-w-xl gap-6 overflow-y-auto"
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <SheetHeader className="space-y-4">
            <ContactHeader />
          </SheetHeader>
          <div className="px-4 pb-6">
            <ContactForm />
          </div>
        </SheetContent>
      </Sheet>

      {/* {isMobile ? (
        <Drawer
          direction="bottom"
          open={isContactFormOpen}
          onOpenChange={setContactFormOpen}
        >
          <DrawerContent
            className="max-h-[85vh] gap-6 overflow-y-auto pb-6"
            onCloseAutoFocus={(event) => event.preventDefault()}
          >
            <DrawerHeader className="space-y-4">
              <DrawerTitle className="text-2xl font-semibold">
                Start a project
              </DrawerTitle>
              <DrawerDescription className="text-sm">
                Share a few details and we will reply within 48 hours.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-10">
              <ContactForm />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={isContactFormOpen} onOpenChange={setContactFormOpen}>
          <SheetContent
            side="right"
            className="max-h-[90vh] w-full max-w-xl gap-6 overflow-y-auto"
            onCloseAutoFocus={(event) => event.preventDefault()}
          >
            <SheetHeader className="space-y-4">
              <ContactHeader />
            </SheetHeader>
            <div className="px-4 pb-6">
              <ContactForm />
            </div>
          </SheetContent>
        </Sheet>
      )} */}
    </div>
  );
};

export default ContactSheet;
