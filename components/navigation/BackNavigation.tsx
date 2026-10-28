"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Disc3, Home, Mail, Music } from "lucide-react";
import { useMusicInvitation } from "@/components/music/MusicInvitation";

interface BackNavigationProps {
  backHref: string;
  backLabel: string;
  activeSection: "letters" | "library" | "songs";
}

export function BackNavigation({
  backHref,
  backLabel,
  activeSection,
}: BackNavigationProps) {
  const { openInvitation } = useMusicInvitation();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#D6B17A]/25 bg-[#2A0B18]/85 shadow-[0_8px_30px_rgba(18,4,10,0.55)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3.5">
        {/* Top Row on Mobile / Single Row on Desktop */}
        <div className="flex w-full min-w-0 items-center justify-between gap-2 sm:w-auto sm:flex-1">
          {/* Back button */}
          <Link
            href={backHref}
            className="inline-flex min-h-[40px] min-w-0 shrink items-center gap-2 rounded-xl border border-[#D6B17A]/35 bg-[#35111F]/90 px-3 py-2 text-xs font-medium text-[#FFF5ED] transition-all hover:border-[#F0C5D1]/70 hover:bg-[#4E182C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:min-h-[42px] sm:px-3.5 sm:text-sm"
          >
            <ArrowRight className="h-4 w-4 shrink-0 text-[#D6B17A]" aria-hidden="true" />
            <span className="truncate">{backLabel}</span>
          </Link>

          {/* Compact mobile quick-actions (Home & Song Dedication) */}
          <div className="flex shrink-0 items-center gap-1.5 sm:hidden">
            <Link
              href="/"
              aria-label="المدخل الرئيسي"
              className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-[#C98298]/25 bg-[#35111F]/65 px-2.5 py-2 text-xs text-[#F8E8D5]/90 transition-colors hover:border-[#C98298]/50 hover:text-[#FFF5ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A]"
            >
              <Home className="h-3.5 w-3.5 text-[#D6B17A]" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => openInvitation(false)}
              aria-label="فتح إهداء أغنية فاكر — إليسا"
              className="inline-flex min-h-[40px] items-center justify-center gap-1 rounded-xl border border-[#D6B17A]/40 bg-[#48253F]/80 px-2.5 py-2 text-xs text-[#F8E8D5] transition-colors hover:border-[#D6B17A]/75 hover:bg-[#641D35] hover:text-[#FFF5ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A]"
            >
              <Disc3 className="h-3.5 w-3.5 text-[#D6B17A]" aria-hidden="true" />
              <span className="text-[11px]">فاكر</span>
            </button>
          </div>
        </div>

        {/* Discreet inner-site romantic navigation: 3-column grid on mobile, inline flex on sm+ */}
        <nav
          aria-label="التنقل الداخلي"
          className="grid w-full grid-cols-3 gap-1.5 sm:flex sm:w-auto sm:items-center sm:gap-2"
        >
          <Link
            href="/"
            aria-label="المدخل الرئيسي"
            className="hidden min-h-[42px] items-center gap-1.5 rounded-xl border border-transparent px-2.5 py-2 text-xs text-[#F8E8D5]/85 transition-colors hover:border-[#C98298]/30 hover:bg-[#FFF5ED]/[0.06] hover:text-[#FFF5ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:inline-flex sm:px-3 sm:text-sm"
          >
            <Home className="h-3.5 w-3.5 text-[#D6B17A]" aria-hidden="true" />
            <span className="hidden md:inline">المدخل</span>
          </Link>

          <Link
            href="/letters"
            className={`inline-flex min-h-[38px] min-w-0 items-center justify-center gap-1.5 rounded-xl px-2 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:min-h-[42px] sm:px-3.5 sm:py-2 sm:text-sm ${
              activeSection === "letters"
                ? "border border-[#D6B17A]/55 bg-[#641D35] font-medium text-[#FFF5ED] shadow-sm"
                : "border border-[#C98298]/20 bg-[#35111F]/40 text-[#F8E8D5]/85 hover:border-[#C98298]/30 hover:bg-[#FFF5ED]/[0.06] hover:text-[#FFF5ED] sm:border-transparent sm:bg-transparent"
            }`}
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-[#F0C5D1]" aria-hidden="true" />
            <span className="truncate">رسائلكِ</span>
          </Link>

          <Link
            href="/library"
            className={`inline-flex min-h-[38px] min-w-0 items-center justify-center gap-1.5 rounded-xl px-2 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:min-h-[42px] sm:px-3.5 sm:py-2 sm:text-sm ${
              activeSection === "library"
                ? "border border-[#D6B17A]/55 bg-[#641D35] font-medium text-[#FFF5ED] shadow-sm"
                : "border border-[#C98298]/20 bg-[#35111F]/40 text-[#F8E8D5]/85 hover:border-[#C98298]/30 hover:bg-[#FFF5ED]/[0.06] hover:text-[#FFF5ED] sm:border-transparent sm:bg-transparent"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 shrink-0 text-[#D6B17A]" aria-hidden="true" />
            <span className="truncate">عالمكِ الأدبي</span>
          </Link>

          <Link
            href="/songs"
            className={`inline-flex min-h-[38px] min-w-0 items-center justify-center gap-1.5 rounded-xl px-2 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:min-h-[42px] sm:px-3.5 sm:py-2 sm:text-sm ${
              activeSection === "songs"
                ? "border border-[#D6B17A]/55 bg-[#641D35] font-medium text-[#FFF5ED] shadow-sm"
                : "border border-[#C98298]/20 bg-[#35111F]/40 text-[#F8E8D5]/85 hover:border-[#C98298]/30 hover:bg-[#FFF5ED]/[0.06] hover:text-[#FFF5ED] sm:border-transparent sm:bg-transparent"
            }`}
          >
            <Music className="h-3.5 w-3.5 shrink-0 text-[#F0C5D1]" aria-hidden="true" />
            <span className="truncate">أغانيكِ</span>
          </Link>

          <button
            type="button"
            onClick={() => openInvitation(false)}
            aria-label="فتح إهداء أغنية فاكر — إليسا"
            className="hidden min-h-[42px] items-center gap-1.5 rounded-xl border border-[#D6B17A]/40 bg-[#48253F]/80 px-2.5 py-2 text-xs text-[#F8E8D5] transition-colors hover:border-[#D6B17A]/75 hover:bg-[#641D35] hover:text-[#FFF5ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:inline-flex sm:px-3 sm:text-sm"
          >
            <Disc3 className="h-3.5 w-3.5 text-[#D6B17A]" aria-hidden="true" />
            <span className="hidden lg:inline">فاكر — إليسا</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
