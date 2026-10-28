import React from "react";
import Link from "next/link";
import { BookOpen, Home, Mail, Music } from "lucide-react";
import {
  CornerFiligree,
  OrnamentalDivider,
  RoseCrestOrnament,
} from "@/components/ui/RomanticOrnaments";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-5 py-16 text-center">
      <div className="romantic-velvet relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-[#D6B17A]/50 p-8 sm:p-12">
        <CornerFiligree tone="gold" />

        <RoseCrestOrnament />

        <div className="mx-auto mt-2 inline-flex items-center gap-2 rounded-full border border-[#D6B17A]/45 bg-[#35111F]/85 px-4 py-1 text-xs text-[#F8E8D5]">
          <span>صفحة غير موجودة</span>
        </div>

        <h1 className="font-literary mt-5 text-3xl text-[#FFF5ED] sm:text-4xl">
          يبدو أن هذا الممرّ هادئٌ وخالٍ من الصفحات
        </h1>

        <OrnamentalDivider variant="gold" />

        <p className="mt-2 text-sm leading-8 text-[#F8E8D5]/90 sm:text-base">
          الرابط الذي حاولتِ الوصول إليه غير موجود، لكنّ رسائلكِ ومكتبتكِ الأدبية وأغانيكِ ما زالت بانتظاركِ في مكانها الدافئ.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#D6B17A]/65 bg-[#641D35] px-5 py-2.5 text-sm font-medium text-[#FFF5ED] transition-colors hover:bg-[#7A2340]"
          >
            <Home className="h-4 w-4 text-[#D6B17A]" aria-hidden="true" />
            <span>المدخل الرئيسي</span>
          </Link>

          <Link
            href="/letters"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#C98298]/50 bg-[#35111F] px-5 py-2.5 text-sm text-[#FFF5ED] transition-colors hover:border-[#D6B17A]"
          >
            <Mail className="h-4 w-4 text-[#F0C5D1]" aria-hidden="true" />
            <span>افتحي رسالتكِ</span>
          </Link>

          <Link
            href="/library"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#C98298]/50 bg-[#35111F] px-5 py-2.5 text-sm text-[#FFF5ED] transition-colors hover:border-[#D6B17A]"
          >
            <BookOpen className="h-4 w-4 text-[#D6B17A]" aria-hidden="true" />
            <span>إلى عالمكِ الجميل</span>
          </Link>

          <Link
            href="/songs"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#C98298]/50 bg-[#35111F] px-5 py-2.5 text-sm text-[#FFF5ED] transition-colors hover:border-[#D6B17A]"
          >
            <Music className="h-4 w-4 text-[#F0C5D1]" aria-hidden="true" />
            <span>أغانيكِ</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
