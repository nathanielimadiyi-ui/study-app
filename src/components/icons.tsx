import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  filled?: boolean;
  /** color used to "cut out" inner detail lines when filled */
  cut?: string;
};

/* ---------------- 4-point sparkle path generator ---------------- */
const sparkle = (cx: number, cy: number, r: number, inner = 0.28) =>
  `M ${cx} ${cy - r} C ${cx + r * inner} ${cy - r * inner}, ${cx + r * inner} ${
    cy - r * inner
  }, ${cx + r} ${cy} C ${cx + r * inner} ${cy + r * inner}, ${cx + r * inner} ${
    cy + r * inner
  }, ${cx} ${cy + r} C ${cx - r * inner} ${cy + r * inner}, ${cx - r * inner} ${
    cy + r * inner
  }, ${cx - r} ${cy} C ${cx - r * inner} ${cy - r * inner}, ${cx - r * inner} ${
    cy - r * inner
  }, ${cx} ${cy - r} Z`;

/* ---------------- Bottom nav: folder with lines ---------------- */
export function FolderLinesIcon({ filled = false, cut = "#1D1F2A", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <path
        d="M3.4 6.6c0-1.1.9-2 2-2h3.1c.5 0 1 .2 1.3.6l1.1 1.3c.2.2.5.3.8.3h6.9c1.1 0 2 .9 2 2v9.4c0 1.1-.9 2-2 2H5.4c-1.1 0-2-.9-2-2V6.6Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M7.3 12.4h8.4M7.3 15.6h5.4"
        fill="none"
        stroke={filled ? cut : "currentColor"}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------- Bottom nav: overlapping chat bubbles ---------------- */
export function ChatBubblesIcon({ filled = false, cut = "#1D1F2A", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      {/* back bubble */}
      <path
        d="M7.2 3.6h11.3c.9 0 1.6.7 1.6 1.6v7.1c0 .9-.7 1.6-1.6 1.6h-6.5l-2.7 2.6c-.4.4-1 .1-1-.4v-2.2h-1.1c-.9 0-1.6-.7-1.6-1.6V5.2c0-.9.7-1.6 1.6-1.6Z"
        transform="translate(0,-1)"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      {/* front bubble */}
      <path
        d="M3.6 9.4c0-.9.7-1.6 1.6-1.6h9.7c.9 0 1.6.7 1.6 1.6v6.9c0 .9-.7 1.6-1.6 1.6H9.2l-3.2 3c-.4.4-1.1.1-1.1-.5v-2.5c-.7-.2-1.3-.9-1.3-1.7V9.4Z"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? cut : "currentColor"}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------- Bottom nav / empty state: magic wand + stars ---------------- */
export function WandStarsIcon({ filled = false, cut = "#1D1F2A", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      {/* wand body */}
      <path
        d="M3.4 20.9c-.4-.5-.4-1.2 0-1.7l9.7-10.5c.5-.5 1.2-.5 1.7 0 .5.5.5 1.3 0 1.8L5.1 20.9c-.5.5-1.3.5-1.7 0Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      {/* tip line: unpainted gap, then star */}
      <path d={sparkle(17.1, 7.3, 4.5, 0.22)} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d={sparkle(20.3, 2.6, 1.9, 0.24)} fill="currentColor" stroke="none" />
      <path d={sparkle(20.9, 12.4, 1.5, 0.24)} fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ---------------- Audio Overview: waveform + sparkle ---------------- */
export function AudioWaveSparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <rect x="3.4" y="11" width="2.7" height="5.4" rx="1.35" fill="currentColor" />
      <rect x="8" y="8.2" width="2.7" height="11" rx="1.35" fill="currentColor" />
      <rect x="12.6" y="12.4" width="2.7" height="6" rx="1.35" fill="currentColor" />
      <circle cx="19.6" cy="17.8" r="1.25" fill="currentColor" />
      <path d={sparkle(17.6, 7, 4.6, 0.24)} fill="currentColor" />
    </svg>
  );
}

/* ---------------- Video Overview: stacked screens + play ---------------- */
export function VideoOverviewIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8.2 3.6h7.6" />
      <path d="M6.4 6.3h11.2" />
      <rect x="4.2" y="8.9" width="15.6" height="11" rx="2.2" />
      <path d="M10.3 12.2v4.4l3.9-2.2-3.9-2.2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ---------------- Slide Deck: presentation frame ---------------- */
export function SlideDeckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3.6" y="5.4" width="16.8" height="13.2" rx="1.8" />
      <rect x="6.8" y="8.6" width="10.4" height="6.8" rx="1.1" />
    </svg>
  );
}

/* ---------------- Flashcards: stacked cards + star ---------------- */
export function FlashcardsIcon({ occlude = "#1D1F2A", ...props }: IconProps & { occlude?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="7" y="4.4" width="12.2" height="10.6" rx="1.9" />
      <rect x="4.6" y="7.8" width="12.6" height="11.8" rx="1.9" fill={occlude} />
      <path
        d={sparkle(11, 13.6, 3.5, 0.3)}
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/* ---------------- Quiz: stacked cards + question mark ---------------- */
export function QuizIcon({ occlude = "#1D1F2A", ...props }: IconProps & { occlude?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="7" y="4.4" width="12.2" height="10.6" rx="1.9" />
      <rect x="4.6" y="7.8" width="12.6" height="11.8" rx="1.9" fill={occlude} />
      <path d="M9.9 12.1c0-1.4 1.2-2 1.2-3.1 0-.8-.6-1.4-1.5-1.4-1 0-1.7.6-1.9 1.5" transform="translate(1.1,1.6) scale(0.92)" />
      <circle cx="10.9" cy="15.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ---------------- Infographic: bar chart + dashed bar ---------------- */
export function InfographicIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <rect x="3.6" y="10.4" width="3" height="9.6" rx="0.9" fill="currentColor" />
      <rect x="8.3" y="5.6" width="3" height="14.4" rx="0.9" fill="currentColor" />
      <rect x="13" y="13.2" width="3" height="6.8" rx="0.9" fill="currentColor" />
      <rect x="17.7" y="15.6" width="3" height="4.4" rx="0.9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />
    </svg>
  );
}

/* ---------------- Reports: stacked pages + star ---------------- */
export function ReportsIcon({ occlude = "#1D1F2A", ...props }: IconProps & { occlude?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="7.6" y="5.8" width="11.6" height="14" rx="1.9" transform="rotate(6 13.4 12.8)" />
      <rect x="4.8" y="7.4" width="11.6" height="14" rx="1.9" fill={occlude} />
      <path d={sparkle(17.4, 5.4, 3.1, 0.26)} fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ---------------- Chat: copy/select overlapping squares ---------------- */
export function CopyOverlapIcon({ occlude = "#14151D", ...props }: IconProps & { occlude?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3.4" y="3.6" width="12" height="12" rx="2.4" strokeDasharray="2.6 2.9" />
      <rect x="8.6" y="8.4" width="12" height="12" rx="2.4" fill={occlude} />
    </svg>
  );
}

/* ---------------- Orange book thumbnail ---------------- */
export function BookThumb({ size = 62 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.94} viewBox="0 0 62 58" fill="none">
      {/* pages block */}
      <rect x="10" y="2" width="48" height="54" rx="5" fill="#e3e5e8" />
      <rect x="10" y="2" width="48" height="54" rx="5" fill="#c8cdd4" opacity="0.35" />
      {/* cover */}
      <rect x="6" y="0" width="48" height="50" rx="5" fill="#f2994a" />
      {/* spine shadow */}
      <rect x="6" y="0" width="7" height="50" rx="3.5" fill="#dd8032" />
      <rect x="12" y="0" width="1.6" height="50" fill="#c9742a" opacity="0.55" />
      {/* cover edge highlight */}
      <rect x="6" y="0" width="48" height="50" rx="5" stroke="#ffb877" strokeWidth="1" opacity="0.5" />
      {/* emblem */}
      <path
        d="M34 8.2c2.9-2 7-2 9.9 0l.1 6.6c-2.9-2-7-2-9.9 0L34 8.2Z"
        fill="#fbe3c8"
      />
      <path d="M34 8.2c-2.9-2-7-2-9.9 0l-.1 6.6c2.9-2 7-2 9.9 0l.1-6.6Z" fill="#fff6ec" />
    </svg>
  );
}
