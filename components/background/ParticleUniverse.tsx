"use client";

import React, { useEffect, useRef } from "react";

interface RomanticParticle {
  x: number;
  y: number;
  baseRadius: number;
  vx: number;
  vy: number;
  depth: number;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  colorRgb: string;
  kind: "star" | "bokeh" | "petal";
  rotation: number;
  rotationSpeed: number;
  swayPhase: number;
}

const STAR_AND_CANDLE_PALETTE = [
  "255, 245, 237", // Warm ivory (#FFF5ED)
  "248, 232, 213", // Candlelight cream (#F8E8D5)
  "214, 177, 122", // Champagne gold (#D6B17A)
  "240, 197, 209", // Blush pink (#F0C5D1)
  "201, 130, 152", // Dusty rose (#C98298)
];

const PETAL_PALETTE = [
  "201, 130, 152", // Dusty rose (#C98298)
  "240, 197, 209", // Blush pink (#F0C5D1)
  "148, 46, 79",   // Velvet rose-burgundy
];

export function ParticleUniverse() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = reducedMotionQuery.matches;
    let isTabHidden = document.hidden;

    const pointer = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    };

    let scrollOffset = window.scrollY || 0;
    let particles: RomanticParticle[] = [];

    const createParticles = () => {
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const starCount = isMobile ? 34 : isTablet ? 54 : 76;
      const bokehCount = isMobile ? 5 : 9;
      const petalCount = isMobile ? 5 : 9; // Very restrained floating rose petals

      const list: RomanticParticle[] = [];

      // 1. Faint stars and candlelight dust
      for (let i = 0; i < starCount; i++) {
        const depth = 0.25 + ((i * 37) % 75) / 100;
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseRadius: (isMobile ? 0.75 : 0.85) + depth * 1.25,
          vx: (Math.random() - 0.5) * 0.1 * depth,
          vy: -0.04 * depth + (Math.random() - 0.5) * 0.08 * depth,
          depth,
          baseAlpha: 0.2 + depth * 0.48,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.007 + Math.random() * 0.012,
          colorRgb: STAR_AND_CANDLE_PALETTE[i % STAR_AND_CANDLE_PALETTE.length],
          kind: "star",
          rotation: 0,
          rotationSpeed: 0,
          swayPhase: 0,
        });
      }

      // 2. Soft blurred candlelight bokeh orbs
      for (let i = 0; i < bokehCount; i++) {
        const depth = 0.35 + (i % 5) * 0.12;
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseRadius: (isMobile ? 16 : 24) + (i % 4) * 10,
          vx: (Math.random() - 0.5) * 0.06,
          vy: -0.03 - Math.random() * 0.04,
          depth,
          baseAlpha: 0.045 + (i % 3) * 0.018,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.005 + Math.random() * 0.006,
          colorRgb: i % 2 === 0 ? "214, 177, 122" : "201, 130, 152",
          kind: "bokeh",
          rotation: 0,
          rotationSpeed: 0,
          swayPhase: 0,
        });
      }

      // 3. Restrained floating rose petals
      for (let i = 0; i < petalCount; i++) {
        const depth = 0.5 + (i % 4) * 0.14;
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseRadius: (isMobile ? 4.2 : 5.2) + (i % 3) * 1.4,
          vx: (Math.random() - 0.5) * 0.12,
          vy: 0.12 + Math.random() * 0.14,
          depth,
          baseAlpha: 0.18 + (i % 3) * 0.07,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.008,
          colorRgb: PETAL_PALETTE[i % PETAL_PALETTE.length],
          kind: "petal",
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.006,
          swayPhase: Math.random() * Math.PI * 2,
        });
      }

      particles = list;
    };

    const setCanvasSize = () => {
      width = canvas.clientWidth || document.documentElement.clientWidth || window.innerWidth;
      height = canvas.clientHeight || document.documentElement.clientHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const drawRosePetal = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      colorRgb: string,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      // Delicate organic rose petal contour
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(
        size * 0.95,
        -size * 0.75,
        size * 0.85,
        size * 0.65,
        0,
        size
      );
      ctx.bezierCurveTo(
        -size * 0.85,
        size * 0.65,
        -size * 0.95,
        -size * 0.75,
        0,
        -size
      );
      ctx.closePath();

      const grad = ctx.createLinearGradient(-size, -size, size, size);
      grad.addColorStop(0, `rgba(${colorRgb}, ${alpha})`);
      grad.addColorStop(1, `rgba(${colorRgb}, ${alpha * 0.35})`);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const renderFrame = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.035;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.035;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (animate) {
          p.twinklePhase += p.twinkleSpeed;
          if (p.kind === "petal") {
            p.swayPhase += 0.012;
            p.x += p.vx + Math.sin(p.swayPhase) * 0.18;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
          } else {
            p.x += p.vx;
            p.y += p.vy;
          }

          if (p.x < -40) p.x = width + 40;
          if (p.x > width + 40) p.x = -40;
          if (p.y < -40) p.y = height + 40;
          if (p.y > height + 40) p.y = -40;
        }

        const parallaxX = pointer.currentX * 14 * p.depth;
        const parallaxY =
          pointer.currentY * 14 * p.depth - ((scrollOffset * 0.09 * p.depth) % height);

        let drawX = (p.x + parallaxX + width) % width;
        let drawY = (p.y + parallaxY + height) % height;
        if (drawX < 0) drawX += width;
        if (drawY < 0) drawY += height;

        if (p.kind === "bokeh") {
          const pulse = animate ? Math.sin(p.twinklePhase) * 0.015 : 0;
          const alpha = Math.max(0.02, p.baseAlpha + pulse);
          const grad = ctx.createRadialGradient(
            drawX,
            drawY,
            0,
            drawX,
            drawY,
            p.baseRadius
          );
          grad.addColorStop(0, `rgba(${p.colorRgb}, ${alpha})`);
          grad.addColorStop(0.55, `rgba(${p.colorRgb}, ${alpha * 0.45})`);
          grad.addColorStop(1, `rgba(${p.colorRgb}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.baseRadius, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        if (p.kind === "petal") {
          drawRosePetal(
            drawX,
            drawY,
            p.baseRadius,
            p.rotation,
            p.colorRgb,
            p.baseAlpha
          );
          continue;
        }

        // Faint star & candlelight dust particle
        const twinkle = animate ? Math.sin(p.twinklePhase) * 0.2 : 0;
        const alpha = Math.max(0.08, Math.min(0.88, p.baseAlpha + twinkle));

        if (p.depth > 0.65) {
          const glowRadius = p.baseRadius * 4.2;
          const grad = ctx.createRadialGradient(
            drawX,
            drawY,
            0,
            drawX,
            drawY,
            glowRadius
          );
          grad.addColorStop(0, `rgba(${p.colorRgb}, ${alpha * 0.36})`);
          grad.addColorStop(1, `rgba(${p.colorRgb}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(drawX, drawY, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${p.colorRgb}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.baseRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (prefersReducedMotion || isTabHidden) {
        animationFrameId = null;
        return;
      }
      renderFrame(true);
      animationFrameId = window.requestAnimationFrame(loop);
    };

    const startOrStopLoop = () => {
      if (prefersReducedMotion) {
        if (animationFrameId !== null) {
          window.cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        renderFrame(false);
        return;
      }
      if (isTabHidden) {
        if (animationFrameId !== null) {
          window.cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        return;
      }
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(loop);
      }
    };

    setCanvasSize();
    renderFrame(!prefersReducedMotion);
    startOrStopLoop();

    const handleResize = () => {
      setCanvasSize();
      renderFrame(false);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion) return;
      pointer.targetX = (e.clientX / Math.max(width, 1) - 0.5) * 2;
      pointer.targetY = (e.clientY / Math.max(height, 1) - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollOffset = window.scrollY || 0;
      if (prefersReducedMotion) {
        renderFrame(false);
      }
    };

    const handleVisibilityChange = () => {
      isTabHidden = document.hidden;
      startOrStopLoop();
    };

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      startOrStopLoop();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Layered Deep Wine, Romantic Burgundy, and Velvet Plum atmospheric gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 18%, rgba(100, 29, 53, 0.72) 0%, rgba(72, 37, 63, 0.48) 42%, rgba(53, 17, 31, 0.94) 78%, rgba(30, 8, 17, 0.99) 100%)",
        }}
      />

      {/* Soft blush & rose light bloom around central stage */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[8%] mx-auto h-[380px] w-full max-w-[760px] rounded-full opacity-35 blur-3xl sm:h-[480px]"
        style={{
          background:
            "radial-gradient(circle, rgba(240, 197, 209, 0.22) 0%, rgba(201, 130, 152, 0.14) 48%, rgba(100, 29, 53, 0.04) 75%, transparent 100%)",
        }}
      />

      {/* Warm candlelight glow in lower atmospheric field */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-24 mx-auto h-[320px] w-full max-w-[620px] rounded-full opacity-25 blur-3xl sm:h-[380px]"
        style={{
          background:
            "radial-gradient(circle, rgba(214, 177, 122, 0.2) 0%, rgba(248, 232, 213, 0.08) 55%, transparent 100%)",
        }}
      />

      {/* Subtle botanical floral silhouette in top-right and bottom-left corners */}
      <svg
        className="pointer-events-none absolute top-0 right-0 h-48 w-48 text-[#C98298] opacity-[0.065] sm:h-80 sm:w-80"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M200 0C155 25 125 65 110 120C140 100 175 75 200 40Z"
          fill="currentColor"
        />
        <path
          d="M170 0C125 30 95 75 70 140C105 115 145 80 170 0Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="105" cy="95" r="24" stroke="currentColor" strokeWidth="1" />
        <circle cx="105" cy="95" r="12" fill="currentColor" />
      </svg>

      <svg
        className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 text-[#D6B17A] opacity-[0.055] sm:h-80 sm:w-80"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M0 200C45 175 75 135 90 80C60 100 25 125 0 160Z"
          fill="currentColor"
        />
        <path
          d="M30 200C75 170 105 125 130 60C95 85 55 120 30 200Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      {/* Animated stars, candlelight bokeh, and floating rose petals */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}
