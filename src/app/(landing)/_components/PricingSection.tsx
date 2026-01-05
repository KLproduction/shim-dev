"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useContactFormStore } from "@/hook/store";

type PricingTier = {
  name: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  period?: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
  preset: "starter" | "growth" | "pro";
  finePrint?: string;
};

const TIERS: PricingTier[] = [
  {
    name: "Starter Launch",
    tagline: "A high-converting landing page to ship fast.",
    price: "£400",
    originalPrice: "£500",
    period: "one-time",
    badge: "Founding Offer",
    preset: "starter",
    features: [
      "1 custom-designed landing page",
      "Responsive (mobile + desktop)",
      "Basic SEO (title/meta + Open Graph)",
      "Contact form with email notification",
      "Deployment (Vercel / Netlify)",
      "1 design direction adjustment + 2 content revisions",
    ],
    cta: { label: "Book a call", href: "#contact" },
    finePrint: "Best for promos, personal brands, and MVP launches.",
  },
  {
    name: "Growth Site",
    tagline: "Business website + CMS so you can update content.",
    price: "£1,300",
    originalPrice: "£1,600",
    period: "one-time",
    highlighted: true,
    badge: "Most Popular",
    preset: "growth",
    features: [
      "5-8 pages (Home, About, Services, FAQ, Contact)",
      "Custom UI/UX design (no off-the-shelf templates)",
      "CMS included (edit content yourself)",
      "Performance basics (image optimization + lazy loading)",
      "SEO basics (structure + sitemap + robots)",
      "Analytics setup (GA / Plausible optional)",
      "2 design revisions + 3 content revisions",
    ],
    cta: { label: "Get started", href: "#contact" },
    finePrint: "Best for SMEs who want a site that can grow over time.",
  },
  {
    name: "Pro Partner Build",
    tagline: "Login + admin dashboard for scalable web apps.",
    price: "£3,200+",
    originalPrice: "£4,000+",
    period: "from",
    badge: "Limited slots",
    preset: "pro",
    features: [
      "Auth (login + registration; OAuth optional)",
      "Admin dashboard (manage content/data)",
      "Roles & permissions (Admin/Staff/User)",
      "Data model planning (built to extend)",
      "Deployment + environment setup (preview + prod)",
      "Better handover (docs + walkthrough)",
    ],
    cta: { label: "Discuss your project", href: "#contact" },
    finePrint: "Best for membership sites, internal tools, and SaaS.",
  },
];

const MARQUEE_PRIMARY = [
  "Discount is available for early bird projects only, in exchange for feedback and a public case study. ",
];

const MARQUEE_SECONDARY = [
  " If you’re not happy with the initial design direction, you can walk away without paying the final balance.",
];

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.08 7.1a1 1 0 0 1-1.42-.002L3.29 8.88a1 1 0 1 1 1.415-1.414l3.2 3.2 6.37-6.375a1 1 0 0 1 1.429-.001Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type MarqueeRowProps = {
  items: string[];
  duration: number;
  reverse?: boolean;
};

function MarqueeRow({ items, duration, reverse }: MarqueeRowProps) {
  const shouldReduceMotion = useReducedMotion();
  const direction = reverse ? ["-50%", "0%"] : ["0%", "-50%"];

  return (
    <div className="overflow-hidden border-y-2 border-[#3F3F46]">
      <motion.div
        className="flex w-max items-center gap-10 py-4 text-lg font-bold tracking-tight text-[#FAFAFA] uppercase md:text-xl lg:text-2xl"
        animate={shouldReduceMotion ? undefined : { x: direction }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration, ease: "linear", repeat: Infinity }
        }
      >
        {[0, 1].map((repeatIndex) => (
          <div key={repeatIndex} className="flex items-center gap-10 pr-10">
            {items.map((item) => (
              <span
                key={`${repeatIndex}-${item}`}
                className="whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function PricingSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const shouldReduceMotion = useReducedMotion();
  const { openContactForm, setContactFormPreset } = useContactFormStore();

  return (
    <section id="pricing" className="relative w-full bg-[#09090B] p-12">
      <div className="mx-auto max-w-[95vw] px-4 py-20 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-6 left-6 hidden text-[8rem] leading-none font-bold text-[#27272A] opacity-20 md:block md:text-[10rem]"
        >
          SHIMG
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-32 right-6 hidden text-[10rem] leading-none font-bold text-[#27272A] opacity-40 md:block md:text-[14rem]"
        >
          DEV
        </div>

        {/* Header */}
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="text-lg font-bold tracking-tight text-[#FAFAFA] uppercase md:text-xl"
          >
            Pricing
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-6 text-[clamp(3rem,12vw,9rem)] leading-[0.8] font-bold tracking-tighter text-[#FAFAFA] uppercase"
          >
            Clear packages.
            <br />
            Easy upgrades.
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl text-lg leading-tight font-medium text-[#A1A1AA] md:text-xl lg:text-2xl"
          >
            {` From a fast launch landing page to a scalable login + admin build.
            Each tier has a clear scope to keep projects predictable.`}
          </motion.p>
        </motion.div>

        {/* Marquees */}
        <div className="mt-12 space-y-4">
          <MarqueeRow items={MARQUEE_PRIMARY} duration={18} />
          <MarqueeRow items={MARQUEE_SECONDARY} duration={28} reverse />
        </div>

        {/* Cards */}
        <motion.div
          className="relative mt-16 grid gap-8 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {TIERS.map((tier, index) => {
            const cardBase =
              "group relative flex h-full flex-col border-2 border-[#3F3F46] bg-[#09090B] p-6 transition-colors duration-200 md:p-8";
            const cardHover =
              "hover:bg-[#DFE104] hover:text-black hover:border-[#DFE104]";
            const buttonBase =
              "inline-flex w-full items-center justify-center border-2 px-5 py-3 text-base font-bold uppercase tracking-tight transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] md:text-lg";
            const buttonPrimary =
              "border-[#DFE104] bg-[#DFE104] text-black hover:scale-105 active:scale-95";
            const buttonOutline =
              "border-[#3F3F46] bg-transparent text-[#FAFAFA] hover:scale-105 hover:bg-[#FAFAFA] hover:text-black active:scale-95 group-hover:border-black group-hover:text-black";

            return (
              <motion.div
                key={tier.name}
                className={`${cardBase} ${cardHover}`}
                variants={itemVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { scale: 1.02, transition: { duration: 0.2 } }
                }
              >
                {/* Badge */}
                {tier.badge ? (
                  <div className="border-2 border-[#3F3F46] px-4 py-2 text-sm font-bold tracking-tight text-[#FAFAFA] uppercase transition-colors duration-200 group-hover:border-black group-hover:text-black">
                    {tier.badge}
                  </div>
                ) : null}

                {/* Title */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold tracking-tight text-[#FAFAFA] uppercase transition-colors duration-200 group-hover:text-black md:text-3xl">
                    {tier.name}
                  </h3>
                  <p className="mt-3 text-base leading-tight font-medium text-[#A1A1AA] transition-colors duration-200 group-hover:text-black/70 md:text-lg">
                    {tier.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-8">
                  <div className="flex flex-wrap items-end gap-3">
                    <p className="text-4xl font-bold tracking-tight text-[#FAFAFA] uppercase transition-colors duration-200 group-hover:text-black md:text-5xl">
                      {tier.price}
                    </p>
                    {tier.originalPrice ? (
                      <p className="pb-1 text-base font-bold tracking-tight text-[#A1A1AA] uppercase line-through decoration-2 transition-colors duration-200 group-hover:text-black/60 md:text-lg">
                        {tier.originalPrice}
                      </p>
                    ) : null}
                    {tier.period ? (
                      <p className="pb-1 text-base font-bold tracking-tight text-[#A1A1AA] uppercase transition-colors duration-200 group-hover:text-black/70 md:text-lg">
                        {tier.period}
                      </p>
                    ) : null}
                  </div>
                  {tier.finePrint ? (
                    <p className="mt-3 text-base leading-tight font-medium text-[#A1A1AA] transition-colors duration-200 group-hover:text-black/70 md:text-lg">
                      {tier.finePrint}
                    </p>
                  ) : null}
                </div>

                {/* Features */}
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-base md:text-lg"
                    >
                      <CheckIcon className="mt-1 h-5 w-5 text-[#DFE104] transition-colors duration-200 group-hover:text-black" />
                      <span className="leading-tight font-medium text-[#A1A1AA] transition-colors duration-200 group-hover:text-black/70">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  <a
                    href={tier.cta.href}
                    className={`${buttonOutline} ${buttonBase}`}
                    onClick={(event) => {
                      event.preventDefault();
                      setContactFormPreset(tier.preset);
                      openContactForm();
                    }}
                  >
                    {tier.cta.label}
                  </a>

                  <p className="mt-4 text-center text-sm font-bold tracking-tight text-[#A1A1AA] uppercase transition-colors duration-200 group-hover:text-black/70">
                    Typically replies within 24-48 hours
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="mt-16 border-2 border-[#3F3F46] bg-[#09090B] p-8 md:p-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-[#FAFAFA] uppercase"
          >
            {`What's included`}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg leading-tight font-medium text-[#A1A1AA] md:text-xl lg:text-2xl"
          >
            {` All tiers include basic usability (readability, tap targets, form
            validation), sensible security defaults, and a simple handover.
            Monthly maintenance (updates, backups, monitoring) can be added as
            an optional plan.`}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
