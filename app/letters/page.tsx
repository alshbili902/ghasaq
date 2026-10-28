import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { LettersCollectionClient } from "@/components/letters/LettersCollectionClient";
import { letters } from "@/content/letters";

export const metadata: Metadata = {
  title: "افتحي رسالتكِ — رسائل خاصة إلى سوسو",
  description:
    "مجموعة رسائل شخصية وأدبية كُتبت بكل الحب من دحوم إلى سوسو، لأوقات الدراسة، والقلق، والحاجة إلى الطمأنينة.",
};

export default function LettersPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <BackNavigation
        backHref="/"
        backLabel="العودة إلى المدخل الرئيسي"
        activeSection="letters"
      />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm text-[#B5ACBF]">
              جاري فتح الرسائل...
            </div>
          }
        >
          <LettersCollectionClient allLetters={letters} />
        </Suspense>
      </main>
    </div>
  );
}
