"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Feather, Shuffle } from "lucide-react";
import {
  letterCategories,
  LetterCategoryId,
  LetterItem,
} from "@/content/categories";
import { LetterCard } from "./LetterCard";
import {
  OrnamentalDivider,
  RoseCrestOrnament,
} from "@/components/ui/RomanticOrnaments";

interface LettersCollectionClientProps {
  allLetters: readonly LetterItem[];
}

export function LettersCollectionClient({
  allLetters,
}: LettersCollectionClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const initialCategory = (searchParams.get("category") || "all") as
    | LetterCategoryId
    | "all";

  const [selectedCategory, setSelectedCategory] = useState<
    LetterCategoryId | "all"
  >(
    letterCategories.some((c) => c.id === initialCategory)
      ? initialCategory
      : "all"
  );

  useEffect(() => {
    const paramCat = searchParams.get("category") as LetterCategoryId | null;
    if (paramCat && letterCategories.some((c) => c.id === paramCat)) {
      setSelectedCategory(paramCat);
    } else if (!paramCat) {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  const filteredLetters = useMemo(() => {
    if (selectedCategory === "all") return allLetters;
    return allLetters.filter((l) => l.categoryId === selectedCategory);
  }, [allLetters, selectedCategory]);

  const activeCategoryObj = useMemo(
    () => letterCategories.find((c) => c.id === selectedCategory),
    [selectedCategory]
  );

  const handleOpenRandomLetter = () => {
    if (allLetters.length === 0) return;
    const randomIndex = Math.floor(Math.random() * allLetters.length);
    router.push(`/letters/${allLetters[randomIndex].slug}`);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-3.5 py-8 sm:px-6 sm:py-10 md:py-14">
      {/* Romantic Journal Section Header */}
      <motion.section
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <RoseCrestOrnament />

        <div className="mt-2 inline-flex max-w-full items-center gap-2 rounded-full border border-[#D6B17A]/45 bg-[#35111F]/85 px-4 py-1.5 text-xs font-medium text-[#F8E8D5] shadow-sm sm:text-sm">
          <span className="truncate">دفتر الرسائل الخاصة — من دحوم إلى سوسو</span>
        </div>

        <h1 className="font-literary mt-5 text-3xl leading-relaxed font-normal text-[#FFF5ED] sm:text-5xl">
          رسائلُ كُتبتْ لقلبكِ وحدكِ
        </h1>

        <OrnamentalDivider variant="gold" />

        <p className="mt-2 text-sm leading-8 text-[#F8E8D5]/90 sm:text-base sm:leading-9">
          كأنّ كلّ رسالةٍ هنا صفحةٌ من دفترٍ مخمليّ خُتمت بالشّمعِ لأجلكِ. افتحي ما يلامسُ شعوركِ في هذه السّاعة، أو دعي الصّدفةَ تختارُ لكِ مظروفًا.
        </p>

        {/* Random letter button */}
        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={handleOpenRandomLetter}
            className="inline-flex min-h-[50px] max-w-full items-center justify-center gap-2.5 rounded-2xl border border-[#D6B17A]/65 bg-gradient-to-b from-[#7A2340] via-[#641D35] to-[#421223] px-5 py-3.5 text-sm font-medium text-[#FFF5ED] shadow-[0_12px_36px_-10px_rgba(201,130,152,0.45)] transition-all hover:border-[#F0C5D1] hover:from-[#8C2849] hover:to-[#4F162A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:px-7 sm:text-base"
          >
            <Shuffle className="h-4 w-4 shrink-0 text-[#D6B17A]" aria-hidden="true" />
            <span>رسالة عشوائية لهذه اللحظة</span>
          </button>
        </div>
      </motion.section>

      {/* Categories Filter */}
      <section aria-label="تصنيفات الرسائل" className="mt-10">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`min-h-[42px] max-w-full rounded-xl px-3.5 py-2 text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:px-4 sm:text-sm ${
              selectedCategory === "all"
                ? "border border-[#D6B17A] bg-[#641D35] font-medium text-[#FFF5ED] shadow-md"
                : "border border-[#C98298]/35 bg-[#35111F]/80 text-[#F8E8D5]/85 hover:border-[#D6B17A]/60 hover:text-[#FFF5ED]"
            }`}
          >
            جميع الرسائل ({allLetters.length})
          </button>

          {letterCategories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`min-h-[42px] max-w-full rounded-xl px-3 py-2 text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:px-3.5 sm:text-sm ${
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
            <Feather className="h-3.5 w-3.5 shrink-0 text-[#D6B17A]" aria-hidden="true" />
            <span>{activeCategoryObj.description}</span>
          </div>
        )}
      </section>

      {/* Letters Grid */}
      <section aria-label="قائمة الرسائل" className="mt-9">
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2">
          {filteredLetters.map((letter, idx) => (
            <LetterCard key={letter.id} letter={letter} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
