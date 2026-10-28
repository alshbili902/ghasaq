"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { BookOpen, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import {
  CornerFiligree,
  OrnamentalDivider,
  RoseCrestOrnament,
  WaxSealBadge,
} from "@/components/ui/RomanticOrnaments";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.85,
            delay,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };

  return (
    <main className="relative z-10 flex min-h-[100dvh] w-full overflow-x-clip flex-col items-center justify-center px-3.5 py-8 sm:px-8 sm:py-10 md:py-14">
      {/* Soft blush & candlelight halo behind central romantic frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-1/2 mx-auto h-[340px] max-w-2xl -translate-y-1/2 rounded-full opacity-35 blur-3xl sm:h-[420px]"
        style={{
          background:
            "radial-gradient(circle, rgba(240, 197, 209, 0.28) 0%, rgba(214, 177, 122, 0.14) 52%, transparent 100%)",
        }}
      />

      {/* Ornamental Romantic Sanctuary Frame */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="romantic-velvet relative mx-auto flex w-full max-w-3xl flex-col items-center overflow-hidden rounded-[2rem] border border-[#D6B17A]/35 px-4 py-8 text-center sm:rounded-[2.25rem] sm:px-12 sm:py-14 md:px-16"
      >
        {/* Inner fine champagne-gold hairline frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 rounded-[1.6rem] border border-[#F0C5D1]/15 sm:inset-3.5 sm:rounded-[1.85rem]"
        />

        {/* Top luminous rose-gold highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#D6B17A]/80 to-transparent sm:inset-x-16"
        />

        {/* Delicate Corner Filigree */}
        <CornerFiligree tone="gold" />

        {/* Rose & Heart Botanical Crest */}
        <motion.div {...fadeUp(0.05)}>
          <RoseCrestOrnament />
        </motion.div>

        {/* Small introductory eyebrow */}
        <motion.div
          {...fadeUp(0.14)}
          className="mt-2 inline-flex max-w-full items-center gap-2 rounded-full border border-[#D6B17A]/40 bg-[#35111F]/80 px-4 py-1.5 text-xs tracking-wider text-[#F8E8D5] shadow-[0_4px_24px_rgba(201,130,152,0.2)] sm:gap-2.5 sm:px-5 sm:text-sm"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B17A]"
          />
          <span className="truncate">{siteConfig.hero.introLine}</span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B17A]"
          />
        </motion.div>

        {/* Main romantic heading */}
        <motion.h1
          {...fadeUp(0.24)}
          className="font-literary mt-6 text-2xl leading-[1.45] font-normal text-[#FFF5ED] drop-shadow-[0_2px_18px_rgba(240,197,209,0.18)] sm:text-5xl sm:leading-[1.38] md:text-[3.35rem]"
        >
          {siteConfig.hero.heading}
        </motion.h1>

        {/* Ornamental Champagne-Gold Divider */}
        <motion.div {...fadeUp(0.32)} className="w-full">
          <OrnamentalDivider variant="gold" />
        </motion.div>

        {/* Supporting intimate letter paragraph */}
        <motion.p
          {...fadeUp(0.4)}
          className="max-w-2xl text-sm leading-[2.1] font-light text-[#F8E8D5]/95 sm:text-[1.125rem] sm:leading-[2.2]"
        >
          {siteConfig.hero.paragraph}
        </motion.p>

        {/* Strictly TWO permanent primary navigation buttons */}
        <motion.nav
          {...fadeUp(0.52)}
          aria-label="الروابط الرئيسية"
          className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3.5 sm:mt-9 sm:max-w-lg sm:flex-row sm:items-center sm:gap-4"
        >
          <AnimatedButton
            href={siteConfig.hero.primaryButtons.letters.href}
            variant="primary"
            className="w-full flex-1 text-base sm:text-[1.05rem]"
          >
            <Mail
              className="h-4 w-4 shrink-0 text-[#F0C5D1] transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            <span>{siteConfig.hero.primaryButtons.letters.label}</span>
          </AnimatedButton>

          <AnimatedButton
            href={siteConfig.hero.primaryButtons.library.href}
            variant="secondary"
            className="w-full flex-1 text-base sm:text-[1.05rem]"
          >
            <BookOpen
              className="h-4 w-4 shrink-0 text-[#D6B17A] transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            <span>{siteConfig.hero.primaryButtons.library.label}</span>
          </AnimatedButton>
        </motion.nav>

        {/* Signature quotation and wax-seal attribution */}
        <motion.footer
          {...fadeUp(0.64)}
          className="mt-10 flex w-full flex-col items-center border-t border-[#D6B17A]/25 pt-6 text-center sm:mt-12 sm:pt-7"
        >
          <blockquote className="font-literary max-w-lg text-base leading-relaxed text-[#FFF5ED] italic sm:text-2xl">
            «{siteConfig.hero.signatureQuote}»
          </blockquote>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <span
              aria-hidden="true"
              className="h-px w-6 bg-gradient-to-l from-[#D6B17A]/60 to-transparent sm:w-8"
            />
            <WaxSealBadge size="sm" />
            <p className="font-literary text-base tracking-wide text-[#D6B17A] sm:text-lg">
              {siteConfig.hero.signatureAttribution}
            </p>
            <span
              aria-hidden="true"
              className="h-px w-6 bg-gradient-to-r from-[#D6B17A]/60 to-transparent sm:w-8"
            />
          </div>
        </motion.footer>
      </motion.div>
    </main>
  );
}
