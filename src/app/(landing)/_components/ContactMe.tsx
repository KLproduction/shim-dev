"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

import { contactFormSchema, type ContactFormValues } from "../../../../type";
import { Button } from "@/components/ui/button";

type Props = {};

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
};

const useContactForm = () => {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const validate = useCallback((nextValues: ContactFormValues) => {
    const result = contactFormSchema.safeParse(nextValues);
    if (result.success) {
      return { valid: true, errors: {} as FormErrors };
    }

    const fieldErrors = result.error.flatten().fieldErrors;
    const nextErrors: FormErrors = {};

    (Object.keys(fieldErrors) as (keyof ContactFormValues)[]).forEach((key) => {
      const message = fieldErrors[key]?.[0];
      if (message) {
        nextErrors[key] = message;
      }
    });

    return { valid: false, errors: nextErrors };
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const result = validate(values);
      if (!result.valid) {
        setErrors(result.errors);
        setStatus("idle");
        return;
      }

      setErrors({});
      setStatus("success");
      // TODO: Connect to a server action for actual submission.
    },
    [validate, values],
  );

  return { values, errors, status, handleChange, handleSubmit };
};

type FieldProps = {
  id: string;
  label: string;
  name: keyof ContactFormValues;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextField = ({
  id,
  label,
  name,
  placeholder,
  autoComplete,
  required,
  error,
  value,
  onChange,
}: FieldProps) => (
  <div className="space-y-3">
    <label
      htmlFor={id}
      className="text-sm font-bold tracking-tight text-[#000000] uppercase md:text-base"
    >
      {label}
    </label>
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn(
        "h-20 w-full rounded-none border-b-2 border-[#3F3F46] bg-transparent text-2xl font-bold tracking-tighter text-[#000000] uppercase placeholder:text-[#A1A1AA] focus-visible:border-[#DFE104] focus-visible:outline-none md:h-24 md:text-4xl",
        error && "border-[#DFE104]",
      )}
    />
    {error ? (
      <p id={`${id}-error`} className="text-base text-[#A1A1AA]">
        {error}
      </p>
    ) : null}
  </div>
);

type TextAreaProps = {
  id: string;
  label: string;
  name: keyof ContactFormValues;
  placeholder: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextAreaField = ({
  id,
  label,
  name,
  placeholder,
  required,
  error,
  value,
  onChange,
}: TextAreaProps) => (
  <div className="space-y-3">
    <label
      htmlFor={id}
      className="text-sm font-bold tracking-tight text-[#000000] uppercase md:text-base"
    >
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      required={required}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn(
        "min-h-[140px] w-full rounded-none border-b-2 border-[#3F3F46] bg-transparent text-2xl font-bold tracking-tighter text-[#000000] uppercase placeholder:text-[#A1A1AA] focus-visible:border-[#DFE104] focus-visible:outline-none md:text-4xl",
        error && "border-[#DFE104]",
      )}
    />
    {error ? (
      <p id={`${id}-error`} className="text-base text-[#A1A1AA]">
        {error}
      </p>
    ) : null}
  </div>
);

type MarqueeRowProps = {
  label: string;
  duration: number;
  direction?: "left" | "right";
};

const MarqueeRow = ({
  label,
  duration,
  direction = "left",
}: MarqueeRowProps) => {
  const shouldReduceMotion = useReducedMotion();
  const animation =
    direction === "left" ? { x: ["0%", "-50%"] } : { x: ["-50%", "0%"] };

  return (
    <div className="overflow-hidden border-y-2 border-[#3F3F46] bg-[#FAFAFA]">
      <motion.div
        className="flex w-max items-center gap-10 py-4"
        animate={shouldReduceMotion ? undefined : animation}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-8 text-2xl font-bold tracking-tighter text-[#000000] uppercase md:text-4xl">
          <span>BUILD FAST</span>
          <span className="text-[#DFE104]">{"///"}</span>
          <span>LAUNCH SMART</span>
          <span className="text-[#DFE104]">{"///"}</span>
          <span>SCALE WHEN READY</span>
          <span className="text-[#DFE104]">{"///"}</span>
          <span>LET’S TALK</span>
        </div>

        <div className="flex items-center gap-8 text-2xl font-bold tracking-tighter text-[#000000] uppercase md:text-4xl">
          <span>BUILD FAST</span>
          <span className="text-[#DFE104]">{"///"}</span>
          <span>LAUNCH SMART</span>
          <span className="text-[#DFE104]">{"///"}</span>
          <span>SCALE WHEN READY</span>
          <span className="text-[#DFE104]">{"///"}</span>
          <span>LET’S TALK</span>
        </div>
      </motion.div>
    </div>
  );
};

const ContactMe = (props: Props) => {
  const shouldReduceMotion = useReducedMotion();
  const { values, errors, status, handleChange, handleSubmit } =
    useContactForm();

  const headingMotion = useMemo(
    () => ({
      initial: shouldReduceMotion
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" },
      viewport: { once: true, amount: 0.6 },
    }),
    [shouldReduceMotion],
  );

  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] text-[#000000]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 -right-6 text-[clamp(6rem,20vw,22rem)] font-bold tracking-tighter text-[#A1A1AA]/25 uppercase opacity-50"
      >
        SHIMG
      </div>

      <MarqueeRow label="Start The Build" duration={18} />

      <div className="mx-auto max-w-[95vw] scale-90 py-20 md:py-32">
        <div className="grid gap-14 md:grid-cols-[1.1fr_1fr]">
          <div className="space-y-8">
            <p className="text-sm font-bold tracking-tight text-[#A1A1AA] uppercase md:text-base">
              Contact
            </p>
            <motion.h2
              {...headingMotion}
              className="text-[clamp(3rem,12vw,14rem)] leading-[0.8] font-bold tracking-tighter uppercase"
            >
              {`Let's Build It`}
            </motion.h2>
            <p className="max-w-xl text-lg font-medium text-[#A1A1AA] md:text-xl lg:text-2xl">
              Share the vision. We&apos;ll shape the roadmap, scope the build,
              and launch a one-stop digital web app that moves fast.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {[{ label: "Email", value: "shimg.solution@shim.dev" }].map(
                (item) => (
                  <div
                    key={item.label}
                    className="group border-2 border-[#3F3F46] p-6 transition-all duration-200 hover:border-[#DFE104] hover:bg-[#DFE104] hover:text-[#000000]"
                  >
                    <p className="text-sm font-bold tracking-tight text-[#A1A1AA] uppercase transition-colors duration-200 group-hover:text-[#000000]">
                      {item.label}
                    </p>
                    <p className="mt-4 text-lg font-bold tracking-tight text-[#000000] uppercase transition-colors duration-200 group-hover:text-[#000000]">
                      {item.value}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-2 border-[#3F3F46] p-6 md:p-10"
          >
            <div className="space-y-8">
              <TextField
                id="contact-name"
                label="Your Name"
                name="name"
                placeholder="FULL NAME"
                autoComplete="name"
                required
                value={values.name}
                error={errors.name}
                onChange={handleChange}
              />
              <TextField
                id="contact-email"
                label="Email Address"
                name="email"
                placeholder="YOUR@EMAIL.COM"
                autoComplete="email"
                required
                value={values.email}
                error={errors.email}
                onChange={handleChange}
              />
              <TextField
                id="contact-company"
                label="Company"
                name="company"
                placeholder="COMPANY (OPTIONAL)"
                autoComplete="organization"
                value={values.company ?? ""}
                error={errors.company}
                onChange={handleChange}
              />
              <TextAreaField
                id="contact-message"
                label="Project Notes"
                name="message"
                placeholder="TELL US WHAT YOU WANT TO BUILD"
                required
                value={values.message}
                error={errors.message}
                onChange={handleChange}
              />
            </div>

            <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <Button
                type="submit"
                className="hover:text-foreground h-16 w-full rounded-none border-2 border-[#DFE104] bg-[#DFE104] text-lg font-bold tracking-tighter text-[#000000] uppercase transition-all duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA] focus-visible:outline-none active:scale-95 md:h-20 md:w-auto md:px-10"
              >
                Send Request
              </Button>
              <p
                className="text-base font-medium text-[#A1A1AA]"
                aria-live="polite"
              >
                {status === "success"
                  ? "Request received. We will reply within 48 hours."
                  : "Typical response time: 48 hours."}
              </p>
            </div>
          </form>
        </div>
      </div>

      <MarqueeRow label="Contact The Studio" duration={28} direction="right" />
    </section>
  );
};

export default ContactMe;
