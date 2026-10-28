"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Feather } from "lucide-react";
import { LetterItem } from "@/content/categories";
import { WaxSealBadge } from "@/components/ui/RomanticOrnaments";

interface LetterCardProps {
  letter: LetterItem;
  index?: number;
}

export function LetterCard({ letter }: LetterCardProps) {
  return (
    <article className="romantic-parchment group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[#D6B17A]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#641D35]/70 sm:p-8">
      {/* Inner delicate rose border rule */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-[1.35rem] border border-[#C98298]/35 transition-colors group-hover:border-[#641D35]/35 sm:inset-2.5"
      />

      {/* Top decorative wax seal and category ribbon */}
      <div className="relative z-10 min-w-0">
        <div className="flex items-start justify-between gap-2.5">
          <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-[#C98298]/55 bg-[#641D35] px-3 py-1 text-xs font-medium text-[#FFF5ED] shadow-sm sm:px-3.5">
            <Feather className="h-3 w-3 shrink-0 text-[#F8E8D5]" aria-hidden="true" />
            <span className="truncate">{letter.categoryLabel}</span>
          </span>

          <WaxSealBadge
            size="sm"
            className="shrink-0 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Title in rich deep wine Amiri serif */}
        <h2 className="font-literary mt-4 text-xl leading-snug font-bold text-[#35111F] transition-colors group-hover:text-[#641D35] sm:mt-5 sm:text-[1.65rem]">
          <Link
            href={`/letters/${letter.slug}`}
            className="focus-visible:outline-none focus-visible:underline"
          >
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {letter.title}
          </Link>
        </h2>

        {/* Subtitle */}
        <p className="mt-1.5 text-xs font-medium text-[#641D35] sm:text-sm">
          {letter.subtitle}
        </p>

        {/* Handwritten-feel salutation preview */}
        <p className="font-literary mt-4 border-r-2 border-[#C98298] pr-3 text-sm italic text-[#48253F]">
          {letter.openingSalutation}
        </p>

        {/* Excerpt from opening paragraph */}
        <p className="mt-3 line-clamp-3 text-sm leading-8 text-[#35111F]/90">
          {letter.paragraphs[0]}
        </p>
      </div>

      {/* Footer metadata & tangible open-letter prompt */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#C98298]/40 pt-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#641D35] sm:gap-3">
          <span className="rounded-full bg-[#F0C5D1]/45 px-2.5 py-0.5 font-medium text-[#35111F]">
            {letter.moodTag}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3 shrink-0 text-[#641D35]" aria-hidden="true" />
            <span>{letter.readingMinutes} دقائق</span>
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#641D35] transition-transform duration-300 group-hover:-translate-x-1 sm:text-sm">
          <span>فضّي ختم الرسالة</span>
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
