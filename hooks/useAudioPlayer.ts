"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AudioErrorKind =
  | "missing-file"
  | "unsupported-format"
  | "playback-blocked"
  | "network-error"
  | "unknown";

export interface AudioPlayerError {
  kind: AudioErrorKind;
  arabicTitle: string;
  arabicMessage: string;
  expectedFilePath: string;
  publicUrl: string;
}

export interface UseAudioPlayerOptions {
  src: string;
  expectedFilePath: string;
  songTitle?: string;
}

export interface UseAudioPlayerReturn {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  hasStartedOnce: boolean;
  error: AudioPlayerError | null;
  play: () => Promise<boolean>;
  pause: () => void;
  togglePlay: () => Promise<boolean>;
  seek: (timeInSeconds: number) => void;
  stop: () => void;
  clearError: () => void;
}

export function formatAudioTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }
  const totalSeconds = Math.floor(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Module-level reference to prevent duplicate simultaneous audio instances
let activeGlobalAudio: HTMLAudioElement | null = null;

export function useAudioPlayer({
  src,
  expectedFilePath,
  songTitle,
}: UseAudioPlayerOptions): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const [error, setError] = useState<AudioPlayerError | null>(null);

  const buildErrorState = useCallback(
    (kind: AudioErrorKind): AudioPlayerError => {
      const displaySongName = songTitle || "فاكر — إليسا";
      switch (kind) {
        case "missing-file":
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              `[DedicationAudioPlayer] الملف الصوتي غير موجود بعد. يرجى وضع ملف الأغنية المصرح به في المسار: ${expectedFilePath} (يُخدم عبر الرابط: ${src}).`
            );
          }
          return {
            kind: "missing-file",
            arabicTitle: "بانتظار إضافة ملف الأغنية الصوتي",
            arabicMessage: `لم يتم العثور على الملف الصوتي للأغنية بعد. لتفعيل الاستماع المباشر لأغنية «${displaySongName}»، يرجى إضافة ملف MP3 الأصلي في المسار المخصص داخل المشروع، وسيعمل المشغّل تلقائيًّا فور إضافته.`,
            expectedFilePath,
            publicUrl: src,
          };
        case "unsupported-format":
          return {
            kind: "unsupported-format",
            arabicTitle: "صيغة الملف الصوتي غير مدعومة",
            arabicMessage:
              "تعذّر على المتصفح قراءة صيغة الملف الصوتي الحالي. يرجى التأكد من أن الملف بصيغة MP3 قياسية صالحة للتشغيل.",
            expectedFilePath,
            publicUrl: src,
          };
        case "playback-blocked":
          return {
            kind: "playback-blocked",
            arabicTitle: "يتطلّب المتصفح تأكيد التشغيل",
            arabicMessage:
              "أوقف المتصفح التشغيل التلقائي مؤقتًا. اضغطي على زر التشغيل مرة أخرى لبدء الاستماع إلى الأغنية.",
            expectedFilePath,
            publicUrl: src,
          };
        case "network-error":
          return {
            kind: "network-error",
            arabicTitle: "تعذّر تحميل الملف الصوتي",
            arabicMessage:
              "حدث انقطاع أثناء تحميل ملف الأغنية. يرجى المحاولة مرة أخرى بعد لحظات.",
            expectedFilePath,
            publicUrl: src,
          };
        default:
          return {
            kind: "unknown",
            arabicTitle: "تعذّر تشغيل الأغنية في هذه اللحظة",
            arabicMessage:
              "يرجى التأكد من وجود ملف الأغنية الصوتي في المسار المحدد والمحاولة مجددًا.",
            expectedFilePath,
            publicUrl: src,
          };
      }
    },
    [expectedFilePath, songTitle, src]
  );

  const diagnoseFailure = useCallback(
    async (mediaError?: MediaError | null, domException?: unknown) => {
      setIsPlaying(false);
      setIsLoading(false);

      if (
        domException instanceof DOMException &&
        domException.name === "NotAllowedError"
      ) {
        setError(buildErrorState("playback-blocked"));
        return;
      }

      // Check whether the file at `src` actually exists or returns 404
      try {
        const res = await fetch(src, { method: "HEAD", cache: "no-store" });
        if (res.status === 404) {
          setError(buildErrorState("missing-file"));
          return;
        }
        const contentType = res.headers.get("content-type") || "";
        if (
          res.ok &&
          contentType.includes("text/html")
        ) {
          // Next.js 404 fallback HTML returned instead of audio
          setError(buildErrorState("missing-file"));
          return;
        }
      } catch {
        setError(buildErrorState("network-error"));
        return;
      }

      if (mediaError) {
        if (mediaError.code === MediaError.MEDIA_ERR_NETWORK) {
          setError(buildErrorState("network-error"));
          return;
        }
        if (
          mediaError.code === MediaError.MEDIA_ERR_DECODE ||
          mediaError.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED
        ) {
          setError(buildErrorState("unsupported-format"));
          return;
        }
      }

      setError(buildErrorState("missing-file"));
    },
    [buildErrorState, src]
  );

  // Initialize dedicated HTMLAudioElement per player instance while coordinating global exclusive playback
  useEffect(() => {
    const audio = audioRef.current ?? new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handlePlay = () => {
      // Stop any other active audio instance so two songs never play simultaneously
      if (activeGlobalAudio && activeGlobalAudio !== audio) {
        activeGlobalAudio.pause();
        try {
          activeGlobalAudio.currentTime = 0;
        } catch {
          // Ignore if metadata is not yet loaded
        }
      }
      activeGlobalAudio = audio;
      setIsPlaying(true);
      setIsLoading(false);
      setHasStartedOnce(true);
      setError(null);
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setHasStartedOnce(true);
      setError(null);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    const handleError = () => {
      void diagnoseFailure(audio.error, null);
    };

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [diagnoseFailure]);

  const play = useCallback(async (): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return false;

    setError(null);
    setIsLoading(true);

    try {
      // Stop any other active audio instance before starting playback
      if (activeGlobalAudio && activeGlobalAudio !== audio) {
        activeGlobalAudio.pause();
        try {
          activeGlobalAudio.currentTime = 0;
        } catch {
          // Ignore if metadata is not yet loaded
        }
      }
      activeGlobalAudio = audio;

      // Ensure the source is assigned only when initiated by explicit user interaction
      const targetUrl = new URL(src, window.location.origin).href;
      if (audio.src !== targetUrl) {
        audio.src = src;
        audio.load();
      }

      // Immediately invoke audio.play() within the user gesture for iOS Safari compatibility
      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);
      setHasStartedOnce(true);
      return true;
    } catch (err) {
      await diagnoseFailure(audio.error, err);
      return false;
    }
  }, [diagnoseFailure, src]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    try {
      audio.currentTime = 0;
    } catch {
      // Ignore if metadata is not yet loaded
    }
    setIsPlaying(false);
    setIsLoading(false);
    setCurrentTime(0);
  }, []);

  const togglePlay = useCallback(async (): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return false;
    if (!audio.paused && isPlaying) {
      pause();
      return false;
    }
    return play();
  }, [isPlaying, pause, play]);

  const seek = useCallback(
    (timeInSeconds: number) => {
      const audio = audioRef.current;
      if (!audio || !Number.isFinite(duration) || duration <= 0) return;
      const clamped = Math.max(0, Math.min(duration, timeInSeconds));
      try {
        audio.currentTime = clamped;
        setCurrentTime(clamped);
      } catch {
        // Ignore seek errors if stream is not seekable yet
      }
    },
    [duration]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isPlaying,
    isLoading,
    currentTime,
    duration,
    hasStartedOnce,
    error,
    play,
    pause,
    togglePlay,
    seek,
    stop,
    clearError,
  };
}
