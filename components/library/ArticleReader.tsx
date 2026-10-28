"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  BookOpen,
  Check,
  Clock,
  Copy,
  Quote,
  Sparkles,
} from "lucide-react";
import { ArticleItem } from "@/content/categories";
import { ArticleCard } from "./ArticleCard";
import {
  CornerFiligree,
  OrnamentalDivider,
  WaxSealBadge,
} from "@/components/ui/RomanticOrnaments";

interface ArticleReaderProps {
  article: ArticleItem;
  relatedArticles: readonly ArticleItem[];
}

export function ArticleReader({
  article,
  relatedArticles,
}: ArticleReaderProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setReadingProgress(100);
        return;
      }
      const percentage = Math.min(
        100,
        Math.max(0, (scrollTop / docHeight) * 100)
      );
      setReadingProgress(percentage);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  const handleCopyQuote = async (quoteText: string, index: number) => {
    try {
      await navigator.clipboard.writeText(`«${quoteText}» — ${article.title}`);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 2200);
    } catch {
      // Ignore if clipboard is unavailable
    }
  };

  return (
    <>
      {/* Understated Champagne-Gold & Dusty-Rose Reading Progress Indicator */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-40 h-1 bg-[#240914]/60"
      >
        <div
          className="h-full bg-gradient-to-l from-[#D6B17A] via-[#F0C5D1] to-[#C98298] transition-[width] duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 md:py-14">
        <motion.article
          initial={
            shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2.25rem] border border-[#D6B17A]/55 bg-[#35111F] shadow-[0_30px_90px_-15px_rgba(14,4,8,0.9)]"
        >
          {/* Editorial Deep Burgundy Cover Composition */}
          <header
            className="relative overflow-hidden border-b border-[#D6B17A]/45 px-6 py-10 text-center sm:px-12 sm:py-14"
            style={{
              background:
                "radial-gradient(circle at 50% 25%, rgba(100, 29, 53, 0.92) 0%, rgba(72, 37, 63, 0.85) 55%, rgba(53, 17, 31, 0.98) 100%)",
            }}
          >
            <CornerFiligree tone="gold" />

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`/library?category=${article.categoryId}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#D6B17A]/55 bg-[#35111F]/90 px-4 py-1.5 text-xs font-medium text-[#F8E8D5] transition-colors hover:border-[#F0C5D1]"
              >
                <BookOpen
                  className="h-3.5 w-3.5 text-[#D6B17A]"
                  aria-hidden="true"
                />
                <span>{article.categoryLabel}</span>
              </Link>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C98298]/40 bg-[#FFF5ED]/10 px-3.5 py-1.5 text-xs text-[#F8E8D5]">
                <Clock
                  className="h-3.5 w-3.5 text-[#D6B17A]"
                  aria-hidden="true"
                />
                <span>الوقت المقدّر للقراءة: {article.readingMinutes} دقائق</span>
              </span>
            </div>

            <h1 className="font-literary relative z-10 mt-6 text-3xl leading-relaxed font-normal text-[#FFF5ED] sm:text-5xl sm:leading-relaxed">
              {article.title}
            </h1>

            <p className="relative z-10 mt-3 text-sm leading-relaxed font-medium text-[#F0C5D1] sm:text-base">
              {article.subtitle}
            </p>

            <OrnamentalDivider variant="gold" />

            {/* Opening Literary Excerpt */}
            <p className="font-literary relative z-10 mx-auto max-w-2xl text-lg leading-loose text-[#F8E8D5]/95 italic sm:text-xl">
              «{article.excerpt}»
            </p>
          </header>

          {/* Warm Ivory Literary Reading Sanctuary Body */}
          <div className="romantic-parchment relative p-6 sm:p-10 md:p-14">
            <div className="space-y-10">
              {article.sections.map((section, secIdx) => (
                <section key={secIdx} className="space-y-5">
                  {section.heading && (
                    <h2 className="font-literary flex items-center gap-3 text-2xl font-bold text-[#641D35] sm:text-3xl">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rotate-45 bg-[#D6B17A]"
                      />
                      <span>{section.heading}</span>
                    </h2>
                  )}

                  <div className="font-literary space-y-5 text-lg leading-[2.25] text-[#35111F] sm:text-[1.28rem] sm:leading-[2.3]">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-justify sm:text-right">
                        {p}
                      </p>
                    ))}
                  </div>

                  {section.pullQuote && (
                    <blockquote className="font-literary my-7 rounded-2xl border-r-4 border-[#641D35] bg-[#641D35]/[0.07] py-5 pr-6 pl-5 text-xl leading-relaxed font-bold text-[#641D35] sm:text-2xl">
                      «{section.pullQuote}»
                    </blockquote>
                  )}
                </section>
              ))}
            </div>

            {/* Copyable Quotations Section */}
            {article.quotableLines.length > 0 && (
              <section
                aria-label="اقتباسات مختارة قابلة للنسخ"
                className="mt-12 rounded-2xl border border-[#D6B17A]/75 bg-gradient-to-br from-[#641D35] via-[#4A1428] to-[#35111F] p-6 text-[#FFF5ED] shadow-lg sm:p-8"
              >
                <div className="mb-5 flex items-center gap-2 text-sm font-medium text-[#F8E8D5]">
                  <Quote
                    className="h-4 w-4 text-[#D6B17A]"
                    aria-hidden="true"
                  />
                  <span>سطورٌ للذكرى — يمكنكِ نسخ ما يلامسُ قلبكِ منها</span>
                </div>

                <div className="space-y-4">
                  {article.quotableLines.map((quoteLine, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between gap-3 rounded-xl border border-[#D6B17A]/35 bg-[#260914]/65 p-4 sm:flex-row sm:items-center"
                    >
                      <p className="font-literary text-lg leading-relaxed text-[#FFF5ED] sm:text-xl">
                        «{quoteLine}»
                      </p>

                      <button
                        type="button"
                        onClick={() => handleCopyQuote(quoteLine, idx)}
                        className="inline-flex shrink-0 items-center justify-center gap-1.5 self-end rounded-xl border border-[#D6B17A]/50 bg-[#FFF5ED]/10 px-3.5 py-2 text-xs font-medium text-[#F8E8D5] transition-colors hover:border-[#F0C5D1] hover:bg-[#FFF5ED]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:self-center"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check
                              className="h-3.5 w-3.5 text-[#D6B17A]"
                              aria-hidden="true"
                            />
                            <span className="text-[#FFF5ED]">تم النسخ</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>نسخ السطر</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Closing reflection */}
            <footer className="mt-10 border-t border-[#C98298]/50 pt-7">
              <div className="flex items-start gap-3.5">
                <WaxSealBadge size="sm" className="mt-1" />
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-[#641D35]">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>إضاءةٌ ختامية لقلبكِ</span>
                  </p>
                  <p className="font-literary mt-1.5 text-xl leading-relaxed font-bold text-[#35111F] sm:text-2xl">
                    {article.closingReflection}
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </motion.article>

        {/* Related articles section */}
        {relatedArticles.length > 0 && (
          <section
            aria-label="مقالات ذات صلة"
            className="mt-14 border-t border-[#D6B17A]/25 pt-10"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-literary text-2xl text-[#FFF5ED] sm:text-3xl">
                نصوصٌ أخرى قد تؤنسُ وقتكِ
              </h2>
              <Link
                href="/library"
                className="text-xs font-medium text-[#D6B17A] underline-offset-4 hover:underline sm:text-sm"
              >
                عرض جميع المقالات
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedArticles.slice(0, 2).map((related) => (
                <ArticleCard key={related.id} article={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
