const ICONS = {
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
  size = size || 20;
  var content = ICONS[name];
  if (!content) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
  }
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' + content + '</svg>';
}

/* ============================================================
   CONSOLE EASTER EGG
   ============================================================ */
(function () {
  var styles = [
    'font-size: 20px; font-weight: 800; color: oklch(0.78 0.18 175)',
    'font-size: 13px; color: oklch(0.52 0.025 185)',
  ];
  console.log('%cnotlousybook%c\ndumb ahh dev from pluto. vibe coded with code && ramen.', styles[0], styles[1]);
  console.log('%clike what you see? dm on discordd @notlousybook — dumb ahh 15 yr old dev', 'font-size: 12px; color: oklch(0.52 0.025 185)');
})();

document.addEventListener('DOMContentLoaded', function () {

  var statsRow = document.getElementById('project-stats-row');
  if (statsRow) {
    statsRow.innerHTML = SITE_CONFIG.projectStats.map(function (stat) {
      return '<div class="stat-card">' +
        '<div class="stat-icon">' + getIcon(stat.icon, 20) + '</div>' +
        '<div class="stat-value" data-target="' + stat.target + '">' +
          (typeof stat.target === 'string' ? stat.target : '0') +
        '</div>' +
        '<div class="stat-label">' + stat.label + '</div>' +
      '</div>';
    }).join('');
  }

  var projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = SITE_CONFIG.projects.map(function (p, i) {
      var statusColors = { Stable: '#00f5d4', Active: '#60a5fa', Alpha: '#fbbf24' };
      var sc = statusColors[p.status] || '#9fb0bb';
      return '<div class="project-card reveal" style="transition-delay:' + (i * 0.08) + 's" data-slug="' + p.slug + '">' +
        '<div class="project-card-header">' +
          '<div class="project-icon" style="background:' + p.accentColor + '15;color:' + p.accentColor + '">' +
            getIcon(p.icon, 20) +
          '</div>' +
          '<span class="project-status" style="background:' + sc + '15;color:' + sc + '">' + p.status + '</span>' +
        '</div>' +
        '<h3 class="project-name">' + p.name + '</h3>' +
        '<p class="project-desc">' + p.description + '</p>' +
        '<div class="project-meta">' +
          (p.stars > 0 ? '<div class="project-meta-item"><svg width="13" height="13" viewBox="0 0 16 16" fill="#fbbf24"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg> ' + p.stars + '</div>' : '') +
          (p.forks > 0 ? '<div class="project-meta-item"><svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878Zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm3-8.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/></svg> ' + p.forks + '</div>' : '') +
          (p.language ? '<div class="project-lang"><span class="project-lang-dot" style="background:' + p.langColor + '"></span> ' + p.language + '</div>' : '') +
        '</div>' +
      '</div>';
    }).join('');
  }

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

  var aboutStatsGrid = document.getElementById('about-stats-grid');
  if (aboutStatsGrid) {
    aboutStatsGrid.innerHTML = SITE_CONFIG.aboutStats.map(function (stat) {
      return '<div class="about-stat-card">' +
        '<div class="about-stat-icon">' + getIcon(stat.icon, 22) + '</div>' +
        '<div class="about-stat-value">' + stat.value + '</div>' +
        '<div class="about-stat-label">' + stat.label + '</div>' +
      '</div>';
    }).join('');
  }

  var techGrid = document.getElementById('tech-grid');
  if (techGrid) {
    techGrid.innerHTML = SITE_CONFIG.techStack.map(function (tech) {
      return '<div class="tech-badge">' +
        '<span class="tech-badge-icon">' + getIcon(tech.icon, 16) + '</span>' +
        tech.name +
      '</div>';
    }).join('');
  }

  var collabGrid = document.getElementById('collab-grid');
  if (collabGrid) {
    collabGrid.innerHTML = SITE_CONFIG.collabCards.map(function (card) {
      return '<div class="collab-card">' +
        '<div class="collab-card-icon" style="color:' + card.iconColor + '">' +
          getIcon(card.icon, 22) +
        '</div>' +
        '<h3 class="collab-card-title">' + card.title + '</h3>' +
        '<p class="collab-card-desc">' + card.desc + '</p>' +
      '</div>';
    }).join('');
  }

  var footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();


  /* ============================================================
     THREE.JS PARTICLES
     ============================================================ */

  (function initParticles() {
    var container = document.getElementById('particle-canvas');
    if (!container || typeof THREE === 'undefined') return;

    var width = container.clientWidth;
    var height = container.clientHeight;
    var mouseX = 0, mouseY = 0;
    var frameId;

    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030311, 0.08);

    var camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    var count = 400;
    var positions = new Float32Array(count * 3);
    var colors = new Float32Array(count * 3);
    var sizes = new Float32Array(count);
    var velocities = new Float32Array(count * 3);

    var accent = new THREE.Color(0x00f5d4);
    var muted = new THREE.Color(0x2a5a5a);

    for (var i = 0; i < count; i++) {
      var i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 14;
      positions[i3 + 2] = (Math.random() - 0.5) * 14;

      velocities[i3] = (Math.random() - 0.5) * 0.004;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;

      var color = i % 3 === 0 ? accent.clone() : muted.clone().lerp(accent, Math.random() * 0.3);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2.5 + 0.5;
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
        'uniform float uPixelRatio;',
        'void main() {',
        '  vColor = color;',
        '  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);',
        '  gl_PointSize = size * uPixelRatio * (5.0 / -mvPosition.z);',
        '  gl_PointSize = max(gl_PointSize, 1.0);',
        '  gl_Position = projectionMatrix * mvPosition;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec3 vColor;',
        'void main() {',
        '  float d = length(gl_PointCoord - vec2(0.5));',
        '  if (d > 0.5) discard;',
        '  float glow = 1.0 - smoothstep(0.0, 0.5, d);',
        '  gl_FragColor = vec4(vColor, glow * 0.5);',
        '}'
      ].join('\n'),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    var particles = new THREE.Points(geometry, material);
    scene.add(particles);

    container.addEventListener('mousemove', function (e) {
      var rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    function animate() {
      var posArr = geometry.attributes.position.array;
      var time = Date.now() * 0.0003;

      for (var k = 0; k < posArr.length; k += 3) {
        posArr[k] += velocities[k] + Math.sin(time + posArr[k + 1] * 0.5) * 0.002;
        posArr[k + 1] += velocities[k + 1] + Math.cos(time + posArr[k] * 0.5) * 0.002;
        posArr[k + 2] += velocities[k + 2] + Math.sin(time + posArr[k] * 0.3) * 0.001;

        var dx = posArr[k] - mouseX * 5;
        var dy = posArr[k + 1] - mouseY * 5;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3) {
          var force = (3 - dist) * 0.003;
          posArr[k] += dx * force;
          posArr[k + 1] += dy * force;
        }

        if (posArr[k] > 10) posArr[k] = -10;
        if (posArr[k] < -10) posArr[k] = 10;
        if (posArr[k + 1] > 7) posArr[k + 1] = -7;
        if (posArr[k + 1] < -7) posArr[k + 1] = 7;
      }

      geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.04;
      particles.rotation.x = Math.sin(time * 0.3) * 0.015;

      material.uniforms.uTime.value = Date.now() * 0.001;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

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
     TYPEWRITER
     ============================================================ */

  (function initTypewriter() {
    var el = document.getElementById('typewriter-text');
    if (!el) return;
    var texts = SITE_CONFIG.hero.typewriterTexts;
    var idx = 0, charIdx = 0, deleting = false;

    function tick() {
      var current = texts[idx];
      if (!deleting) {
        charIdx++;
        el.textContent = current.substring(0, charIdx);
        if (charIdx === current.length) {
          setTimeout(function () { deleting = true; tick(); }, 2000);
          return;
        }
        setTimeout(tick, 80);
      } else {
        charIdx--;
        el.textContent = current.substring(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          idx = (idx + 1) % texts.length;
          setTimeout(tick, 80);
          return;
        }
        setTimeout(tick, 30);
      }
    }
    tick();
  })();


  /* ============================================================
     SCROLL REVEAL
     ============================================================ */

  (function initScrollReveal() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children')
      .forEach(function (el) { observer.observe(el); });
  })();


  /* ============================================================
     COUNTERS
     ============================================================ */

  (function initCounters() {
    var counters = document.querySelectorAll('.stat-value[data-target]');
    counters.forEach(function (el) {
      var targetStr = el.getAttribute('data-target');
      if (!targetStr) return;
      var counted = false;

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            var target = Number(targetStr);
            if (isNaN(target)) return;
            var duration = 1200;
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
     PROJECT CARD CLICK
     ============================================================ */

  document.addEventListener('click', function (e) {
    var card = e.target.closest('.project-card');
    if (card && card.dataset.slug) {
      showProjectDetail(card.dataset.slug);
    }
  });


  /* ============================================================
     PROJECT DETAIL PAGE
     ============================================================ */

  var mainContent = document.getElementById('main-content');
  var projectDetailPage = document.getElementById('project-detail-page');
  var isProjectDetailActive = false;

  window.showProjectDetail = function (slug) {
    var project = SITE_CONFIG.projects.find(function (p) { return p.slug === slug; });
    if (!project) return;

    if (document.startViewTransition) {
      document.startViewTransition(function () {
        mainContent.style.display = 'none';
        projectDetailPage.style.display = 'block';
        isProjectDetailActive = true;
        renderProjectDetail(project);
        window.scrollTo({ top: 0 });
      });
      return;
    }

    var overlay = document.getElementById('page-transition-overlay');
    if (overlay) overlay.classList.add('active');

    setTimeout(function () {
      mainContent.style.display = 'none';
      projectDetailPage.style.display = 'block';
      isProjectDetailActive = true;
      renderProjectDetail(project);

      window.scrollTo({ top: 0 });

      if (overlay) setTimeout(function () { overlay.classList.remove('active'); }, 100);
    }, 400);
  };

  function renderProjectDetail(project) {
    var statusColors = {
      Stable: { bg: 'rgba(0,245,212,0.12)', text: '#00f5d4' },
      Active: { bg: 'rgba(96,165,250,0.12)', text: '#60a5fa' },
      Alpha: { bg: 'rgba(251,191,36,0.12)', text: '#fbbf24' },
    };
    var sc = statusColors[project.status] || { bg: 'rgba(159,176,187,0.12)', text: '#9fb0bb' };

    var featuresHtml = project.features.map(function (f) {
        return '<div class="project-feature-card">' +
          '<div class="project-feature-icon" style="background:' + project.accentColor + '15;color:' + project.accentColor + '">' +
            getIcon(f.icon, 18) +
          '</div>' +
          '<h4 class="project-feature-title">' + f.title + '</h4>' +
          '<p class="project-feature-desc">' + f.description + '</p>' +
        '</div>';
      }).join('');

      var installCmdsHtml = project.installCommands.map(function (cmd) {
        return cmd.startsWith('#')
          ? '<span style="color:var(--text-muted)">' + cmd + '</span>\n'
          : '<span>$ ' + cmd + '</span>\n';
      }).join('');

      var usageHtml = project.usageCommands.map(function (uc) {
        return '<div class="project-feature-card">' +
          '<div style="font-family:monospace;font-size:0.9rem;color:var(--accent);margin-bottom:4px">$ ' + uc.command + '</div>' +
          '<p style="font-size:0.85rem;color:var(--text-muted)">' + uc.description + '</p>' +
        '</div>';
      }).join('');

      var statsHtml = [
        { label: 'Stars', value: project.stars },
        { label: 'Forks', value: project.forks },
        { label: 'Language', value: project.language },
        { label: 'Status', value: project.status },
      ].map(function (s) {
        return '<div class="project-detail-meta-item">' +
          '<div class="project-detail-meta-value" style="color:' + project.accentColor + '">' + s.value + '</div>' +
          '<div class="project-detail-meta-label">' + s.label + '</div>' +
        '</div>';
      }).join('');

      document.getElementById('project-detail-content').innerHTML =
        '<button class="project-back-btn" onclick="hideProjectDetail()">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back' +
        '</button>' +
        '<h1 class="project-detail-title">' + project.name + '</h1>' +
        '<p class="project-detail-tagline">' + project.tagline + '</p>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:24px">' +
          '<span class="project-status" style="background:' + sc.bg + ';color:' + sc.text + '">' + project.status + '</span>' +
        '</div>' +
        '<div class="project-detail-meta">' + statsHtml + '</div>' +
        '<div style="margin-top:32px">' +
          '<a href="' + project.url + '" target="_blank" rel="noopener noreferrer" class="btn-primary">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> View on GitHub' +
          '</a>' +
        '</div>';

      document.getElementById('project-detail-overview').innerHTML =
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.8">' + project.longDescription + '</p>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:16px">' +
          project.tags.map(function (tag) {
            return '<span class="tech-badge" style="font-size:0.78rem;padding:4px 12px;cursor:default">' + tag + '</span>';
          }).join('') +
        '</div>';

      document.getElementById('project-detail-features').innerHTML =
        '<h3>Features</h3>' +
        '<div class="project-features-grid">' + featuresHtml + '</div>';

      document.getElementById('project-detail-installation').innerHTML =
        '<h3>Installation</h3>' +
        '<div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:20px;font-family:monospace;font-size:0.9rem;line-height:1.8;overflow-x:auto"><pre style="margin:0;color:var(--text-primary)">' + installCmdsHtml + '</pre></div>';

      document.getElementById('project-detail-usage').innerHTML =
        (usageHtml ? '<h3>Usage</h3><div style="display:grid;gap:12px">' + usageHtml + '</div>' : '');
  }

  window.hideProjectDetail = function () {
    if (document.startViewTransition) {
      document.startViewTransition(function () {
        projectDetailPage.style.display = 'none';
        mainContent.style.display = 'block';
        isProjectDetailActive = false;
        window.scrollTo({ top: 0 });
      });
      return;
    }

    var overlay = document.getElementById('page-transition-overlay');
    if (overlay) overlay.classList.add('active');

    setTimeout(function () {
      projectDetailPage.style.display = 'none';
      mainContent.style.display = 'block';
      isProjectDetailActive = false;
      window.scrollTo({ top: 0 });
      if (overlay) setTimeout(function () { overlay.classList.remove('active'); }, 100);
    }, 400);
  };


  /* ============================================================
     MOBILE NAV
     ============================================================ */

  (function initMobileNav() {
    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', menu.classList.contains('open'));
    });

    document.addEventListener('click', function (e) {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  })();


  /* ============================================================
     NAV TRACKING
     ============================================================ */

  (function initNavTracking() {
    var nav = document.getElementById('main-nav');
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('#desktop-nav a');

    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      if (nav) {
        nav.classList.toggle('scrolled', scrollY > 50);
      }
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
     HERO ENTRANCE
     ============================================================ */

  (function initHeroEntrance() {
    var heroContent = document.getElementById('hero-content');
    if (!heroContent) return;
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(28px)';
    heroContent.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(function () {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  })();


  /* ============================================================
     CURSOR GLOW
     ============================================================ */

  (function initCursorGlow() {
    var glow = document.getElementById('cursor-glow');
    if (!glow) return;
    var raf = null;

    document.addEventListener('mousemove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var x = e.clientX;
        var y = e.clientY;
        glow.style.transform = 'translate(' + (x - 150) + 'px, ' + (y - 150) + 'px)';
        raf = null;
      });
    });

    document.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function () {
      glow.style.opacity = '1';
    });
  })();


  /* ============================================================
     KEYBOARD SHORTCUT
     ============================================================ */

  (function initKeyboard() {
    document.addEventListener('keydown', function (e) {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        console.log('%cnotlousybook keyboard shortcuts:', 'font-weight: 700');
        console.log('  ?  %cshow this help', 'color: oklch(0.52 0.025 185)');
      }
    });
  })();

});
