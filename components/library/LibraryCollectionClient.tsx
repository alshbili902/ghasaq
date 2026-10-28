"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, BookOpen, Disc3, Search, X } from "lucide-react";
import {
  articleCategories,
  ArticleCategoryId,
  ArticleItem,
} from "@/content/categories";
import { ArticleCard } from "./ArticleCard";
import {
  OrnamentalDivider,
  RoseCrestOrnament,
} from "@/components/ui/RomanticOrnaments";

interface LibraryCollectionClientProps {
  allArticles: readonly ArticleItem[];
}

function normalizeArabicForSearch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .trim();
}

export function LibraryCollectionClient({
  allArticles,
}: LibraryCollectionClientProps) {
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const initialCategory = (searchParams.get("category") || "all") as
    | ArticleCategoryId
    | "all";

  const [selectedCategory, setSelectedCategory] = useState<
    ArticleCategoryId | "all"
  >(
    articleCategories.some((c) => c.id === initialCategory)
      ? initialCategory
      : "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const paramCat = searchParams.get("category") as ArticleCategoryId | null;
    if (paramCat && articleCategories.some((c) => c.id === paramCat)) {
      setSelectedCategory(paramCat);
    } else if (!paramCat) {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = normalizeArabicForSearch(searchQuery);

    return allArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.categoryId === selectedCategory;

      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      const fullContent = [
        article.title,
        article.subtitle,
        article.excerpt,
        article.categoryLabel,
        article.closingReflection,
        ...article.quotableLines,
        ...article.sections.flatMap((s) => [
          s.heading || "",
          s.pullQuote || "",
          ...s.paragraphs,
        ]),
      ].join(" ");

      return normalizeArabicForSearch(fullContent).includes(normalizedQuery);
    });
  }, [allArticles, selectedCategory, searchQuery]);

  const activeCategoryObj = useMemo(
    () => articleCategories.find((c) => c.id === selectedCategory),
    [selectedCategory]
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 md:py-14">
      {/* Romantic Reading Sanctuary Header */}
      <motion.section
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <RoseCrestOrnament />

        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#D6B17A]/45 bg-[#35111F]/85 px-4 py-1.5 text-xs font-medium text-[#F8E8D5] shadow-sm sm:text-sm">
          <span>المكتبة الأدبية والتأملات — عالم سوسو الخاص</span>
        </div>

        <h1 className="font-literary mt-5 text-3xl leading-relaxed font-normal text-[#FFF5ED] sm:text-5xl">
          إلى عالمكِ الجميل
        </h1>

        <OrnamentalDivider variant="gold" />

        <p className="mt-2 text-sm leading-8 text-[#F8E8D5]/90 sm:text-base sm:leading-9">
          واحةٌ للقراءةِ الهادئة، تضمّ تأمّلاتٍ ونصوصًا كُتبت على ضوءِ المودّة؛ لترافقكِ في أوقاتِ الدّراسةِ والقلق، وتذكّركِ بأنّ قيمتكِ أعمقُ من كلّ الإنجازاتِ السّريعة.
        </p>

        {/* Search input */}
        <div className="relative mx-auto mt-8 max-w-xl">
          <label htmlFor="library-search" className="sr-only">
            ابحثي في المقالات والتأملات
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#D6B17A]"
            aria-hidden="true"
          />
          <input
            id="library-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحثي بعنوان المقال أو بكلمةٍ تلامسُ خاطركِ..."
            className="min-h-[52px] w-full rounded-2xl border border-[#D6B17A]/45 bg-[#35111F]/90 py-3 pr-11 pl-10 text-sm text-[#FFF5ED] placeholder-[#F8E8D5]/60 shadow-inner transition-colors focus:border-[#F0C5D1] focus:outline-none focus:ring-2 focus:ring-[#D6B17A]/35 sm:text-base"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="مسح نص البحث"
              className="absolute top-1/2 left-3 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-[#F8E8D5] hover:bg-white/10 hover:text-[#FFF5ED]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </motion.section>

      {/* Romantic Gateway Banner to "أغانيكِ" inside the Literary World */}
      <section aria-label="ركن أغانيكِ" className="mt-9">
        <Link
          href="/songs"
          className="romantic-velvet group relative flex min-w-0 flex-col items-center justify-between gap-4 overflow-hidden rounded-3xl border border-[#D6B17A]/50 px-5 py-5 transition-all duration-300 hover:border-[#F0C5D1]/80 sm:flex-row sm:px-8"
        >
          <div className="flex min-w-0 flex-col items-center gap-3 text-center sm:flex-row sm:gap-4 sm:text-right">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#D6B17A]/60 bg-[#35111F] text-[#D6B17A] shadow-md">
              <Disc3 className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h2 className="font-literary text-xl text-[#FFF5ED] sm:text-2xl">
                  أغانيكِ — ألحانٌ اختيرتْ لقلبكِ
                </h2>
                <span className="rounded-full border border-[#D6B17A]/45 bg-[#641D35] px-2.5 py-0.5 text-[11px] text-[#F8E8D5]">
                  مجموعة موسيقية خاصة
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[#F8E8D5]/85 sm:text-sm">
                تضمّ <span className="font-english-serif italic">Love Song — Adele</span>، و<span className="font-english-serif italic">Treat You Better — Shawn Mendes</span>، و«ولا صعبة — علي كاكولي»، وإهداء «فاكر — إليسا».
              </p>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#D6B17A]/55 bg-[#641D35] px-4 py-2.5 text-xs font-medium text-[#FFF5ED] transition-transform duration-300 group-hover:-translate-x-1 sm:text-sm">
            <span>ادخلي إلى ركن أغانيكِ</span>
            <ArrowLeft className="h-4 w-4 shrink-0 text-[#D6B17A]" aria-hidden="true" />
          </span>
        </Link>
      </section>

      {/* Categories filter */}
      <section aria-label="تصنيفات المقالات" className="mt-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`min-h-[42px] rounded-xl px-4 py-2 text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:text-sm ${
              selectedCategory === "all"
                ? "border border-[#D6B17A] bg-[#641D35] font-medium text-[#FFF5ED] shadow-md"
                : "border border-[#C98298]/35 bg-[#35111F]/80 text-[#F8E8D5]/85 hover:border-[#D6B17A]/60 hover:text-[#FFF5ED]"
            }`}
          >
            كل التأملات ({allArticles.length})
          </button>

          {articleCategories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`min-h-[42px] rounded-xl px-3.5 py-2 text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:text-sm ${
                  isSelected
                    ? "border border-[#D6B17A] bg-[#641D35] font-medium text-[#FFF5ED] shadow-md"
                    : "border border-[#C98298]/35 bg-[#35111F]/80 text-[#F8E8D5]/85 hover:border-[#D6B17A]/60 hover:text-[#FFF5ED]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {activeCategoryObj && (
          <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-[#F0C5D1] sm:text-sm">
            <BookOpen className="h-3.5 w-3.5 text-[#D6B17A]" aria-hidden="true" />
            <span>{activeCategoryObj.description}</span>
          </div>
        )}
      </section>

      {/* Articles grid or empty state */}
      <section aria-label="قائمة المقالات" className="mt-9">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="romantic-velvet mx-auto max-w-md rounded-3xl border border-[#D6B17A]/40 p-8 text-center">
            <p className="font-literary text-2xl text-[#FFF5ED]">
              لم نجد مقالًا يطابق بحثكِ الحالي
            </p>
            <p className="mt-2 text-sm leading-7 text-[#F8E8D5]/85">
              جرّبي البحث بكلمةٍ أخرى، أو استعرضي جميع التصنيفات الأدبية.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#D6B17A] bg-[#641D35] px-5 py-2 text-sm font-medium text-[#FFF5ED] hover:bg-[#7A2340]"
            >
              إظهار جميع المقالات
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
