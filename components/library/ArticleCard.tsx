"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { ArticleItem } from "@/content/categories";

interface ArticleCardProps {
  article: ArticleItem;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const firstPullQuote =
    article.sections.find((s) => s.pullQuote)?.pullQuote ||
    article.quotableLines[0];

  return (
    <article className="romantic-velvet group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[1.85rem] border border-[#D6B17A]/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#F0C5D1]/70">
      {/* Editorial Article Cover Banner */}
      <div
        className="relative min-w-0 overflow-hidden border-b border-[#D6B17A]/30 px-5 pt-5 pb-5 sm:px-7 sm:pt-6"
        style={{
          background:
            "radial-gradient(circle at 85% 20%, rgba(201, 130, 152, 0.25) 0%, rgba(100, 29, 53, 0.7) 50%, rgba(53, 17, 31, 0.95) 100%)",
        }}
      >
        {/* Subtle botanical editorial ornament in cover corner */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 -left-4 h-28 w-28 text-[#D6B17A] opacity-15 transition-transform duration-500 group-hover:scale-110"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.8" />
          <path
            d="M50 8L56 44L92 50L56 56L50 92L44 56L8 50L44 44L50 8Z"
            fill="currentColor"
            fillOpacity="0.25"
          />
        </svg>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D6B17A]/50 bg-[#35111F]/85 px-3.5 py-1 text-xs font-medium text-[#F8E8D5]">
            <BookOpen className="h-3 w-3 text-[#D6B17A]" aria-hidden="true" />
            <span>{article.categoryLabel}</span>
          </span>

          <span className="inline-flex items-center gap-1 text-xs text-[#F8E8D5]/85">
            <Clock className="h-3 w-3 text-[#D6B17A]" aria-hidden="true" />
            <span>{article.readingMinutes} دقائق</span>
          </span>
        </div>

        {/* Large Arabic serif article title */}
        <h2 className="font-literary relative z-10 mt-4 text-2xl leading-snug font-normal text-[#FFF5ED] transition-colors group-hover:text-[#F8E8D5] sm:text-[1.7rem]">
          <Link
            href={`/library/${article.slug}`}
            className="focus-visible:outline-none focus-visible:underline"
          >
            <span className="absolute inset-0 z-20" aria-hidden="true" />
            {article.title}
          </Link>
        </h2>

        {/* Subtitle */}
        <p className="relative z-10 mt-1.5 text-xs font-medium text-[#F0C5D1] sm:text-sm">
          {article.subtitle}
        </p>
      </div>

      {/* Editorial Body & Opening Quotation */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          {firstPullQuote && (
            <blockquote className="font-literary mb-4 rounded-xl border-r-2 border-[#D6B17A] bg-[#FFF5ED]/[0.05] py-2.5 pr-3.5 pl-3 text-sm leading-relaxed text-[#F8E8D5] italic">
              «{firstPullQuote}»
            </blockquote>
          )}

          <p className="line-clamp-3 text-sm leading-8 text-[#FFF5ED]/85">
            {article.excerpt}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-[#D6B17A]/20 pt-4">
          <span className="text-xs text-[#F8E8D5]/75">
            {article.sections.length} فصول تأمّلية
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D6B17A] transition-transform duration-300 group-hover:-translate-x-1 sm:text-sm">
            <span>قراءة التأمّل كاملًا</span>
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
