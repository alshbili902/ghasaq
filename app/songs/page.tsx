import React from "react";
import type { Metadata } from "next";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { SongsCollectionClient } from "@/components/music/SongsCollectionClient";
import { romanticSongs } from "@/content/songs";

export const metadata: Metadata = {
  title: "أغانيكِ — ألحانٌ اختيرت لقلبكِ",
  description:
    "مجموعة الأغاني الرومانسية المهداة من دحوم إلى سوسو: Love Song — Adele، Treat You Better — Shawn Mendes، ولا صعبة — علي كاكولي، وفاكر — إليسا.",
};

export default function SongsPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <BackNavigation
        backHref="/library"
        backLabel="العودة إلى عالمكِ الأدبي"
        activeSection="songs"
      />
      <main className="flex-1">
        <SongsCollectionClient songs={romanticSongs} />
      </main>
    </div>
  );
}
