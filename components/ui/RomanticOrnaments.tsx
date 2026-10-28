import React from "react";

export function RoseCrestOrnament({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
    >
      <svg
        width="128"
        height="54"
        viewBox="0 0 128 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="roseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F0C5D1" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#C98298" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#641D35" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="champagneGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8E8D5" />
            <stop offset="50%" stopColor="#D6B17A" />
            <stop offset="100%" stopColor="#C98298" />
          </linearGradient>
        </defs>

        {/* Soft ambient illumination behind crest */}
        <circle cx="64" cy="27" r="26" fill="url(#roseGlow)" />

        {/* Left delicate botanical stem and leaves */}
        <path
          d="M12 28C26 28 36 22 48 27"
          stroke="url(#champagneGold)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M28 26C25 21 19 20 16 24C20 27 25 27 28 26Z"
          fill="#D6B17A"
          fillOpacity="0.35"
          stroke="url(#champagneGold)"
          strokeWidth="0.8"
        />
        <path
          d="M38 25C36 20 31 18 28 21C31 24 35 25 38 25Z"
          fill="#F0C5D1"
          fillOpacity="0.3"
          stroke="url(#champagneGold)"
          strokeWidth="0.8"
        />

        {/* Right delicate botanical stem and leaves */}
        <path
          d="M116 28C102 28 92 22 80 27"
          stroke="url(#champagneGold)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M100 26C103 21 109 20 112 24C108 27 103 27 100 26Z"
          fill="#D6B17A"
          fillOpacity="0.35"
          stroke="url(#champagneGold)"
          strokeWidth="0.8"
        />
        <path
          d="M90 25C92 20 97 18 100 21C97 24 93 25 90 25Z"
          fill="#F0C5D1"
          fillOpacity="0.3"
          stroke="url(#champagneGold)"
          strokeWidth="0.8"
        />

        {/* Central romantic rose-heart crest */}
        <path
          d="M64 39C64 39 50 30.2 50 20.5C50 15.8 53.6 12.5 57.8 12.5C60.6 12.5 62.8 14.1 64 16.3C65.2 14.1 67.4 12.5 70.2 12.5C74.4 12.5 78 15.8 78 20.5C78 30.2 64 39 64 39Z"
          fill="#641D35"
          fillOpacity="0.65"
          stroke="url(#champagneGold)"
          strokeWidth="1.2"
        />
        {/* Inner rose petals spiral */}
        <path
          d="M64 18C61 18 58.5 20.2 58.5 23C58.5 26.5 64 31 64 31C64 31 69.5 26.5 69.5 23C69.5 20.2 67 18 64 18Z"
          fill="#F0C5D1"
          fillOpacity="0.35"
          stroke="#F8E8D5"
          strokeWidth="0.85"
        />
        <circle cx="64" cy="22.5" r="2" fill="#FFF5ED" />
        <circle cx="43" cy="27" r="1.5" fill="#D6B17A" opacity="0.8" />
        <circle cx="85" cy="27" r="1.5" fill="#D6B17A" opacity="0.8" />
      </svg>
    </div>
  );
}

export function OrnamentalDivider({
  variant = "gold",
  className = "",
}: {
  variant?: "gold" | "rose" | "dark";
  className?: string;
}) {
  const strokeColor =
    variant === "dark"
      ? "#8C3B58"
      : variant === "rose"
      ? "#C98298"
      : "#D6B17A";

  const centerFill =
    variant === "dark"
      ? "#641D35"
      : variant === "rose"
      ? "#F0C5D1"
      : "#F8E8D5";

  return (
    <div
      aria-hidden="true"
      className={`my-5 flex items-center justify-center gap-3 select-none ${className}`}
    >
      <span
        className="h-px w-16 sm:w-28"
        style={{
          background: `linear-gradient(to left, ${strokeColor}88, transparent)`,
        }}
      />
      <svg
        width="36"
        height="16"
        viewBox="0 0 36 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 2L21.5 8L18 14L14.5 8L18 2Z"
          fill={centerFill}
          fillOpacity="0.3"
          stroke={strokeColor}
          strokeWidth="1"
        />
        <circle cx="8" cy="8" r="1.5" fill={strokeColor} fillOpacity="0.75" />
        <circle cx="28" cy="8" r="1.5" fill={strokeColor} fillOpacity="0.75" />
      </svg>
      <span
        className="h-px w-16 sm:w-28"
        style={{
          background: `linear-gradient(to right, ${strokeColor}88, transparent)`,
        }}
      />
    </div>
  );
}

export function WaxSealBadge({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dimensions =
    size === "sm" ? "h-9 w-9" : size === "lg" ? "h-14 w-14" : "h-11 w-11";

  return (
    <div
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full select-none ${dimensions} ${className}`}
      style={{
        background:
          "radial-gradient(circle at 32% 28%, #8F2C4D 0%, #641D35 52%, #35111F 100%)",
        boxShadow:
          "0 6px 16px -3px rgba(53, 17, 31, 0.55), inset 0 1px 2px rgba(248, 232, 213, 0.35), inset 0 -2px 4px rgba(25, 6, 14, 0.7)",
        border: "1.5px solid rgba(214, 177, 122, 0.55)",
      }}
    >
      {/* Inner embossed wax ring */}
      <div
        className="flex h-[78%] w-[78%] items-center justify-center rounded-full border border-[#D6B17A]/45"
        style={{
          boxShadow: "inset 0 1px 3px rgba(25, 6, 14, 0.65)",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 20.5C12 20.5 4.5 15.2 4.5 9.5C4.5 6.8 6.6 4.8 9.2 4.8C10.7 4.8 11.5 5.6 12 6.6C12.5 5.6 13.3 4.8 14.8 4.8C17.4 4.8 19.5 6.8 19.5 9.5C19.5 15.2 12 20.5 12 20.5Z"
            fill="#D6B17A"
            fillOpacity="0.85"
          />
        </svg>
      </div>
    </div>
  );
}

export function CornerFiligree({
  tone = "gold",
}: {
  tone?: "gold" | "burgundy";
}) {
  const color = tone === "burgundy" ? "#641D35" : "#D6B17A";
  return (
    <>
      {/* Top Right */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-3 right-3 h-7 w-7 opacity-45 sm:top-4 sm:right-4 sm:h-9 sm:w-9"
        viewBox="0 0 36 36"
        fill="none"
      >
        <path
          d="M2 2H24C29.5228 2 34 6.47715 34 12V34"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="29" cy="7" r="1.8" fill={color} />
      </svg>
      {/* Top Left */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-3 left-3 h-7 w-7 -scale-x-100 opacity-45 sm:top-4 sm:left-4 sm:h-9 sm:w-9"
        viewBox="0 0 36 36"
        fill="none"
      >
        <path
          d="M2 2H24C29.5228 2 34 6.47715 34 12V34"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="29" cy="7" r="1.8" fill={color} />
      </svg>
      {/* Bottom Right */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-3 bottom-3 h-7 w-7 -scale-y-100 opacity-45 sm:right-4 sm:bottom-4 sm:h-9 sm:w-9"
        viewBox="0 0 36 36"
        fill="none"
      >
        <path
          d="M2 2H24C29.5228 2 34 6.47715 34 12V34"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="29" cy="7" r="1.8" fill={color} />
      </svg>
      {/* Bottom Left */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-3 h-7 w-7 -scale-x-100 -scale-y-100 opacity-45 sm:bottom-4 sm:left-4 sm:h-9 sm:w-9"
        viewBox="0 0 36 36"
        fill="none"
      >
        <path
          d="M2 2H24C29.5228 2 34 6.47715 34 12V34"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="29" cy="7" r="1.8" fill={color} />
      </svg>
    </>
  );
}
