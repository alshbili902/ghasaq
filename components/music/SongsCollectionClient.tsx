"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Disc3,
  Music,
  Pause,
  Play,
  Sparkles,
  Square,
} from "lucide-react";
import { RomanticSongItem } from "@/content/songs";
import {
  CornerFiligree,
  OrnamentalDivider,
  RoseCrestOrnament,
  WaxSealBadge,
} from "@/components/ui/RomanticOrnaments";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { DedicationAudioPlayer } from "./DedicationAudioPlayer";

interface SongsCollectionClientProps {
  songs: readonly RomanticSongItem[];
}

interface SongCollectionCardProps {
  song: RomanticSongItem;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  shouldReduceMotion: boolean;
}

function SongCollectionCard({
  song,
  index,
  isActive,
  onActivate,
  onDeactivate,
  shouldReduceMotion,
}: SongCollectionCardProps) {
  const [hasImageError, setHasImageError] = useState(false);

  const audioPlayer = useAudioPlayer({
    src: song.localAudio.src,
    expectedFilePath: song.localAudio.expectedFilePath,
    songTitle: song.displayTitleAndArtist,
  });

  // Stop this card's player whenever another song card becomes active
  useEffect(() => {
    if (!isActive && (audioPlayer.isPlaying || audioPlayer.currentTime > 0)) {
      audioPlayer.stop();
    }
  }, [audioPlayer, isActive]);

  const handleStartListening = async () => {
    onActivate();
    await audioPlayer.play();
  };

  const handleTogglePlay = async () => {
    if (!isActive) {
      onActivate();
    }
    await audioPlayer.togglePlay();
  };

  const handleStopAndClose = () => {
    audioPlayer.stop();
    audioPlayer.clearError();
    onDeactivate();
  };

  const showPlayerPanel =
    isActive ||
    audioPlayer.isPlaying ||
    audioPlayer.currentTime > 0 ||
    Boolean(audioPlayer.error);

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="romantic-velvet group relative min-w-0 overflow-hidden rounded-[2rem] border border-[#D6B17A]/45 p-5 transition-all duration-300 hover:border-[#F0C5D1]/75 sm:p-8 md:p-10"
    >
      <CornerFiligree tone="gold" />

      <div className="relative z-10 flex min-w-0 flex-col gap-6 lg:flex-row lg:items-center lg:gap-7">
        {/* Artwork Presentation with Vinyl Sleeve & Elegant Fallback */}
        <div className="relative mx-auto w-full max-w-[260px] shrink-0 sm:max-w-[280px] lg:mx-0 lg:w-64">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-[#D6B17A]/65 bg-[#240914] shadow-[0_18px_45px_-10px_rgba(12,3,7,0.85)]">
            {!hasImageError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={song.artworkUrl}
                alt={`غلاف أغنية ${song.displayTitleAndArtist}`}
                loading="lazy"
                onError={() => setHasImageError(true)}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              /* Elegant romantic vinyl fallback if external thumbnail fails */
              <div
                className="flex h-full w-full flex-col items-center justify-center p-6 text-center"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, #641D35 0%, #35111F 60%, #1E0710 100%)",
                }}
              >
                <Disc3
                  className="h-16 w-16 text-[#D6B17A]"
                  aria-hidden="true"
                />
                <span
                  className={`mt-3 text-base text-[#FFF5ED] ${
                    song.isEnglishTitle
                      ? "font-english-serif italic"
                      : "font-literary"
                  }`}
                >
                  {song.displayTitleAndArtist}
                </span>
              </div>
            )}

            {/* Subtle warm rose & vignette overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#240914]/80 via-transparent to-[#35111F]/25"
            />

            {/* Mood badge on artwork */}
            <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2">
              <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-[#D6B17A]/55 bg-[#35111F]/90 px-3 py-1 text-xs font-medium text-[#FFF5ED] backdrop-blur-sm">
                <Sparkles
                  className="h-3 w-3 shrink-0 text-[#D6B17A]"
                  aria-hidden="true"
                />
                <span className="truncate">{song.moodBadge}</span>
              </span>

              <WaxSealBadge size="sm" className="shrink-0" />
            </div>
          </div>
        </div>

        {/* Song Details & Handwritten Dedication Card */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#D6B17A]">
                {song.releaseNote}
              </span>
              <span className="text-xs text-[#F0C5D1]/85">
                {song.poeticSubtitle}
              </span>
            </div>

            {/* Song Title & Artist */}
            <h2
              dir={song.isEnglishTitle ? "ltr" : "rtl"}
              className={`mt-2 break-words text-2xl font-normal text-[#FFF5ED] sm:text-3xl ${
                song.isEnglishTitle
                  ? "font-english-serif text-right italic tracking-wide sm:text-4xl"
                  : "font-literary"
              }`}
            >
              {song.displayTitleAndArtist}
            </h2>

            {/* Warm Ivory Parchment Caption Box */}
            <div className="romantic-parchment mt-4 rounded-2xl border border-[#D6B17A]/65 p-4 sm:mt-5 sm:p-6">
              <p className="font-literary text-base leading-[2.05] text-[#35111F] sm:text-lg sm:leading-[2.15]">
                «{song.arabicCaption}»
              </p>
            </div>
          </div>

          {/* Local Audio Listening Controls */}
          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
            {!showPlayerPanel ? (
              <button
                type="button"
                onClick={() => void handleStartListening()}
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl border border-[#D6B17A]/65 bg-gradient-to-b from-[#7A2340] via-[#641D35] to-[#421223] px-6 py-3 text-sm font-medium text-[#FFF5ED] shadow-[0_10px_28px_-8px_rgba(201,130,152,0.45)] transition-all hover:border-[#F0C5D1] hover:from-[#8C2849] hover:to-[#4F162A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A]"
              >
                <Play
                  className="h-4 w-4 shrink-0 fill-current text-[#F8E8D5]"
                  aria-hidden="true"
                />
                <span>استمعي إليها هنا</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => void handleTogglePlay()}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl border border-[#D6B17A]/65 bg-gradient-to-b from-[#7A2340] via-[#641D35] to-[#421223] px-5 py-3 text-sm font-medium text-[#FFF5ED] shadow-[0_10px_28px_-8px_rgba(201,130,152,0.45)] transition-all hover:border-[#F0C5D1] hover:from-[#8C2849] hover:to-[#4F162A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A]"
                >
                  {audioPlayer.isPlaying ? (
                    <>
                      <Pause
                        className="h-4 w-4 shrink-0 fill-current text-[#F8E8D5]"
                        aria-hidden="true"
                      />
                      <span>إيقاف مؤقت</span>
                    </>
                  ) : (
                    <>
                      <Play
                        className="h-4 w-4 shrink-0 fill-current text-[#F8E8D5]"
                        aria-hidden="true"
                      />
                      <span>
                        {audioPlayer.currentTime > 0
                          ? "مواصلة الاستماع"
                          : "تشغيل الأغنية"}
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleStopAndClose}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#C98298]/60 bg-[#35111F] px-4 py-3 text-sm font-medium text-[#F8E8D5] transition-colors hover:border-[#D6B17A] hover:text-[#FFF5ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A]"
                >
                  <Square
                    className="h-3.5 w-3.5 shrink-0 fill-current text-[#D6B17A]"
                    aria-hidden="true"
                  />
                  <span>إيقاف وإغلاق المشغّل</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Native HTML5 Local Audio Player Stage (mounted when user activates playback) */}
      {showPlayerPanel && (
        <div className="relative z-10 mt-6 border-t border-[#D6B17A]/30 pt-4">
          <DedicationAudioPlayer
            songTitleAndArtist={song.displayTitleAndArtist}
            isPlaying={audioPlayer.isPlaying}
            isLoading={audioPlayer.isLoading}
            currentTime={audioPlayer.currentTime}
            duration={audioPlayer.duration}
            error={audioPlayer.error}
            onTogglePlay={() => void handleTogglePlay()}
            onSeek={audioPlayer.seek}
            onStop={audioPlayer.stop}
            onRetry={() => void handleStartListening()}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>
      )}
    </motion.article>
  );
}

export function SongsCollectionClient({ songs }: SongsCollectionClientProps) {
  const [activeSongId, setActiveSongId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-5xl px-3.5 py-8 sm:px-6 sm:py-10 md:py-14">
      {/* Section Header */}
      <motion.section
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <RoseCrestOrnament />

        <div className="mt-2 inline-flex max-w-full items-center gap-2 rounded-full border border-[#D6B17A]/45 bg-[#35111F]/85 px-4 py-1.5 text-xs font-medium text-[#F8E8D5] shadow-sm sm:text-sm">
          <Music className="h-3.5 w-3.5 shrink-0 text-[#D6B17A]" aria-hidden="true" />
          <span className="truncate">مختاراتٌ موسيقية مهداة من دحوم إلى سوسو</span>
        </div>

        <h1 className="font-literary mt-5 text-3xl leading-relaxed font-normal text-[#FFF5ED] sm:text-5xl">
          أغانيكِ — ألحانٌ تشبهُ رقّةَ قلبكِ
        </h1>

        <OrnamentalDivider variant="gold" />

        <p className="mt-2 text-sm leading-8 text-[#F8E8D5]/90 sm:text-base sm:leading-9">
          لكلّ أغنيةٍ في هذا الرّكنِ حكايةٌ صغيرةٌ وسببٌ جعلني أختارها لكِ. لا يبدأُ تشغيلُ أيّ لحنٍ هنا إلّا حين تختارينَ أنتِ الاستماعَ إليهِ في وقتكِ الهادئ.
        </p>
      </motion.section>

      {/* Romantic Songs Grid */}
      <section aria-label="قائمة أغانيكِ" className="mt-10 space-y-8">
        {songs.map((song, idx) => (
          <SongCollectionCard
            key={song.id}
            song={song}
            index={idx}
            isActive={activeSongId === song.id}
            onActivate={() => setActiveSongId(song.id)}
            onDeactivate={() =>
              setActiveSongId((prev) => (prev === song.id ? null : prev))
            }
            shouldReduceMotion={Boolean(shouldReduceMotion)}
          />
        ))}
      </section>
    </div>
  );
}
