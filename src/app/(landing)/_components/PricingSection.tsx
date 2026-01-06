"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useContactFormStore } from "@/hook/store";

type PricingTier = {
  name: string;
  tagline: string;
  price: string;
  pricePrefix?: string; // e.g. "From"
  period?: string; // keep if you still want "one-time" etc.
  badge?: string;
  highlighted?: boolean;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
  preset: "starter" | "growth" | "pro";
  finePrint?: string;
  timeline?: string;
};

const TIERS: PricingTier[] = [
  {
    name: "Starter Launch",
    tagline: "A clean, high-converting one-page launch to ship fast.",
    price: "£400",
    pricePrefix: "From",
    period: "one-time",
    badge: "Fastest",
    preset: "starter",
    timeline: "Timeline: 7–10 days",
    features: [
      "1 custom-designed landing page",
      "Responsive (mobile + desktop)",
      "Basic SEO (title/meta + Open Graph)",
      "Contact form with email notification",
      "Deployment (Vercel / Netlify)",
      "1 design direction adjustment + 2 content revisions",
    ],
    cta: { label: "Get a free plan", href: "#contact" },
    finePrint: "Best for promos, personal brands, and MVP launches.",
  },
  {
    name: "Growth Site",
    tagline: "Business website + CMS so you can update content yourself.",
    price: "£1,300",
    pricePrefix: "From",
    period: "one-time",
    highlighted: true,
    badge: "Most Popular",
    preset: "growth",
    timeline: "Timeline: 2–3 weeks",
    features: [
      "5–8 pages (Home, About, Services, FAQ, Contact)",
      "Custom UI/UX design (no off-the-shelf templates)",
      "CMS included (edit content yourself)",
      "Performance basics (image optimization + lazy loading)",
      "SEO basics (structure + sitemap + robots)",
      "Analytics setup (GA / Plausible optional)",
      "2 design revisions + 3 content revisions",
    ],
    cta: { label: "Request a quick quote", href: "#contact" },
    finePrint: "Best for SMEs who want a site that can grow over time.",
  },
  {
    name: "Pro Partner Build",
    tagline: "Login + admin dashboard for scalable web apps.",
    price: "Custom quote",
    pricePrefix: undefined,
    period: "typically £3,200+",
    badge: "Limited slots",
    preset: "pro",
    timeline: "Timeline: 4–8 weeks",
    features: [
      "Auth (login + registration; OAuth optional)",
      "Admin dashboard (manage content/data)",
      "Roles & permissions (Admin/Staff/User)",
      "Data model planning (built to extend)",
      "Deployment + environment setup (preview + prod)",
      "Better handover (docs + walkthrough)",
    ],
    cta: { label: "Discuss requirements", href: "#contact" },
    finePrint: "Best for membership sites, internal tools, and SaaS.",
  },
];

const MARQUEE_PRIMARY = [
  "FREE 3-POINT WEBSITE PLAN • MOBILE • CTA • SPEED • CONTENT STRUCTURE • ",
];

const MARQUEE_SECONDARY = [
  "NOT SURE WHICH PACKAGE FITS? TELL ME YOUR GOAL • I’LL SUGGEST THE BEST OPTION (FREE) • ",
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
    <div className="overflow-hidden border-y-2 border-[#E4E4E7]">
      <motion.div
        className="flex w-max items-center gap-10 py-4 text-lg font-bold tracking-tight text-[#111827] uppercase md:text-xl lg:text-2xl"
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

  const openLeadForm = (preset: PricingTier["preset"] | null) => {
    setContactFormPreset(preset);
    openContactForm();
  };

  return (
    <section id="pricing" className="relative w-full bg-[#F6F5F1] p-12">
      <div className="mx-auto max-w-[95vw] px-4 py-20 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-6 left-6 hidden text-[8rem] leading-none font-bold text-[#D4D4D8] opacity-60 md:block md:text-[10rem]"
        >
          SHIMG
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-32 right-6 hidden text-[10rem] leading-none font-bold text-[#D4D4D8] opacity-70 md:block md:text-[14rem]"
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
            className="text-lg font-bold tracking-tight text-[#111827] uppercase md:text-xl"
          >
            Start options
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="mt-6 text-[clamp(3rem,12vw,9rem)] leading-[0.8] font-bold tracking-tighter text-[#111827] uppercase"
          >
            Pick a start.
            <br />
            I&apos;ll help you choose.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl text-lg leading-tight font-medium text-[#52525B] md:text-xl lg:text-2xl"
          >
            Tell me your goal and I&apos;ll reply with the best option and a
            simple next step. No pressure, just clarity.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={() => openLeadForm(null)}
              className="inline-flex items-center justify-center border-2 border-[#111827] bg-[#DFE104] px-6 py-3 text-base font-bold tracking-tight text-[#111827] uppercase transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F5F1] focus-visible:outline-none active:scale-95"
            >
              Get a free website check
            </button>

            <button
              type="button"
              onClick={() => openLeadForm(null)}
              className="inline-flex items-center justify-center border-2 border-[#111827] bg-transparent px-6 py-3 text-base font-bold tracking-tight text-[#111827] uppercase transition-transform duration-200 hover:scale-105 hover:bg-[#111827] hover:text-white focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F5F1] focus-visible:outline-none active:scale-95"
            >
              Not sure? ask me
            </button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-sm font-bold tracking-tight text-[#52525B] uppercase"
          >
            Typically replies within 24–48 hours
          </motion.p>
        </motion.div>

        {/* Marquees */}
        <div className="mt-12 space-y-4">
          <MarqueeRow items={MARQUEE_PRIMARY} duration={18} />
          <MarqueeRow items={MARQUEE_SECONDARY} duration={28} reverse />
        </div>

        {/* Cards */}
        <motion.div
          className="relative mt-16 grid scale-90 gap-8 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {TIERS.map((tier) => {
            const cardBase =
              "group relative flex h-full flex-col border-2 border-[#E4E4E7] bg-[#FFFFFF] p-6 transition-colors duration-200 md:p-8";
            const cardHover =
              "hover:bg-[#111827] hover:text-white hover:border-[#111827]";

            const buttonBase =
              "inline-flex w-full items-center justify-center border-2 px-5 py-3 text-base font-bold uppercase tracking-tight transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] md:text-lg";

            const buttonPrimary =
              "border-foreground  bg-[#111827] text-white hover:scale-105 active:scale-95";

            const buttonOutline =
              "border-[#111827] bg-transparent text-[#111827] hover:scale-105 hover:bg-[#111827] hover:text-white active:scale-95 group-hover:border-white group-hover:text-white";

            const usePrimaryCta = Boolean(tier.highlighted);

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
                  <div className="border-2 border-[#D4D4D8] px-4 py-2 text-sm font-bold text-[#111827] uppercase transition-colors duration-200 group-hover:border-white group-hover:text-white">
                    {tier.badge}
                  </div>
                ) : null}

                {/* Title */}
                <div className="mt-6">
                  <h3 className="font-milker text-2xl text-[#111827] uppercase transition-colors duration-200 group-hover:text-white md:text-3xl">
                    {tier.name}
                  </h3>
                  <p className="mt-3 text-base leading-tight font-medium text-[#52525B] transition-colors duration-200 group-hover:text-white/70 md:text-lg">
                    {tier.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-8">
                  <div className="flex flex-wrap items-end gap-3">
                    {tier.pricePrefix ? (
                      <p className="pb-1 text-sm font-bold tracking-tight text-[#52525B] uppercase transition-colors duration-200 group-hover:text-white/70 md:text-base">
                        {tier.pricePrefix}
                      </p>
                    ) : null}

                    <p className="text-3xl font-bold tracking-tight text-[#111827] uppercase transition-colors duration-200 group-hover:text-white md:text-4xl">
                      {tier.price}
                    </p>

                    {tier.period ? (
                      <p className="pb-1 text-sm font-bold tracking-tight text-[#52525B] uppercase transition-colors duration-200 group-hover:text-white/70 md:text-base">
                        {tier.period}
                      </p>
                    ) : null}
                  </div>

                  {tier.finePrint ? (
                    <p className="mt-3 text-base leading-tight font-medium text-[#52525B] transition-colors duration-200 group-hover:text-white/70 md:text-lg">
                      {tier.finePrint}
                    </p>
                  ) : null}

                  {tier.timeline ? (
                    <p className="mt-3 text-sm font-bold tracking-tight text-[#52525B] uppercase transition-colors duration-200 group-hover:text-white/70">
                      {tier.timeline}
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
                      <CheckIcon className="mt-1 h-5 w-5 text-[#111827] transition-colors duration-200 group-hover:text-[#DFE104]" />
                      <span className="leading-tight font-medium text-[#52525B] transition-colors duration-200 group-hover:text-white/70">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  <a
                    href={tier.cta.href}
                    className={`${buttonBase} ${usePrimaryCta ? buttonPrimary : buttonOutline}`}
                    onClick={(event) => {
                      event.preventDefault();
                      openLeadForm(tier.preset);
                    }}
                  >
                    {tier.cta.label}
                  </a>

                  <p className="mt-4 text-center text-sm font-bold tracking-tight text-[#52525B] uppercase transition-colors duration-200 group-hover:text-white/70">
                    {` Typically replies within 24–48 hours`}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="mt-16 border-2 border-[#E4E4E7] bg-[#FFFFFF] p-8 md:p-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-[#111827] uppercase"
          >
            {`What's included`}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg leading-tight font-medium text-[#52525B] md:text-xl lg:text-2xl"
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
