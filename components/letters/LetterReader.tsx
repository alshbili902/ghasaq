"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Copy,
  Feather,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { LetterItem } from "@/content/categories";
import { letters } from "@/content/letters";
import {
  CornerFiligree,
  OrnamentalDivider,
  WaxSealBadge,
} from "@/components/ui/RomanticOrnaments";

interface LetterReaderProps {
  letter: LetterItem;
  previousLetter: LetterItem | null;
  nextLetter: LetterItem | null;
}

export function LetterReader({
  letter,
  previousLetter,
  nextLetter,
}: LetterReaderProps) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const handleCopyQuote = async () => {
    try {
      await navigator.clipboard.writeText(
        `«${letter.highlightedQuote}» — من دحوم إلى سوسو`
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Ignore if clipboard unavailable
    }
  };

  const handleRandomAnotherLetter = () => {
    const others = letters.filter((l) => l.slug !== letter.slug);
    if (others.length === 0) return;
    const picked = others[Math.floor(Math.random() * others.length)];
    router.push(`/letters/${picked.slug}`);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 md:py-14">
      {/* Outer Burgundy Velvet Binding */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[2.25rem] border border-[#D6B17A]/55 bg-gradient-to-b from-[#59182F] via-[#3E1122] to-[#2B0B17] p-2.5 shadow-[0_30px_90px_-15px_rgba(15,4,8,0.9)] sm:p-4"
      >
        {/* Warm Ivory Handwritten Letter Parchment */}
        <article className="romantic-parchment relative overflow-hidden rounded-[1.8rem] border border-[#D6B17A]/70 p-6 sm:p-10 md:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 rounded-[1.45rem] border border-[#C98298]/35"
          />

          <CornerFiligree tone="burgundy" />

          {/* Letter header metadata */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#C98298]/45 pb-6">
            <Link
              href={`/letters?category=${letter.categoryId}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#D6B17A]/60 bg-[#641D35] px-4 py-1.5 text-xs font-medium text-[#FFF5ED] shadow-sm transition-colors hover:bg-[#7A2340]"
            >
              <Feather
                className="h-3.5 w-3.5 text-[#F8E8D5]"
                aria-hidden="true"
              />
              <span>{letter.categoryLabel}</span>
            </Link>

            <div className="flex items-center gap-3 text-xs text-[#641D35]">
              <span className="rounded-full border border-[#C98298]/50 bg-[#F0C5D1]/40 px-3 py-1 font-medium text-[#35111F]">
                {letter.moodTag}
              </span>
              <span className="inline-flex items-center gap-1 font-medium">
                <Clock className="h-3.5 w-3.5 text-[#641D35]" aria-hidden="true" />
                <span>{letter.readingMinutes} دقائق للقراءة</span>
              </span>
            </div>
          </div>

          {/* Title and subtitle */}
          <header className="relative z-10 mt-8 text-center">
            <h1 className="font-literary text-3xl leading-relaxed font-bold text-[#35111F] sm:text-4xl sm:leading-relaxed">
              {letter.title}
            </h1>
            <p className="mt-2 text-sm font-medium text-[#641D35] sm:text-base">
              {letter.subtitle}
            </p>
            <OrnamentalDivider variant="dark" className="my-5" />
          </header>

          {/* Salutation */}
          <p className="font-literary relative z-10 mt-6 border-r-2 border-[#641D35] pr-4 text-xl leading-loose font-bold text-[#641D35] sm:text-2xl">
            {letter.openingSalutation}
          </p>

          {/* Letter body paragraphs */}
          <div className="font-literary relative z-10 mt-7 space-y-6 text-lg leading-[2.25] text-[#35111F] sm:text-[1.3rem] sm:leading-[2.3]">
            {letter.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-justify sm:text-right">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Highlighted literary quotation box in Deep Burgundy Velvet */}
          <div className="relative z-10 my-10 rounded-2xl border border-[#D6B17A]/75 bg-gradient-to-br from-[#641D35] via-[#4B1528] to-[#35111F] p-6 text-[#FFF5ED] shadow-[0_16px_40px_-12px_rgba(53,17,31,0.65)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <Sparkles
                className="mt-1 h-5 w-5 shrink-0 text-[#D6B17A]"
                aria-hidden="true"
              />
              <blockquote className="font-literary flex-1 text-xl leading-relaxed text-[#FFF5ED] sm:text-2xl sm:leading-relaxed">
                «{letter.highlightedQuote}»
              </blockquote>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={handleCopyQuote}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#D6B17A]/50 bg-[#FFF5ED]/10 px-4 py-1.5 text-xs font-medium text-[#F8E8D5] transition-colors hover:border-[#F0C5D1] hover:bg-[#FFF5ED]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A]"
              >
                {copied ? (
                  <>
                    <Check
                      className="h-3.5 w-3.5 text-[#D6B17A]"
                      aria-hidden="true"
                    />
                    <span className="text-[#FFF5ED]">تم نسخ الاقتباس</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>نسخ الاقتباس</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Closing and Wax-Sealed Signature */}
          <footer className="relative z-10 mt-8 border-t border-[#C98298]/50 pt-7">
            <p className="font-literary text-lg leading-relaxed text-[#48253F] sm:text-xl">
              {letter.closingLine}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <WaxSealBadge size="md" />
                <div>
                  <span className="font-literary block text-2xl font-bold text-[#641D35] sm:text-3xl">
                    — {letter.signature}
                  </span>
                  <span className="text-xs font-medium text-[#48253F]">
                    إلى سوسو، بكلّ الحبّ والمودّة
                  </span>
                </div>
              </div>

              <span className="rounded-full border border-[#C98298]/50 bg-[#FFF5ED]/80 px-4 py-1.5 text-xs font-medium text-[#641D35]">
                دفتر رسائل سوسو الخاص
              </span>
            </div>
          </footer>
        </article>
      </motion.div>

      {/* Bottom navigation between letters */}
      <nav
        aria-label="التنقل بين الرسائل"
        className="mt-8 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row">
          {previousLetter && (
            <Link
              href={`/letters/${previousLetter.slug}`}
              className="group flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-[#D6B17A]/35 bg-[#35111F]/90 p-4 transition-all hover:border-[#F0C5D1]/70 hover:bg-[#4A172B]"
            >
              <ArrowRight
                className="h-4 w-4 shrink-0 text-[#D6B17A] transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <span className="block text-xs text-[#F0C5D1]/80">
                  الرسالة السابقة
                </span>
                <span className="font-literary mt-0.5 block truncate text-base text-[#FFF5ED] sm:text-lg">
                  {previousLetter.title}
                </span>
              </div>
            </Link>
          )}

          {nextLetter && (
            <Link
              href={`/letters/${nextLetter.slug}`}
              className="group flex min-w-0 flex-1 items-center justify-between gap-3 rounded-2xl border border-[#D6B17A]/35 bg-[#35111F]/90 p-4 transition-all hover:border-[#F0C5D1]/70 hover:bg-[#4A172B]"
            >
              <div className="min-w-0 flex-1">
                <span className="block text-xs text-[#F0C5D1]/80">
                  الرسالة التالية
                </span>
                <span className="font-literary mt-0.5 block truncate text-base text-[#FFF5ED] sm:text-lg">
                  {nextLetter.title}
                </span>
              </div>
              <ArrowLeft
                className="h-4 w-4 shrink-0 text-[#D6B17A] transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={handleRandomAnotherLetter}
          className="inline-flex min-h-[54px] shrink-0 items-center justify-center gap-2.5 rounded-2xl border border-[#D6B17A]/60 bg-gradient-to-b from-[#7A2340] to-[#4A1326] px-6 py-3 text-sm font-medium text-[#FFF5ED] shadow-[0_12px_30px_-8px_rgba(100,29,53,0.6)] transition-all hover:border-[#F0C5D1] hover:from-[#8C2849] hover:to-[#5B172F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A]"
        >
          <Shuffle className="h-4 w-4 text-[#F8E8D5]" aria-hidden="true" />
          <span>رسالة عشوائية أخرى</span>
        </button>
      </nav>
    </div>
  );
}
