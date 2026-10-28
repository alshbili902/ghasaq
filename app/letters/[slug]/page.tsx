import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { LetterReader } from "@/components/letters/LetterReader";
import {
  getAdjacentLetters,
  getLetterBySlug,
  letters,
} from "@/content/letters";

interface LetterDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return letters.map((letter) => ({
    slug: letter.slug,
  }));
}

export async function generateMetadata({
  params,
}: LetterDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const letter = getLetterBySlug(slug);

  if (!letter) {
    return {
      title: "الرسالة غير موجودة",
    };
  }

  return {
    title: `${letter.title} — رسالة إلى سوسو`,
    description: `${letter.subtitle} — ${letter.highlightedQuote}`,
    openGraph: {
      title: `${letter.title} | إلى سوسو`,
      description: letter.highlightedQuote,
      type: "article",
    },
  };
}

export default async function LetterDetailPage({
  params,
}: LetterDetailPageProps) {
  const { slug } = await params;
  const letter = getLetterBySlug(slug);

  if (!letter) {
    notFound();
  }

  const { previous, next } = getAdjacentLetters(letter.slug);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <BackNavigation
        backHref="/letters"
        backLabel="العودة إلى جميع الرسائل"
        activeSection="letters"
      />
      <main className="flex-1">
        <LetterReader
          letter={letter}
          previousLetter={previous}
          nextLetter={next}
        />
      </main>
    </div>
  );
}
