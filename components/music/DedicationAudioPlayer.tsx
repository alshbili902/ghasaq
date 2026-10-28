"use client";

import React from "react";
import {
  AlertCircle,
  Disc3,
  Loader2,
  Pause,
  Play,
  RotateCcw,
  Square,
  Volume2,
} from "lucide-react";
import {
  AudioPlayerError,
  formatAudioTime,
} from "@/hooks/useAudioPlayer";

interface DedicationAudioPlayerProps {
  songTitleAndArtist: string;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  error: AudioPlayerError | null;
  onTogglePlay: () => void;
  onSeek: (timeSeconds: number) => void;
  onStop: () => void;
  onRetry: () => void;
  shouldReduceMotion?: boolean;
}

export function DedicationAudioPlayer({
  songTitleAndArtist,
  isPlaying,
  isLoading,
  currentTime,
  duration,
  error,
  onTogglePlay,
  onSeek,
  onStop,
  onRetry,
  shouldReduceMotion = false,
}: DedicationAudioPlayerProps) {
  const progressPercent =
    duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  if (error) {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="mt-5 w-full rounded-2xl border border-[#C98298]/70 bg-gradient-to-b from-[#35111F] to-[#240914] p-5 text-right text-[#FFF5ED] shadow-[0_16px_40px_-12px_rgba(36,9,20,0.75)] sm:p-6"
      >
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D6B17A]/50 bg-[#641D35] text-[#F8E8D5]">
            <AlertCircle className="h-5 w-5 text-[#D6B17A]" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="font-literary text-lg font-bold text-[#FFF5ED] sm:text-xl">
              {error.arabicTitle}
            </h3>
            <p className="mt-1.5 text-xs leading-7 text-[#F8E8D5]/90 sm:text-sm">
              {error.arabicMessage}
            </p>

            {/* Development & setup guidance identifying the exact expected file path */}
            <div className="mt-4 rounded-xl border border-[#D6B17A]/40 bg-[#1B060E]/90 p-3.5 text-xs text-[#F8E8D5]">
              <p className="font-medium text-[#D6B17A]">
                المسار المطلوب لملف الأغنية داخل المشروع:
              </p>
              <code
                dir="ltr"
                className="mt-1.5 block rounded-lg bg-[#2B0B17] px-3 py-2 font-mono text-xs text-[#F0C5D1] select-all"
              >
                {error.expectedFilePath}
              </code>
              <p className="mt-1.5 text-[11px] text-[#F8E8D5]/75">
                الرابط العام المتوقع في المتصفح:{" "}
                <code dir="ltr" className="text-[#D6B17A]">
                  {error.publicUrl}
                </code>
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[#D6B17A]/65 bg-[#641D35] px-4 py-2 text-xs font-medium text-[#FFF5ED] transition-colors hover:bg-[#7A2340] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] sm:text-sm"
              >
                <RotateCcw className="h-3.5 w-3.5 text-[#D6B17A]" aria-hidden="true" />
                <span>إعادة المحاولة بعد إضافة الملف</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 w-full rounded-2xl border border-[#D6B17A]/70 bg-gradient-to-b from-[#35111F] via-[#48182B] to-[#280B17] p-5 text-[#FFF5ED] shadow-[0_18px_45px_-12px_rgba(36,9,20,0.8)] sm:p-6">
      {/* Top status row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D6B17A]/60 bg-[#641D35] shadow-inner">
            <Disc3
              className={`h-5 w-5 text-[#D6B17A] ${
                isPlaying && !shouldReduceMotion ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "8s" }}
              aria-hidden="true"
            />
          </div>

          <div className="text-right">
            <p className="font-literary text-lg font-bold text-[#FFF5ED] sm:text-xl">
              {songTitleAndArtist}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-[#F0C5D1]">
              {isLoading ? (
                <>
                  <Loader2
                    className="h-3.5 w-3.5 animate-spin text-[#D6B17A]"
                    aria-hidden="true"
                  />
                  <span>جاري تحضير اللحن الصوتي...</span>
                </>
              ) : isPlaying ? (
                <>
                  <Volume2
                    className="h-3.5 w-3.5 text-[#D6B17A]"
                    aria-hidden="true"
                  />
                  <span>يُعزف الآن لقلبكِ</span>
                </>
              ) : (
                <span>متوقّف مؤقّتًا — جاهز للاستماع</span>
              )}
            </p>
          </div>
        </div>

        {/* Genuine animated sound-wave indicator (only animates when truly playing) */}
        <div
          aria-hidden="true"
          className="flex h-6 items-center gap-1 px-2"
        >
          {[0.5, 0.95, 0.65, 1, 0.75, 0.55].map((scale, idx) => (
            <span
              key={idx}
              className="w-1 rounded-full bg-gradient-to-t from-[#C98298] to-[#D6B17A] transition-all duration-300"
              style={{
                height: isPlaying ? `${Math.round(scale * 20)}px` : "5px",
                animation:
                  isPlaying && !shouldReduceMotion
                    ? `soundWavePulse ${1.1 + idx * 0.15}s ease-in-out infinite alternate`
                    : "none",
                opacity: isPlaying ? 0.95 : 0.4,
              }}
            />
          ))}
        </div>
      </div>

      {/* Seek Slider and Real Duration / Current Time */}
      <div className="mt-5">
        <div className="relative flex items-center">
          <label htmlFor="dedication-audio-seek" className="sr-only">
            شريط التقدم في الأغنية
          </label>
          <input
            id="dedication-audio-seek"
            type="range"
            dir="ltr"
            min={0}
            max={duration > 0 ? duration : 100}
            step={0.5}
            value={duration > 0 ? currentTime : 0}
            disabled={duration <= 0}
            onChange={(e) => onSeek(Number(e.target.value))}
            aria-valuetext={`${formatAudioTime(currentTime)} من ${formatAudioTime(
              duration
            )}`}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#240914] accent-[#D6B17A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: `linear-gradient(to right, #D6B17A 0%, #C98298 ${progressPercent}%, #240914 ${progressPercent}%, #240914 100%)`,
            }}
          />
        </div>

        <div
          dir="ltr"
          className="mt-2 flex items-center justify-between font-mono text-xs text-[#F8E8D5]/85"
        >
          <span>{formatAudioTime(currentTime)}</span>
          <span>{duration > 0 ? formatAudioTime(duration) : "--:--"}</span>
        </div>
      </div>

      {/* Play / Pause and Stop Controls */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onTogglePlay}
          disabled={isLoading}
          aria-label={isPlaying ? "إيقاف مؤقت للأغنية" : "تشغيل الأغنية"}
          className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#D6B17A]/70 bg-gradient-to-b from-[#7A2340] to-[#4A1326] px-5 py-2.5 text-sm font-medium text-[#FFF5ED] shadow-md transition-all hover:border-[#F0C5D1] hover:from-[#8C2849] hover:to-[#59172E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] disabled:opacity-60"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4 fill-current text-[#F8E8D5]" aria-hidden="true" />
              <span>إيقاف مؤقت</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current text-[#F8E8D5]" aria-hidden="true" />
              <span>{currentTime > 0 ? "مواصلة الاستماع" : "تشغيل الأغنية"}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onStop}
          disabled={!isPlaying && currentTime === 0}
          aria-label="إيقاف الأغنية وإعادتها إلى البداية"
          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#C98298]/50 bg-[#240914]/85 px-4 py-2.5 text-sm font-medium text-[#F8E8D5] transition-colors hover:border-[#D6B17A] hover:text-[#FFF5ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Square className="h-3.5 w-3.5 fill-current text-[#C98298]" aria-hidden="true" />
          <span>إيقاف</span>
        </button>
      </div>
    </div>
  );
}
