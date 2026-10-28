"use client";

import React from "react";
import Link from "next/link";

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ivory" | "ghost";
  className?: string;
  ariaLabel?: string;
}

interface LinkVariantProps extends BaseButtonProps {
  href: string;
  onClick?: () => void;
  external?: boolean;
}

interface ActionVariantProps extends BaseButtonProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export type AnimatedButtonProps = LinkVariantProps | ActionVariantProps;

export function AnimatedButton(props: AnimatedButtonProps) {
  const {
    children,
    variant = "primary",
    className = "",
    ariaLabel,
  } = props;

  const baseStyles =
    "group relative inline-flex min-h-[52px] items-center justify-center gap-3 rounded-2xl px-7 py-3.5 text-base font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#240914] active:scale-[0.99]";

  const variantStyles: Record<NonNullable<BaseButtonProps["variant"]>, string> = {
    primary:
      "bg-gradient-to-b from-[#7A2340] via-[#641D35] to-[#421223] text-[#FFF5ED] border border-[#D6B17A]/55 shadow-[0_12px_36px_-10px_rgba(201,130,152,0.38),inset_0_1px_0_rgba(255,245,237,0.22)] hover:border-[#F0C5D1]/80 hover:shadow-[0_16px_44px_-8px_rgba(240,197,209,0.42)] hover:from-[#8B294A] hover:to-[#4F162A]",
    secondary:
      "bg-gradient-to-b from-[#48253F]/85 to-[#35111F]/90 text-[#FFF5ED] border border-[#C98298]/45 shadow-[0_10px_32px_-12px_rgba(20,5,11,0.85),inset_0_1px_0_rgba(240,197,209,0.14)] hover:bg-gradient-to-b hover:from-[#572B4C]/90 hover:to-[#421627]/95 hover:border-[#D6B17A]/65 hover:text-white",
    ivory:
      "bg-gradient-to-b from-[#FFF5ED] to-[#F8E8D5] text-[#35111F] border border-[#D6B17A]/70 shadow-[0_10px_30px_-10px_rgba(20,5,11,0.5)] hover:from-[#FFFFFF] hover:to-[#FFF5ED] hover:border-[#641D35]/50",
    ghost:
      "bg-transparent text-[#F8E8D5] border border-transparent hover:text-[#FFF5ED] hover:bg-[#FFF5ED]/[0.06] hover:border-[#C98298]/25",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (typeof props.href === "string") {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={props.onClick}
          aria-label={ariaLabel}
          className={combinedClassName}
        >
          <span className="relative z-10 flex items-center justify-center gap-2.5">
            {children}
          </span>
        </a>
      );
    }

    return (
      <Link
        href={props.href}
        onClick={props.onClick}
        aria-label={ariaLabel}
        className={combinedClassName}
      >
        <span className="relative z-10 flex items-center justify-center gap-2.5">
          {children}
        </span>
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={ariaLabel}
      className={`${combinedClassName} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {children}
      </span>
    </button>
  );
}
