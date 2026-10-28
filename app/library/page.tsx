import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { LibraryCollectionClient } from "@/components/library/LibraryCollectionClient";
import { articles } from "@/content/articles";

export const metadata: Metadata = {
  title: "إلى عالمكِ الجميل — المكتبة الأدبية والتأملات",
  description:
    "مكتبة أدبية تضم مقالات وتأملات كتبت خصيصًا لسوسو عن الطمأنينة، والرفق بالنفس، والدراسة، وقيمة الإنسان بعيدًا عن الإنجاز.",
};

export default function LibraryPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <BackNavigation
        backHref="/"
        backLabel="العودة إلى المدخل الرئيسي"
        activeSection="library"
      />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm text-[#B5ACBF]">
              جاري تحضير المكتبة الأدبية...
            </div>
          }
        >
          <LibraryCollectionClient allArticles={articles} />
        </Suspense>
      </main>
    </div>
  );
}
