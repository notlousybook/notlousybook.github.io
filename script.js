// ╔══════════════════════════════════════════════════════════════════╗
// ║  NOTLOUSYBOOK PORTFOLIO — MAIN SCRIPT                         ║
// ║  Standalone vanilla JS — no React, no JSX, no build step       ║
// ╚══════════════════════════════════════════════════════════════════╝

/* ============================================================
   1. SVG ICONS SYSTEM
   ============================================================ */

const ICONS = {
  // ─── Tech Stack Icons ────────────────────────────────────────
  python: `<g stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2C8 2 8 4 8 4v2h8V4s0-2-4-2z"/>
    <path d="M6 8c-2 0-4 1-4 4s2 4 4 4h3V8H6z"/>
    <path d="M18 8c2 0 4 1 4 4s-2 4-4 4h-3V8h3z"/>
    <path d="M12 22c4 0 4-2 4-2v-2H8v2s0 2 4 2z"/>
    <circle cx="6.5" cy="12" r="1" fill="currentColor" stroke="none"/>
    <circle cx="17.5" cy="12" r="1" fill="currentColor" stroke="none"/>
  </g>`,
  javascript: `<g>
    <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
    <text x="12" y="17" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor" font-family="monospace">JS</text>
  </g>`,
  typescript: `<g>
    <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
    <text x="12" y="17" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor" font-family="monospace">TS</text>
  </g>`,
  threejs: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M12 2L22 8v8l-10 6L2 16V8l10-6z"/>
    <path d="M12 2v20"/>
    <path d="M2 8l10 6 10-6"/>
    <path d="M2 16l10-6"/>
  </g>`,
  pywebview: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <line x1="8" y1="7" x2="10" y2="7"/>
    <line x1="14" y1="7" x2="16" y2="7"/>
  </g>`,
  nextjs: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M4 4h16v16H4z"/>
    <path d="M7 7l10 14"/>
    <path d="M7 21L17 7"/>
    <path d="M7 7h4"/>
    <path d="M7 21h4"/>
    <path d="M17 7v4"/>
  </g>`,
  discordpy: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="9" cy="10" r="1.5"/>
    <circle cx="15" cy="10" r="1.5"/>
    <path d="M5 16c1.5 2 3 3 7 3s5.5-1 7-3"/>
    <path d="M12 3c-6 0-9 3-9 8 0 4 2 7 5 9 0 0 0-2 1-3l-1-1c0-1 0-2 .5-2.5.5.5 1 1 3.5 1s3-.5 3.5-1c.5.5.5 1.5.5 2.5l-1 1c1 1 1 3 1 3 3-2 5-5 5-9 0-5-3-8-9-8z"/>
  </g>`,
  ml: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M12 3C8 3 5 6 5 10c0 2 1 3.5 2 4.5C7 16 7 18 7 18h10s0-2 0-3.5c1-1 2-2.5 2-4.5 0-4-3-7-7-7z"/>
    <path d="M9 18v1.5a3 3 0 006 0V18"/>
    <path d="M12 7v3"/>
    <path d="M10 9h4"/>
  </g>`,
  git: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="12" cy="4" r="2" fill="currentColor"/>
    <circle cx="12" cy="20" r="2" fill="currentColor"/>
    <circle cx="20" cy="12" r="2" fill="currentColor"/>
    <line x1="12" y1="6" x2="12" y2="18"/>
    <path d="M12 6c0 0 0-2 4-2s4 2 4 4"/>
  </g>`,
  deepseek: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="11" cy="11" r="7"/>
    <line x1="16.5" y1="16.5" x2="21" y2="21"/>
    <circle cx="8" cy="9" r="2" fill="currentColor" stroke="none" opacity="0.3"/>
    <circle cx="13" cy="13" r="1.5" fill="currentColor" stroke="none" opacity="0.3"/>
  </g>`,
  htmlcss: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <polyline points="8,6 4,12 8,18"/>
    <polyline points="16,6 20,12 16,18"/>
    <line x1="14" y1="4" x2="10" y2="20"/>
  </g>`,
  creative: `<g fill="currentColor">
    <path d="M12 2l1.5 3.5L17 7l-3.5 1.5L12 12l-1.5-3.5L7 7l3.5-1.5z"/>
    <path d="M5 10l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/>
    <path d="M19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/>
  </g>`,

  // ─── Counter / Stats Icons ───────────────────────────────────
  folder: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
  </g>`,
  star: `<g><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" stroke="none"/></g>`,
  pin: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </g>`,
  infinity: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M12 12c-2-2.5-4.5-5-7-5C2.5 7 1 9.5 1 12s1.5 5 4 5c2.5 0 5-2.5 7-5zm0 0c2 2.5 4.5 5 7 5 2.5 0 4-2.5 4-5s-1.5-5-4-5c-2.5 0-5 2.5-7 5z"/>
  </g>`,
  cake: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M20 21H4V11a2 2 0 012-2h12a2 2 0 012 2v10z"/>
    <path d="M4 15c2-1 3 0 4 1s2 2 4 1 2-2 4-1 2 0 4 1"/>
    <line x1="8" y1="7" x2="8" y2="4"/>
    <line x1="12" y1="7" x2="12" y2="3"/>
    <line x1="16" y1="7" x2="16" y2="4"/>
    <circle cx="8" cy="3" r="0.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="2" r="0.5" fill="currentColor" stroke="none"/>
    <circle cx="16" cy="3" r="0.5" fill="currentColor" stroke="none"/>
  </g>`,
  ramen: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M4 14h16c0 4.42-3.58 8-8 8S4 18.42 4 14z"/>
    <line x1="2" y1="14" x2="22" y2="14"/>
    <path d="M8 10c0-1 .5-3 2-4"/>
    <path d="M12 8c0-1 .5-3 2-4"/>
    <path d="M16 10c0-1 .5-3 2-4"/>
  </g>`,
  moon: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </g>`,
  book: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
  </g>`,
  globe: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </g>`,

  // ─── Project Feature Icons ───────────────────────────────────
  seedling: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M12 22v-8"/>
    <path d="M7 10c0-4 3-7 8-7 0 5-3 8-8 8z"/>
    <path d="M12 14c3 0 6-2 8-5-5 0-8 2-8 5z"/>
  </g>`,
  link: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </g>`,
  brain: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M12 5c-1.5 0-3 .5-3 2.5S8 11 6 11c-1.5 0-3-1-3-3"/>
    <path d="M12 5c1.5 0 3 .5 3 2.5S16 11 18 11c1.5 0 3-1 3-3"/>
    <path d="M9 11c0 2-1 3.5-1 5s1 3 2 4"/>
    <path d="M15 11c0 2 1 3.5 1 5s-1 3-2 4"/>
    <path d="M9 11h6"/>
    <line x1="12" y1="20" x2="12" y2="22"/>
  </g>`,
  refresh: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
  </g>`,
  clipboard: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <line x1="8" y1="16" x2="14" y2="16"/>
  </g>`,
  bolt: `<g fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></g>`,
  rocket: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </g>`,
  search: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </g>`,
  gear: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </g>`,
  package: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </g>`,
  lock: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
    <circle cx="12" cy="16" r="1"/>
  </g>`,
  wave: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M7 11V7a5 5 0 0110 0v4"/>
    <path d="M4 12c0-2 1.5-3 3-1s3 4 5 4 3-2 5-4 3-1 3 1"/>
    <path d="M5 17c0 2 1.5 3 3 1s3-4 5-4 3 2 5 4 3 1 3-1"/>
  </g>`,
  pencil: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </g>`,
  smile: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
  </g>`,
  chat: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </g>`,
  puzzle: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 01-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 10-3.214 3.214c.446.166.855.497.925.968a.979.979 0 01-.276.837l-1.61 1.61a2.404 2.404 0 01-1.705.707 2.402 2.402 0 01-1.704-.706l-1.568-1.568a1.026 1.026 0 00-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 11-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 00-.289-.877l-1.568-1.568A2.402 2.402 0 013 12c0-.617.236-1.234.706-1.704L5.317 8.685a.98.98 0 01.837-.276c.47.07.802.48.968.925a2.501 2.501 0 103.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 01.276-.837l1.61-1.61a2.404 2.404 0 011.705-.707c.618 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 113.237 3.237c-.464.18-.894.527-.967 1.02z"/>
  </g>`,
  confetti: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M5.8 11.3L2 22l10.7-3.79"/>
    <path d="M4 3h.01" stroke-width="3"/>
    <path d="M22 8h.01" stroke-width="3"/>
    <path d="M15 2h.01" stroke-width="3"/>
    <path d="M22 20h.01" stroke-width="3"/>
    <path d="M8 2l2 3 2-3" fill="currentColor" stroke="none"/>
    <path d="M19 4l-1 3.5L16.5 6.5"/>
    <path d="M20 13l-3.5 1 1.5 1.5"/>
  </g>`,
  chart: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </g>`,
  sparkle: `<g fill="currentColor">
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z"/>
    <path d="M4 14l.75 2.25L7 17l-2.25.75L4 20l-.75-2.25L1 17l2.25-.75z"/>
    <path d="M20 12l.75 2.25L23 15l-2.25.75L20 18l-.75-2.25L17 15l2.25-.75z"/>
  </g>`,
  person: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </g>`,
  scroll: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M8 21h12a2 2 0 002-2v-2H10v2a2 2 0 11-4 0V5a2 2 0 012-2h1a2 2 0 012 2v12h14"/>
    <line x1="12" y1="7" x2="16" y2="7"/>
    <line x1="12" y1="11" x2="16" y2="11"/>
  </g>`,
  fire: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2c-2 4-6 6-6 11a6 6 0 1012 0c0-5-4-7-6-11z"/>
    <path d="M12 22c-1.5 0-3-1.5-3-4 0-3 3-5 3-5s3 2 3 5c0 2.5-1.5 4-3 4z"/>
  </g>`,
  check: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <polyline points="20 6 9 17 4 12"/>
  </g>`,
  build: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </g>`,
  target: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </g>`,
  robot: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <rect x="5" y="6" width="14" height="12" rx="2"/>
    <line x1="12" y1="2" x2="12" y2="6"/>
    <circle cx="12" cy="2" r="1" fill="currentColor" stroke="none"/>
    <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none"/>
    <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none"/>
    <path d="M9 16h6"/>
    <line x1="3" y1="10" x2="5" y2="10"/>
    <line x1="3" y1="14" x2="5" y2="14"/>
    <line x1="19" y1="10" x2="21" y2="10"/>
    <line x1="19" y1="14" x2="21" y2="14"/>
  </g>`,
  question: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </g>`,
  notes: `<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="16" y2="17"/>
  </g>`,
};

function getIcon(name, size) {
  if (size === undefined) size = 20;
  const content = ICONS[name];
  if (!content) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
  }
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' + content + '</svg>';
}

/* ============================================================
   2. DOM READY — Populate dynamic content from SITE_CONFIG
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ─── Populate project-stats-row ────────────────────────────
  var statsRow = document.getElementById('project-stats-row');
  if (statsRow) {
    statsRow.innerHTML = SITE_CONFIG.projectStats.map(function (stat) {
      return '<div class="glass-card project-counter-card">' +
        '<div style="font-size:1.25rem;margin-bottom:0.25rem">' + getIcon(stat.icon, 24) + '</div>' +
        '<span class="project-counter-value gradient-text" data-target="' + stat.target + '">' +
          (typeof stat.target === 'string' ? stat.target : '0') +
        '</span>' +
        '<span class="project-counter-label">' + stat.label + '</span>' +
      '</div>';
    }).join('');
  }

  // ─── Populate projects-grid ────────────────────────────────
  var projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = SITE_CONFIG.projects.map(function (p, i) {
      var statusColors = { Stable: '#00f5d4', Active: '#60a5fa', Alpha: '#fbbf24' };
      var sc = statusColors[p.status] || '#9fb0bb';
      return '<div class="project-card reveal" style="transition-delay:' + (i * 0.1) + 's" data-slug="' + p.slug + '">' +
        '<div class="project-card-inner">' +
          '<div class="project-card-edge-glow" style="background:' + p.gradient + '"></div>' +
          '<div class="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500" style="background:radial-gradient(350px circle at var(--mouse-x,50%) var(--mouse-y,50%),' + p.accentColor + '10,transparent 60%);opacity:0"></div>' +
          '<div class="flex items-center justify-between mb-4">' +
            '<div class="project-icon" style="background:' + p.accentColor + '15;border-color:' + p.accentColor + '25;color:' + p.accentColor + '">' +
              getIcon(p.icon, 24) +
            '</div>' +
            '<span class="text-xs font-medium px-2.5 py-1 rounded-full" style="background:' + sc + '15;color:' + sc + ';border:1px solid ' + sc + '30">' +
              (p.status === 'Active' ? '\u25CF ' : '') + p.status +
            '</span>' +
          '</div>' +
          '<h3 class="project-name">' + p.name + '</h3>' +
          '<p class="project-desc">' + p.description + '</p>' +
          '<div class="project-meta">' +
            (p.stars > 0 ? '<div class="project-meta-item"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="color:#fbbf24"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg> ' + p.stars + '</div>' : '') +
            (p.forks > 0 ? '<div class="project-meta-item"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878Zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm3-8.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/></svg> ' + p.forks + '</div>' : '') +
            (p.language ? '<div class="project-lang"><span class="project-lang-dot" style="background:' + p.langColor + '"></span> ' + p.language + '</div>' : '') +
          '</div>' +
          '<div class="project-view-details" style="color:' + p.accentColor + '">' +
            'View Details <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  // ─── Populate marquee-content ──────────────────────────────
  var marqueeContent = document.getElementById('marquee-content');
  if (marqueeContent) {
    var itemsHtml = SITE_CONFIG.marqueeItems.map(function (item) {
      return '<span class="inline-flex items-center gap-2">' +
        '<span class="marquee-dot" style="background:' + item.dotColor + '"></span> ' +
        item.text +
      '</span>';
    }).join('');
    marqueeContent.innerHTML = '';
    for (var m = 0; m < 3; m++) {
      var span = document.createElement('span');
      span.className = 'marquee-item';
      span.innerHTML = itemsHtml;
      marqueeContent.appendChild(span);
    }
  }

  // ─── Populate about-stats-grid ─────────────────────────────
  var aboutStatsGrid = document.getElementById('about-stats-grid');
  if (aboutStatsGrid) {
    aboutStatsGrid.innerHTML = SITE_CONFIG.aboutStats.map(function (stat) {
      return '<div class="glass-card" style="padding:1.5rem;text-align:center">' +
        '<div style="font-size:1.75rem;margin-bottom:0.5rem">' + getIcon(stat.icon, 28) + '</div>' +
        '<div class="gradient-text" style="font-size:1.5rem;font-weight:700;font-family:Climate Crisis,serif;margin-bottom:0.25rem">' + stat.value + '</div>' +
        '<div style="font-size:0.875rem;color:var(--text-muted)">' + stat.label + '</div>' +
      '</div>';
    }).join('');
  }

  // ─── Populate tech-grid ────────────────────────────────────
  var techGrid = document.getElementById('tech-grid');
  if (techGrid) {
    techGrid.innerHTML = SITE_CONFIG.techStack.map(function (tech) {
      return '<div class="tech-badge magnetic-btn">' +
        '<span class="tech-badge-icon">' + getIcon(tech.icon, 18) + '</span>' +
        tech.name +
      '</div>';
    }).join('');
  }

  // ─── Populate collab-grid ─────────────────────────────────
  var collabGrid = document.getElementById('collab-grid');
  if (collabGrid) {
    collabGrid.innerHTML = SITE_CONFIG.collabCards.map(function (card) {
      return '<div class="glass-card collab-card">' +
        '<div class="collab-card-icon" style="color:' + card.iconColor + '">' +
          getIcon(card.icon, 28) +
        '</div>' +
        '<h3 class="collab-card-title">' + card.title + '</h3>' +
        '<p class="collab-card-desc">' + card.desc + '</p>' +
      '</div>';
    }).join('');
  }

  // ─── Footer year ───────────────────────────────────────────
  var footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // ─── Nav brand text ────────────────────────────────────────
  var navBrand = document.querySelector('.nav-brand');
  if (navBrand) navBrand.textContent = SITE_CONFIG.name;


  /* ============================================================
     3. THREE.JS PARTICLE GALAXY
     ============================================================ */

  (function initParticleGalaxy() {
    var container = document.getElementById('particle-canvas');
    if (!container || typeof THREE === 'undefined') return;

    var width = container.clientWidth;
    var height = container.clientHeight;
    var mouseX = 0, mouseY = 0;
    var frameId;

    // Scene setup
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030311, 0.06);

    var camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Main particle system — 600 particles
    var particleCount = 600;
    var positions = new Float32Array(particleCount * 3);
    var colors = new Float32Array(particleCount * 3);
    var sizes = new Float32Array(particleCount);
    var velocities = new Float32Array(particleCount * 3);

    var greenColor = new THREE.Color(0x00f5d4);
    var blueColor = new THREE.Color(0x7b61ff);
    var whiteTint = new THREE.Color(0xc8d0ff);

    for (var i = 0; i < particleCount; i++) {
      var i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 24;
      positions[i3 + 1] = (Math.random() - 0.5) * 16;
      positions[i3 + 2] = (Math.random() - 0.5) * 16;

      velocities[i3] = (Math.random() - 0.5) * 0.005;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.003;

      var colorChoice = Math.random();
      var color;
      if (colorChoice < 0.45) {
        color = greenColor.clone().lerp(whiteTint, Math.random() * 0.3);
      } else if (colorChoice < 0.8) {
        color = blueColor.clone().lerp(whiteTint, Math.random() * 0.3);
      } else {
        color = whiteTint.clone();
      }
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    var material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: [
        'attribute float size;',
        'attribute vec3 color;',
        'varying vec3 vColor;',
        'varying float vAlpha;',
        'uniform float uTime;',
        'uniform float uPixelRatio;',
        'void main() {',
        '  vColor = color;',
        '  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);',
        '  float distFromCenter = length(position.xy) / 12.0;',
        '  vAlpha = 1.0 - smoothstep(0.0, 1.0, distFromCenter) * 0.5;',
        '  gl_PointSize = size * uPixelRatio * (6.0 / -mvPosition.z);',
        '  gl_PointSize = max(gl_PointSize, 1.0);',
        '  gl_Position = projectionMatrix * mvPosition;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec3 vColor;',
        'varying float vAlpha;',
        'void main() {',
        '  float d = length(gl_PointCoord - vec2(0.5));',
        '  if (d > 0.5) discard;',
        '  float glow = 1.0 - smoothstep(0.0, 0.5, d);',
        '  glow = pow(glow, 1.5);',
        '  gl_FragColor = vec4(vColor, glow * vAlpha * 0.7);',
        '}'
      ].join('\n'),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    var particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Star particles — 40 larger twinkling ones
    var starCount = 40;
    var starPositions = new Float32Array(starCount * 3);
    var starColors = new Float32Array(starCount * 3);
    var starSizes = new Float32Array(starCount);

    for (var j = 0; j < starCount; j++) {
      var j3 = j * 3;
      starPositions[j3] = (Math.random() - 0.5) * 20;
      starPositions[j3 + 1] = (Math.random() - 0.5) * 12;
      starPositions[j3 + 2] = (Math.random() - 0.5) * 10;
      starColors[j3] = 0.9;
      starColors[j3 + 1] = 0.97;
      starColors[j3 + 2] = 0.95;
      starSizes[j] = Math.random() * 6 + 4;
    }

    var starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    var starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: [
        'attribute float size;',
        'attribute vec3 color;',
        'varying vec3 vColor;',
        'uniform float uPixelRatio;',
        'void main() {',
        '  vColor = color;',
        '  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);',
        '  gl_PointSize = size * uPixelRatio * (6.0 / -mvPosition.z);',
        '  gl_PointSize = max(gl_PointSize, 1.5);',
        '  gl_Position = projectionMatrix * mvPosition;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec3 vColor;',
        'uniform float uTime;',
        'void main() {',
        '  float d = length(gl_PointCoord - vec2(0.5));',
        '  if (d > 0.5) discard;',
        '  float glow = 1.0 - smoothstep(0.0, 0.5, d);',
        '  glow = pow(glow, 2.0);',
        '  float twinkle = sin(uTime * 3.0 + gl_PointCoord.x * 20.0) * 0.3 + 0.7;',
        '  gl_FragColor = vec4(vColor, glow * 0.5 * twinkle);',
        '}'
      ].join('\n'),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    var stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Mouse handler
    container.addEventListener('mousemove', function (e) {
      var rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    // Animation loop
    function animate() {
      var posArr = geometry.attributes.position.array;
      var colArr = geometry.attributes.color.array;
      var time = Date.now() * 0.0003;

      for (var k = 0; k < posArr.length; k += 3) {
        posArr[k] += velocities[k] + Math.sin(time + posArr[k + 1] * 0.5) * 0.003;
        posArr[k + 1] += velocities[k + 1] + Math.cos(time + posArr[k] * 0.5) * 0.003;
        posArr[k + 2] += velocities[k + 2] + Math.sin(time + posArr[k] * 0.3) * 0.002;

        // Mouse repulsion
        var dx = posArr[k] - mouseX * 5;
        var dy = posArr[k + 1] - mouseY * 5;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3) {
          var force = (3 - dist) * 0.003;
          posArr[k] += dx * force;
          posArr[k + 1] += dy * force;
        }

        // Wrap boundaries
        if (posArr[k] > 12) posArr[k] = -12;
        if (posArr[k] < -12) posArr[k] = 12;
        if (posArr[k + 1] > 8) posArr[k + 1] = -8;
        if (posArr[k + 1] < -8) posArr[k + 1] = 8;

        // Subtle color pulsing
        var colorShift = Math.sin(time * 2 + k * 0.1) * 0.15;
        colArr[k] = 0.0 + colorShift * 0.3;
        colArr[k + 1] = 0.96 + colorShift * 0.1;
        colArr[k + 2] = 0.83 + colorShift * 0.5;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      // Slow rotation
      particles.rotation.y = time * 0.05;
      particles.rotation.x = Math.sin(time * 0.3) * 0.02;

      var shaderTime = Date.now() * 0.001;
      material.uniforms.uTime.value = shaderTime;
      starMaterial.uniforms.uTime.value = shaderTime;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    // Resize handler
    window.addEventListener('resize', function () {
      var w = container.clientWidth;
      var h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  })();


  /* ============================================================
     4. CUSTOM CURSOR + TRAIL
     ============================================================ */

  (function initCursor() {
    if (window.innerWidth < 768) return;

    var cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    var trailCount = 8;
    var trails = [];
    for (var t = 0; t < trailCount; t++) {
      var trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.opacity = String(0.4 - t * 0.05);
      trail.style.width = (4 - t * 0.3) + 'px';
      trail.style.height = (4 - t * 0.3) + 'px';
      document.body.appendChild(trail);
      trails.push(trail);
    }

    var mx = 0, my = 0, cx = 0, cy = 0, dx = 0, dy = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      for (var i = 0; i < trails.length; i++) {
        (function (idx, trailEl) {
          setTimeout(function () {
            trailEl.style.left = mx + 'px';
            trailEl.style.top = my + 'px';
            trailEl.style.transform = 'translate(-50%, -50%)';
          }, idx * 30);
        })(i, trails[i]);
      }
    });

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a, button, [role="button"], .project-card, .btn-primary, .btn-secondary, .tech-badge')) {
        cursor.classList.add('hovering');
      }
    });
    document.addEventListener('mouseout', function (e) {
      cursor.classList.remove('hovering');
    });

    function animCursor() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      dx += (mx - dx) * 0.25;
      dy += (my - dy) * 0.25;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      dot.style.left = dx + 'px';
      dot.style.top = dy + 'px';
      requestAnimationFrame(animCursor);
    }
    animCursor();
  })();


  /* ============================================================
     5. TYPEWRITER EFFECT
     ============================================================ */

  (function initTypewriter() {
    var el = document.getElementById('typewriter-text');
    if (!el) return;
    var texts = SITE_CONFIG.hero.typewriterTexts;
    var textIdx = 0, charIdx = 0, isDeleting = false;

    function tick() {
      var current = texts[textIdx];
      if (!isDeleting) {
        charIdx++;
        el.textContent = current.substring(0, charIdx);
        if (charIdx === current.length) {
          setTimeout(function () { isDeleting = true; tick(); }, 2000);
          return;
        }
        setTimeout(tick, 80);
      } else {
        charIdx--;
        el.textContent = current.substring(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          textIdx = (textIdx + 1) % texts.length;
          setTimeout(tick, 80);
          return;
        }
        setTimeout(tick, 30);
      }
    }
    tick();
  })();


  /* ============================================================
     6. SCROLL REVEAL
     ============================================================ */

  (function initScrollReveal() {
    function setupReveal() {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children')
        .forEach(function (el) { observer.observe(el); });
      return observer;
    }
    setupReveal();

    // Parallax on scroll
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      var vh = window.innerHeight;

      document.querySelectorAll('[data-parallax]').forEach(function (el) {
        var speed = parseFloat(el.dataset.parallax || '0.1');
        var rect = el.getBoundingClientRect();
        var offset = rect.top * speed;
        el.style.transform = 'translateY(' + offset + 'px)';
      });

      document.querySelectorAll('.deco-glow').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var progress = (vh - rect.top) / (vh + rect.height);
        if (progress > 0 && progress < 2) {
          var y = (progress - 0.5) * 40;
          el.style.transform = 'translateY(' + y + 'px)';
        }
      });
    }, { passive: true });
  })();


  /* ============================================================
     7. ANIMATED COUNTERS
     ============================================================ */

  (function initCounters() {
    var counters = document.querySelectorAll('.project-counter-value');
    counters.forEach(function (el) {
      var targetStr = el.getAttribute('data-target');
      if (!targetStr) return;
      var counted = false;

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            var target = Number(targetStr);
            if (isNaN(target)) return; // string target like '∞' is already displayed
            var duration = 1500;
            var start = performance.now();

            function anim(now) {
              var progress = Math.min((now - start) / duration, 1);
              var eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.floor(eased * target);
              if (progress < 1) requestAnimationFrame(anim);
            }
            requestAnimationFrame(anim);
          }
        });
      }, { threshold: 0.5 });
      observer.observe(el);
    });
  })();


  /* ============================================================
     8. PROJECT CARDS — 3D TILT
     ============================================================ */

  (function initCardTilt() {
    document.addEventListener('mousemove', function (e) {
      var card = e.target.closest('.project-card');
      if (!card) return;
      var inner = card.querySelector('.project-card-inner');
      if (!inner) return;

      var rect = inner.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;

      var rotateX = ((y - centerY) / centerY) * -10;
      var rotateY = ((x - centerX) / centerX) * 10;

      inner.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.03, 1.03, 1.03)';
      inner.style.setProperty('--mouse-x', ((x / rect.width) * 100) + '%');
      inner.style.setProperty('--mouse-y', ((y / rect.height) * 100) + '%');

      // Show glow overlay
      var glowDiv = inner.querySelector('.absolute.inset-0.rounded-2xl');
      if (glowDiv) glowDiv.style.opacity = '1';

      // Show view details
      var viewDetails = inner.querySelector('.project-view-details');
      if (viewDetails) {
        viewDetails.style.opacity = '1';
        viewDetails.style.transform = 'translateY(0)';
      }
    });

    document.addEventListener('mouseleave', function (e) {
      var card = e.target.closest('.project-card');
      if (!card) return;
      var inner = card.querySelector('.project-card-inner');
      if (!inner) return;
      inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

      var glowDiv = inner.querySelector('.absolute.inset-0.rounded-2xl');
      if (glowDiv) glowDiv.style.opacity = '0';

      var viewDetails = inner.querySelector('.project-view-details');
      if (viewDetails) {
        viewDetails.style.opacity = '0';
        viewDetails.style.transform = 'translateY(8px)';
      }
    }, true);

    // Click handler for project cards
    document.addEventListener('click', function (e) {
      var card = e.target.closest('.project-card');
      if (card && card.dataset.slug) {
        showProjectDetail(card.dataset.slug);
      }
    });
  })();


  /* ============================================================
     9. PROJECT DETAIL PAGES (SPA routing)
     ============================================================ */

  var mainContent = document.getElementById('main-content');
  var projectDetailPage = document.getElementById('project-detail-page');
  var isProjectDetailActive = false;

  window.showProjectDetail = function showProjectDetail(slug) {
    var project = SITE_CONFIG.projects.find(function (p) { return p.slug === slug; });
    if (!project) return;

    // Page transition
    var overlay = document.getElementById('page-transition-overlay');
    if (overlay) overlay.classList.add('active');

    setTimeout(function () {
      mainContent.style.display = 'none';
      projectDetailPage.style.display = 'block';
      projectDetailPage.style.opacity = '1';
      isProjectDetailActive = true;

      window.scrollTo({ top: 0 });

      var statusColors = {
        Stable: { bg: 'rgba(126, 249, 165, 0.15)', text: '#7ef9a5' },
        Active: { bg: 'rgba(125, 184, 255, 0.15)', text: '#7db8ff' },
        Alpha: { bg: 'rgba(251, 191, 36, 0.15)', text: '#fbbf24' },
      };
      var sc = statusColors[project.status] || { bg: 'rgba(159, 176, 187, 0.15)', text: '#9fb0bb' };
      var statusIcon = project.status === 'Active' ? '\u25CF ' : project.status === 'Stable' ? '\u25C6 ' : '\u25C8 ';

      // Build stats items
      var statsItems = [
        { label: 'Stars', value: project.stars.toString(), icon: 'star' },
        { label: 'Forks', value: project.forks.toString(), icon: 'link' },
        { label: 'Language', value: project.language, icon: 'globe' },
        { label: 'Status', value: project.status, icon: project.status === 'Stable' ? 'check' : project.status === 'Active' ? 'fire' : 'build' },
      ];
      if (project.license) {
        statsItems.push({ label: 'License', value: project.license, icon: 'package' });
      }

      // Build install commands HTML
      var installCmdsHtml = project.installCommands.map(function (cmd) {
        if (cmd.startsWith('#')) {
          return '<span class="code-comment">' + cmd + '</span>\n';
        }
        return '<span><span class="code-prompt">$ </span><span class="code-command">' + cmd + '</span></span>\n';
      }).join('');

      // Build usage commands HTML
      var usageHtml = project.usageCommands.map(function (uc) {
        return '<div class="glass-card project-usage-item">' +
          '<div class="project-usage-cmd"><span class="code-prompt">$ </span><code>' + uc.command + '</code></div>' +
          '<p class="project-usage-desc">' + uc.description + '</p>' +
        '</div>';
      }).join('');

      // Build features HTML
      var featuresHtml = project.features.map(function (f) {
        return '<div class="glass-card project-feature-card">' +
          '<div class="project-feature-icon" style="background:' + project.accentColor + '15;border-color:' + project.accentColor + '25;color:' + project.accentColor + '">' +
            getIcon(f.icon, 22) +
          '</div>' +
          '<h4 class="project-feature-title">' + f.title + '</h4>' +
          '<p class="project-feature-desc">' + f.description + '</p>' +
        '</div>';
      }).join('');

      // Build stats grid HTML
      var statsHtml = statsItems.map(function (s) {
        return '<div class="glass-card project-stat-card">' +
          '<span class="project-stat-icon">' + getIcon(s.icon, 20) + '</span>' +
          '<span class="project-stat-value" style="color:' + project.accentColor + '">' + s.value + '</span>' +
          '<span class="project-stat-label">' + s.label + '</span>' +
        '</div>';
      }).join('');

      // Build tags HTML
      var tagsHtml = project.tags.map(function (tag) {
        return '<span class="project-tag" style="border-color:' + project.accentColor + '30;color:' + project.accentColor + '">' + tag + '</span>';
      }).join('');

      // Build tech stack badges
      var techBadges = project.techStack.map(function (tech) {
        return '<div class="tech-badge magnetic-btn" style="border-color:' + project.accentColor + '20">' +
          '<span class="tech-badge-icon" style="color:' + project.accentColor + '">\u25C6</span>' +
          tech +
        '</div>';
      }).join('');

      // Populate hero
      document.getElementById('project-detail-hero').innerHTML =
        '<section class="project-hero-section" style="position:relative;min-height:70vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(ellipse at 50% 30%,#0a0a1a 0%,#030311 50%,#020210 100%)">' +
          '<div class="deco-glow" style="background:' + project.accentColor + ';opacity:0.12;width:600px;height:600px;top:-10%;right:-10%;position:absolute;filter:blur(100px);pointer-events:none;animation:pulse-glow 8s ease-in-out infinite"></div>' +
          '<div class="deco-glow" style="background:' + project.accentColor + ';opacity:0.08;width:400px;height:400px;bottom:0;left:-5%;position:absolute;filter:blur(100px);pointer-events:none;animation:pulse-glow 6s ease-in-out infinite 2s"></div>' +
          '<div class="grid-pattern" style="position:absolute;inset:0;pointer-events:none;opacity:0.02;background-image:linear-gradient(rgba(0,245,212,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,212,0.5) 1px,transparent 1px);background-size:60px 60px"></div>' +
          '<div class="project-hero-content" style="position:relative;z-index:10;text-align:center;max-width:800px;padding:0 2rem;padding-top:5rem">' +
            '<button class="project-back-btn magnetic-btn" onclick="hideProjectDetail()" style="position:absolute;top:0;left:0;display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:var(--glass-bg);backdrop-filter:blur(12px);border:1px solid var(--glass-border);border-radius:var(--radius-btn);color:var(--text-primary);font-size:0.9rem;cursor:pointer;font-family:inherit;transition:all 0.3s ease">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to Home' +
            '</button>' +
            '<div class="project-hero-icon-wrapper" style="position:relative;display:inline-block;margin-bottom:1.5rem">' +
              '<div class="project-hero-icon-ring" style="position:absolute;inset:-8px;border-radius:50%;border:2px solid transparent;border-top-color:' + project.accentColor + ';border-right-color:' + project.accentColor + ';animation:spin 12s linear infinite"></div>' +
              '<div class="project-hero-icon-inner" style="width:96px;height:96px;border-radius:50%;background:var(--glass-bg);backdrop-filter:blur(20px);border:1px solid var(--glass-border);display:flex;align-items:center;justify-content:center;color:' + project.accentColor + '">' +
                getIcon(project.icon, 48) +
              '</div>' +
              '<div class="project-hero-icon-glow" style="position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(circle,' + project.accentColor + '22,transparent 70%);animation:pulse-glow 4s ease-in-out infinite;pointer-events:none"></div>' +
            '</div>' +
            '<h1 class="project-hero-title" style="font-family:Climate Crisis,DM Serif Display,serif;font-size:clamp(2.5rem,6vw,4.5rem);font-weight:400;line-height:1.1;margin-bottom:1rem">' +
              '<span style="background:' + project.gradient + ';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">' + project.name + '</span>' +
            '</h1>' +
            '<p class="project-hero-tagline" style="font-size:1.2rem;color:var(--text-muted);margin-bottom:1.5rem">' + project.tagline + '</p>' +
            '<div class="project-hero-meta" style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:2rem">' +
              '<span class="project-status-badge" style="background:' + sc.bg + ';color:' + sc.text + ';border:1px solid ' + sc.text + '33;padding:6px 16px;border-radius:100px;font-size:0.8rem;font-weight:500">' +
                statusIcon + project.status +
              '</span>' +
              (project.stars > 0 ? '<span class="project-meta-pill" style="display:inline-flex;align-items:center;gap:4px;padding:6px 12px;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:100px;font-size:0.8rem;color:var(--text-muted)"><svg width="14" height="14" viewBox="0 0 16 16" fill="#fbbf24"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg> ' + project.stars + '</span>' : '') +
              (project.forks > 0 ? '<span class="project-meta-pill" style="display:inline-flex;align-items:center;gap:4px;padding:6px 12px;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:100px;font-size:0.8rem;color:var(--text-muted)"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878Zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm3-8.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/></svg> ' + project.forks + '</span>' : '') +
              '<span class="project-meta-pill" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:100px;font-size:0.8rem;color:var(--text-muted)">' +
                '<span class="project-lang-dot" style="width:10px;height:10px;border-radius:50%;background:' + project.langColor + ';display:inline-block"></span> ' + project.language +
              '</span>' +
            '</div>' +
            '<div class="project-hero-buttons" style="margin-bottom:2rem">' +
              '<a href="' + project.url + '" target="_blank" rel="noopener noreferrer" class="btn-primary magnetic-btn" style="background:linear-gradient(135deg,' + project.accentColor + ',' + project.accentColor + 'cc)">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>' +
                ' View on GitHub' +
              '</a>' +
            '</div>' +
            '<div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;animation:float 3s ease-in-out infinite">' +
              '<span style="color:var(--text-muted);font-size:0.8rem">explore</span>' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="' + project.accentColor + '" stroke-width="2" opacity="0.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>' +
            '</div>' +
          '</div>' +
        '</section>';

      // Populate overview
      document.getElementById('project-detail-overview').innerHTML =
        '<div class="section-divider"></div>' +
        '<section style="background:linear-gradient(180deg,#040617 0%,#060918 100%)">' +
          '<div class="section-container">' +
            '<div class="project-overview-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start">' +
              '<div class="glass-card project-overview-card reveal-left" style="padding:2.5rem">' +
                '<h3 class="project-section-heading" style="font-family:Climate Crisis,serif;font-size:1.5rem;margin-bottom:1.5rem"><span style="color:' + project.accentColor + '">\u25B8</span> Overview</h3>' +
                '<p class="project-overview-text" style="color:var(--text-muted);line-height:1.8;font-size:1rem;margin-bottom:1.5rem">' + project.longDescription + '</p>' +
                '<div class="project-tags-row" style="display:flex;flex-wrap:wrap;gap:8px">' + tagsHtml + '</div>' +
              '</div>' +
              '<div class="reveal-right">' +
                '<div class="project-stats-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">' + statsHtml + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</section>';

      // Populate features
      document.getElementById('project-detail-features').innerHTML =
        '<div class="section-divider"></div>' +
        '<section style="background:linear-gradient(180deg,#060918 0%,#040617 100%)">' +
          '<div class="section-container">' +
            '<div class="section-header reveal">' +
              '<div class="section-label" style="color:' + project.accentColor + '"><span style="color:' + project.accentColor + '">\u25B8</span> features</div>' +
              '<h2 class="section-title"><span style="background:' + project.gradient + ';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">What Makes It Special</span></h2>' +
            '</div>' +
            '<div class="project-features-grid stagger-children" style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem">' + featuresHtml + '</div>' +
          '</div>' +
        '</section>';

      // Populate installation
      document.getElementById('project-detail-installation').innerHTML =
        '<div class="section-divider"></div>' +
        '<section style="background:linear-gradient(180deg,#040617 0%,#050a18 100%)">' +
          '<div class="section-container">' +
            '<div class="section-header reveal">' +
              '<div class="section-label" style="color:' + project.accentColor + '"><span style="color:' + project.accentColor + '">\u25B8</span> installation</div>' +
              '<h2 class="section-title"><span class="gradient-text">Get Started</span></h2>' +
            '</div>' +
            '<div class="reveal">' +
              '<div class="code-block-wrapper" style="background:var(--bg-mid);border:1px solid var(--glass-border);border-radius:var(--radius-card);overflow:hidden">' +
                '<div class="code-block-header" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,0.03);border-bottom:1px solid var(--glass-border)">' +
                  '<div class="code-block-dots" style="display:flex;gap:6px"><span style="width:12px;height:12px;border-radius:50%;background:#ff5f57"></span><span style="width:12px;height:12px;border-radius:50%;background:#febc2e"></span><span style="width:12px;height:12px;border-radius:50%;background:#28c840"></span></div>' +
                  '<span class="code-block-title" style="font-size:0.8rem;color:var(--text-muted)">Terminal</span>' +
                  '<button class="code-copy-btn magnetic-btn" onclick="navigator.clipboard.writeText(\'' + project.installCommands.filter(function(c){return !c.startsWith('#')}).join('\\n').replace(/'/g, "\\'") + '\')" style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:8px;color:var(--text-muted);font-size:0.75rem;cursor:pointer;font-family:inherit;transition:all 0.3s ease">' +
                    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy' +
                  '</button>' +
                '</div>' +
                '<pre class="code-block-body" style="padding:1.25rem;overflow-x:auto;margin:0"><code style="color:var(--text-primary);font-family:monospace;font-size:0.9rem;line-height:1.8">' + installCmdsHtml + '</code></pre>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</section>';

      // Populate usage
      var usageSection = '';
      if (project.usageCommands.length > 0) {
        usageSection =
          '<div class="section-divider"></div>' +
          '<section style="background:linear-gradient(180deg,#050a18 0%,#040617 100%)">' +
            '<div class="section-container">' +
              '<div class="section-header reveal">' +
                '<div class="section-label" style="color:' + project.accentColor + '"><span style="color:' + project.accentColor + '">\u25B8</span> usage</div>' +
                '<h2 class="section-title"><span class="gradient-text-reverse">Commands</span></h2>' +
              '</div>' +
              '<div class="project-usage-list stagger-children" style="display:grid;grid-template-columns:1fr;gap:1rem;max-width:700px;margin:0 auto">' + usageHtml + '</div>' +
            '</div>' +
          '</section>';
      }
      document.getElementById('project-detail-usage').innerHTML = usageSection;

      // Populate tech stack
      document.getElementById('project-detail-techstack').innerHTML =
        '<div class="section-divider"></div>' +
        '<section style="background:linear-gradient(180deg,#040617 0%,#060918 100%)">' +
          '<div class="section-container">' +
            '<div class="section-header reveal">' +
              '<div class="section-label" style="color:' + project.accentColor + '"><span style="color:' + project.accentColor + '">\u25B8</span> tech stack</div>' +
              '<h2 class="section-title"><span class="gradient-text">Built With</span></h2>' +
            '</div>' +
            '<div class="tech-grid stagger-children" style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;max-width:800px;margin:0 auto">' + techBadges + '</div>' +
          '</div>' +
        '</section>';

      // Populate footer
      document.getElementById('project-detail-footer').innerHTML =
        '<div class="section-divider"></div>' +
        '<footer class="footer-section" style="border-top:1px solid var(--glass-border);background:rgba(3,3,17,0.95)">' +
          '<div style="max-width:80rem;margin:0 auto;padding:4rem 1.5rem;text-align:center">' +
            '<div style="font-family:Climate Crisis,serif;font-size:1.2rem;background:' + project.gradient + ';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0.5;margin-bottom:1rem">\u25B7\u300E ' + project.name + ' \u300F\u25C0</div>' +
            '<p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:1.5rem">built by <span style="color:' + project.accentColor + '">notlousybook</span> with love and way too much caffeine</p>' +
            '<div style="display:flex;align-items:center;justify-content:center;gap:1rem">' +
              '<button class="btn-secondary magnetic-btn" onclick="hideProjectDetail()">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to All Projects' +
              '</button>' +
              '<a href="' + project.url + '" target="_blank" rel="noopener noreferrer" class="btn-primary magnetic-btn">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> GitHub' +
              '</a>' +
            '</div>' +
          '</div>' +
        '</footer>';

      // Show back button in nav
      var backBtn = document.getElementById('nav-back-btn');
      if (backBtn) backBtn.style.display = 'inline-flex';

      // Setup scroll reveal for new elements
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      projectDetailPage.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children')
        .forEach(function (el) { revealObserver.observe(el); });

      // Re-init magnetic buttons in detail page
      setupMagneticButtons();

      if (overlay) setTimeout(function () { overlay.classList.remove('active'); }, 100);
    }, 400);
  };

  window.hideProjectDetail = function hideProjectDetail() {
    var overlay = document.getElementById('page-transition-overlay');
    if (overlay) overlay.classList.add('active');

    setTimeout(function () {
      projectDetailPage.style.display = 'none';
      mainContent.style.display = 'block';
      isProjectDetailActive = false;

      window.scrollTo({ top: 0 });

      // Hide nav back button
      var backBtn = document.getElementById('nav-back-btn');
      if (backBtn) backBtn.style.display = 'none';

      if (overlay) setTimeout(function () { overlay.classList.remove('active'); }, 100);
    }, 400);
  };


  /* ============================================================
     10. MAGNETIC BUTTONS
     ============================================================ */

  function setupMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(function (btn) {
      if (btn._magneticSetup) return;
      btn._magneticSetup = true;

      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
      });
      btn.addEventListener('mouseenter', function () {
        btn.style.transition = 'transform 0.1s ease';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }
  setupMagneticButtons();

  // MutationObserver for dynamically added buttons
  var magneticObserver = new MutationObserver(setupMagneticButtons);
  magneticObserver.observe(document.body, { childList: true, subtree: true });


  /* ============================================================
     11. MOBILE NAV TOGGLE
     ============================================================ */

  (function initMobileNav() {
    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    var isOpen = false;
    btn.addEventListener('click', function () {
      isOpen = !isOpen;
      menu.style.maxHeight = isOpen ? menu.scrollHeight + 'px' : '0';
    });

    // Close menu and smooth-scroll on link click
    menu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        isOpen = false;
        menu.style.maxHeight = '0';
        var href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          var target = document.querySelector(href);
          if (target) {
            setTimeout(function () {
              target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }
      });
    });
  })();


  /* ============================================================
     12. NAVIGATION — Active section tracking
     ============================================================ */

  (function initNavTracking() {
    var nav = document.getElementById('main-nav');
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('#desktop-nav .nav-link');

    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;

      // Scrolled state
      if (nav) {
        if (scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }

      // Active section
      if (isProjectDetailActive) return;
      sections.forEach(function (section) {
        var top = section.offsetTop - 150;
        var bottom = top + section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          var id = section.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { passive: true });
  })();


  /* ============================================================
     13. PAGE TRANSITIONS (handled in show/hideProjectDetail above)
     ============================================================ */

  // Page transition is integrated into showProjectDetail/hideProjectDetail functions above.


  /* ============================================================
     14. HERO ENTRANCE ANIMATION
     ============================================================ */

  (function initHeroEntrance() {
    var heroContent = document.getElementById('hero-content');
    if (!heroContent) return;

    // Set initial state
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';

    // Trigger animation after 200ms
    setTimeout(function () {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 200);
  })();

});
