"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BookOpen,
  Disc3,
  Mail,
  Music,
  Pause,
  Play,
  Square,
  Volume2,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { musicConfig } from "@/config/music";
import {
  CornerFiligree,
  OrnamentalDivider,
  WaxSealBadge,
} from "@/components/ui/RomanticOrnaments";
import {
  formatAudioTime,
  useAudioPlayer,
} from "@/hooks/useAudioPlayer";
import { DedicationAudioPlayer } from "./DedicationAudioPlayer";

interface MusicInvitationContextValue {
  openInvitation: (startInPlayerMode?: boolean) => void;
  closeInvitation: () => void;
  isOpen: boolean;
  isPlaying: boolean;
}

const MusicInvitationContext = createContext<MusicInvitationContextValue>({
  openInvitation: () => {},
  closeInvitation: () => {},
  isOpen: false,
  isPlaying: false,
});

export function useMusicInvitation() {
  return useContext(MusicInvitationContext);
}

export function MusicInvitationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"invite" | "player">("invite");

  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const titleId = useId();
  const descId = useId();
  const primaryButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const audioPlayer = useAudioPlayer({
    src: musicConfig.song.localAudio.src,
    expectedFilePath: musicConfig.song.localAudio.expectedFilePath,
  });

  // Check sessionStorage on first client mount
  useEffect(() => {
    try {
      const handled = window.sessionStorage.getItem(musicConfig.storageKey);
      if (!handled) {
        setIsOpen(true);
        setMode("invite");
      }
    } catch {
      setIsOpen(true);
      setMode("invite");
    }
  }, []);

  const markSessionHandled = useCallback((status: "accepted" | "later") => {
    try {
      window.sessionStorage.setItem(musicConfig.storageKey, status);
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, []);

  const handleListenTogether = useCallback(async () => {
    setMode("player");
    // Initiate native HTML5 audio playback directly inside the user click gesture
    const started = await audioPlayer.play();
    if (started) {
      markSessionHandled("accepted");
    } else {
      // Mark session handled so the user isn't trapped on route changes even if the MP3 file is missing
      markSessionHandled("accepted");
    }
  }, [audioPlayer, markSessionHandled]);

  const handleListenLater = useCallback(() => {
    audioPlayer.stop();
    markSessionHandled("later");
    setIsOpen(false);
  }, [audioPlayer, markSessionHandled]);

  const handleStopAndClose = useCallback(() => {
    audioPlayer.stop();
    markSessionHandled("later");
    setIsOpen(false);
  }, [audioPlayer, markSessionHandled]);

  const handleContinueWhileListening = useCallback(() => {
    markSessionHandled("accepted");
    setIsOpen(false);
  }, [markSessionHandled]);

  const openInvitation = useCallback(
    (startInPlayerMode = false) => {
      audioPlayer.clearError();
      setMode(
        startInPlayerMode || audioPlayer.isPlaying || audioPlayer.currentTime > 0
          ? "player"
          : "invite"
      );
      setIsOpen(true);
    },
    [audioPlayer]
  );

  const closeInvitation = useCallback(() => {
    markSessionHandled("later");
    setIsOpen(false);
  }, [markSessionHandled]);

  // Focus management and Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = window.setTimeout(() => {
      primaryButtonRef.current?.focus();
    }, 60);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (audioPlayer.isPlaying) {
          handleContinueWhileListening();
        } else {
          handleListenLater();
        }
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    audioPlayer.isPlaying,
    handleContinueWhileListening,
    handleListenLater,
    isOpen,
  ]);

  // Discreet persistent mini-player bar on inner pages (never on `/` homepage so homepage strictly has only 2 buttons)
  const showInnerPageMiniPlayer =
    !isOpen &&
    pathname !== "/" &&
    (audioPlayer.isPlaying || audioPlayer.currentTime > 0);

  return (
    <MusicInvitationContext.Provider
      value={{
        openInvitation,
        closeInvitation,
        isOpen,
        isPlaying: audioPlayer.isPlaying,
      }}
    >
      {children}

      {/* Persistent audio bar on inner routes (/letters, /library, /songs) while music is active */}
      <AnimatePresence>
        {showInnerPageMiniPlayer && (
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.35 }}
            aria-label="مشغّل أغنية الإهداء المصغّر"
            className="fixed bottom-4 left-4 z-40 flex items-center gap-3 rounded-2xl border border-[#D6B17A]/60 bg-[#35111F]/95 px-4 py-2.5 text-[#FFF5ED] shadow-[0_16px_40px_rgba(12,3,7,0.85)] backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => void audioPlayer.togglePlay()}
              aria-label={
                audioPlayer.isPlaying ? "إيقاف مؤقت للأغنية" : "مواصلة تشغيل الأغنية"
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#D6B17A]/55 bg-[#641D35] text-[#FFF5ED] transition-colors hover:bg-[#7A2340]"
            >
              {audioPlayer.isPlaying ? (
                <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => openInvitation(true)}
              className="text-right focus-visible:outline-none focus-visible:underline"
            >
              <span className="font-literary block text-sm font-bold text-[#FFF5ED]">
                {musicConfig.invitationCopy.songTitleAndArtist}
              </span>
              <span dir="ltr" className="block font-mono text-[11px] text-[#D6B17A]">
                {formatAudioTime(audioPlayer.currentTime)} /{" "}
                {audioPlayer.duration > 0
                  ? formatAudioTime(audioPlayer.duration)
                  : "--:--"}
              </span>
            </button>

            <button
              type="button"
              onClick={audioPlayer.stop}
              aria-label="إيقاف الأغنية تمامًا"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#C98298]/40 bg-[#240914]/80 text-[#F8E8D5] transition-colors hover:border-[#D6B17A] hover:text-[#FFF5ED]"
            >
              <Square className="h-3 w-3 fill-current" aria-hidden="true" />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* First-Visit Romantic Song Dedication Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="music-invitation-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.1 : 0.6,
              ease: "easeOut",
            }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-6"
            style={{
              background:
                "radial-gradient(circle at 50% 25%, rgba(100, 29, 53, 0.92) 0%, rgba(53, 17, 31, 0.96) 55%, rgba(28, 7, 15, 0.99) 100%)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Soft candlelight and rose bokeh glow behind the invitation envelope */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-96 w-96 rounded-full opacity-45 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(248, 232, 213, 0.35) 0%, rgba(201, 130, 152, 0.22) 55%, transparent 100%)",
              }}
            />

            {/* Outer Burgundy Velvet Envelope Sleeve */}
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descId}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.95, y: 18 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, y: 12 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.1 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative my-auto w-full max-w-xl rounded-[2rem] border border-[#D6B17A]/50 bg-gradient-to-b from-[#54172C] to-[#2F0D1B] p-2.5 shadow-[0_30px_90px_-15px_rgba(12,3,7,0.9)] sm:p-4"
            >
              {/* Warm Ivory & Blush-Tinted Handwritten Invitation Card Inside Envelope */}
              <div className="romantic-parchment relative overflow-hidden rounded-[1.6rem] border border-[#D6B17A]/70 px-5 py-7 text-center sm:px-10 sm:py-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2.5 rounded-[1.25rem] border border-[#C98298]/35"
                />

                <CornerFiligree tone="burgundy" />

                {mode === "invite" ? (
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Wax seal at the top of the letter card */}
                    <WaxSealBadge size="md" className="mb-3" />

                    {/* Eyebrow */}
                    <span className="inline-block rounded-full border border-[#C98298]/50 bg-[#F0C5D1]/35 px-4 py-1 text-xs font-medium tracking-wide text-[#641D35] sm:text-sm">
                      {musicConfig.invitationCopy.introLine}
                    </span>

                    {/* Heading */}
                    <h2
                      id={titleId}
                      className="font-literary mt-4 text-2xl leading-relaxed font-bold text-[#35111F] sm:text-3xl"
                    >
                      {musicConfig.invitationCopy.heading}
                    </h2>

                    <OrnamentalDivider variant="dark" className="my-3" />

                    {/* Supporting text */}
                    <p
                      id={descId}
                      className="max-w-md text-sm leading-8 text-[#48253F] sm:text-base sm:leading-8"
                    >
                      {musicConfig.invitationCopy.supportingMessage}
                    </p>

                    {/* Song title and artist card */}
                    <div className="mt-6 flex items-center gap-3.5 rounded-2xl border border-[#D6B17A]/75 bg-gradient-to-r from-[#35111F] via-[#54172C] to-[#35111F] px-6 py-3.5 text-[#FFF5ED] shadow-[0_10px_28px_-8px_rgba(53,17,31,0.5)]">
                      <Disc3
                        className="h-5 w-5 text-[#D6B17A]"
                        aria-hidden="true"
                      />
                      <span className="font-literary text-lg tracking-wide text-[#FFF5ED] sm:text-xl">
                        {musicConfig.invitationCopy.songTitleAndArtist}
                      </span>
                    </div>

                    {/* Primary and secondary actions */}
                    <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                      <button
                        ref={primaryButtonRef}
                        type="button"
                        onClick={() => void handleListenTogether()}
                        className="inline-flex min-h-[50px] flex-1 items-center justify-center gap-2.5 rounded-2xl border border-[#D6B17A]/60 bg-gradient-to-b from-[#78223F] to-[#4A1326] px-6 py-3.5 text-base font-medium text-[#FFF5ED] shadow-[0_10px_25px_-6px_rgba(100,29,53,0.55)] transition-all duration-300 hover:from-[#8A2749] hover:to-[#59172E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#641D35]"
                      >
                        <Volume2
                          className="h-4 w-4 text-[#F8E8D5]"
                          aria-hidden="true"
                        />
                        <span>{musicConfig.invitationCopy.primaryAction}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleListenLater}
                        className="inline-flex min-h-[50px] flex-1 items-center justify-center rounded-2xl border border-[#C98298]/60 bg-[#FFF5ED]/80 px-6 py-3.5 text-base font-medium text-[#641D35] transition-all duration-300 hover:border-[#641D35] hover:bg-[#FFF5ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#641D35]"
                      >
                        <span>
                          {musicConfig.invitationCopy.secondaryAction}
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center text-right">
                    {/* Top bar in player view */}
                    <div className="flex w-full items-center justify-between border-b border-[#C98298]/40 pb-3.5">
                      <div className="flex items-center gap-2.5">
                        <WaxSealBadge size="sm" />
                        <div>
                          <h2
                            id={titleId}
                            className="font-literary text-lg font-bold text-[#35111F] sm:text-xl"
                          >
                            {musicConfig.invitationCopy.songTitleAndArtist}
                          </h2>
                          <p id={descId} className="text-xs text-[#641D35]">
                            {musicConfig.invitationCopy.introLine}
                          </p>
                        </div>
                      </div>

                      <button
                        ref={primaryButtonRef}
                        type="button"
                        onClick={handleStopAndClose}
                        aria-label="إيقاف الأغنية وإغلاق النافذة"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#C98298]/50 bg-[#FFF5ED] text-[#641D35] transition-colors hover:border-[#641D35] hover:bg-[#F0C5D1]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#641D35]"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Native HTML5 Local Audio Player Component */}
                    <DedicationAudioPlayer
                      songTitleAndArtist={
                        musicConfig.invitationCopy.songTitleAndArtist
                      }
                      isPlaying={audioPlayer.isPlaying}
                      isLoading={audioPlayer.isLoading}
                      currentTime={audioPlayer.currentTime}
                      duration={audioPlayer.duration}
                      error={audioPlayer.error}
                      onTogglePlay={() => void audioPlayer.togglePlay()}
                      onSeek={audioPlayer.seek}
                      onStop={audioPlayer.stop}
                      onRetry={() => void audioPlayer.play()}
                      shouldReduceMotion={Boolean(shouldReduceMotion)}
                    />

                    {/* Navigation actions from inside the dialog */}
                    <div className="mt-6 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-3">
                      <Link
                        href="/letters"
                        onClick={handleContinueWhileListening}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#D6B17A]/60 bg-[#641D35] px-4 py-2 text-sm font-medium text-[#FFF5ED] transition-colors hover:bg-[#7A2340]"
                      >
                        <Mail
                          className="h-4 w-4 text-[#F8E8D5]"
                          aria-hidden="true"
                        />
                        <span>افتحي رسالتكِ</span>
                      </Link>

                      <Link
                        href="/library"
                        onClick={handleContinueWhileListening}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#C98298]/60 bg-[#48253F] px-4 py-2 text-sm font-medium text-[#FFF5ED] transition-colors hover:bg-[#5B2E4F]"
                      >
                        <BookOpen
                          className="h-4 w-4 text-[#D6B17A]"
                          aria-hidden="true"
                        />
                        <span>إلى عالمكِ الجميل</span>
                      </Link>

                      <Link
                        href="/songs"
                        onClick={handleContinueWhileListening}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#C98298]/60 bg-[#FFF5ED] px-4 py-2 text-sm font-medium text-[#35111F] transition-colors hover:bg-[#F0C5D1]/30"
                      >
                        <Music
                          className="h-4 w-4 text-[#641D35]"
                          aria-hidden="true"
                        />
                        <span>ركن أغانيكِ</span>
                      </Link>
                    </div>

                    {/* Dismiss / Stop options */}
                    <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-2 border-t border-[#C98298]/35 pt-3.5 text-xs">
                      <button
                        type="button"
                        onClick={handleContinueWhileListening}
                        className="font-medium text-[#641D35] underline-offset-4 hover:underline"
                      >
                        متابعة تصفّح الموقع
                      </button>

                      <button
                        type="button"
                        onClick={handleStopAndClose}
                        className="text-[#48253F] underline-offset-4 hover:text-[#35111F] hover:underline"
                      >
                        إيقاف الأغنية وإغلاق النافذة
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MusicInvitationContext.Provider>
  );
}
