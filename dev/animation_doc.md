# 🎬 Codegrid GSAP + Next.js Animation Bible
### Complete Breakdown of 29 Tutorials from the Codegrid YouTube Playlist

## Table of Contents
1. [Scale Wipe Transition (Framer Motion)](#v1) | 2. [Sticky Card Stack Mask & Parallax](#v2) | 3. [Direction-Aware Grid Hover](#v3)
4. [Scroll Page Transition (Dynamic Routes)](#v4) | 5. [Scroll Expanding Project Grid](#v5) | 5b. [SVG Stroke Transitions](#v5b)
6. [Parallax Image Scroll (Lenis)](#v6) | 7. [Clip-Path View Transitions](#v7) | 8. [Multi-Phase Scroll Sequence](#v8)
9. [Card/Text Reveal (Lenis)](#v9) | 10. [Block Wipe + Logo Stroke](#v10) | 11. [Reusable Block Reveal Text](#v11)
12. [3D Image Gallery (Three.js)](#v12) | 13. [School/Slide View Transition](#v13) | 14. [Vinyl Player Text (SVG Path)](#v14)
15. [Reusable Text Line Reveal](#v15) | 16. [Sticky Card Stack Overlay Fade](#v16) | 17. [Section Tilt & Pin Scroll](#v17)
18. [3D Floating Card Spread & Flip](#v18) | 19. [Animated Header (3 Modes)](#v19) | 20. [Image Trail Clip-Path Masking](#v20)
21. [Neon Text Color Sweep](#v21) | 22. [Sticky Card Stacking & Pin](#v22) | 23. [3D Video Carousel (CSS 3D)](#v23)
24. [Footer Image Explosion (Physics)](#v24) | 25. [Block Pixelate Transition](#v25) | 26. [Full-Screen Nav Overlay](#v26)
27. [Dynamic Hover Displacement (Shaders)](#v27) | 28. [Clock Hand Rotation Reveals](#v28)

---

<a name="v1"></a>
## 1. Next.js Page Transitions with Framer Motion (Scale Wipe)
**The Effect:** A full-screen theater-curtain wipe. A dark overlay scales up from the bottom, the new page appears, and the overlay scales away to the top.
**Methods Used:** Framer Motion (`AnimatePresence`, `motion.div`, `scaleY`, `initial`, `animate`, `exit`, `transition`). *Note: No GSAP.*
**Configuration:** `AnimatePresence` in `_app.js` with `mode="wait"`. Re-renders triggered by `useRouter()` key.
**CSS Animated:** `scaleY`, `transform-origin` (bottom for slide-in, top for slide-out), `position: absolute` (full vh/vw).
**Structure:** `_app.js` (wrapper), `components/Page.js` (layout), `pages/index/about/contact.js` (routes), `Header.js` (persistent nav).
**Key Techniques:**
- `AnimatePresence` with `mode="wait"` forces the old page to animate out completely before the new page mounts.
- `useRouter()` generates unique keys so Framer detects route changes.
- Opposing `transform-origin` creates the seamless up-and-away motion.
**Parameters:** Duration: 0.5s | Ease: `[0.76, 0, 0.24, 1]` | `scaleY`: 0→1 (enter), 1→0 (exit).
**Logic Flow:**
1. Setup Pages router project.
2. Setup `_app.js` with `useRouter` key tracking.
3. Wrap app in `AnimatePresence mode="wait"`.
4. Create two `motion.div` overlays with opposing `transform-origin`.
5. Apply `scaleY` transitions.
6. Style overlays as dark, absolute viewports.
7. Render persistent `Header` outside the transition block.

<a name="v2"></a>
## 2. Sticky Card Stack with Clipping Mask & Parallax
**The Effect:** Cards reveal via clipping mask on scroll. Outgoing cards scale down/rotate while their inner image zooms (parallax). Next card slides up.
**Methods Used:** `gsap.timeline()` (ScrollTrigger), `gsap.to()`, `gsap.set()`, `ScrollTrigger.create()`, `gsap.useGSAP()`.
**ScrollTrigger:** **Trigger:** Sticky section | **Start:** `"top top"` | **End:** `window.innerHeight * (totalCards - 1)` | **Pin:** `true` | **Scrub:** `0.5`.
**CSS Animated:** Card `y` (100%→0%), Card `scale` (1→0.5), Card `rotation` (slight 3D tilt), Inner Image `scale` (1→1.5).
**Structure:** Next.js single page (`use client`). Section with 5 absolute-positioned stacked cards. Wrapped in `ReactLenis`.
**Key Techniques:**
- **Timeline position labels:** Keeps parallel animations per-card perfectly synced.
- **For-loop generation:** Automates the current+next card timeline sequence.
- **Inner Parallax:** Scaling the nested image differently than the parent card creates depth.
- **Dynamic End:** Scroll runway calculated purely by dataset length.
**Parameters:** Card `scale`: 1→0.5 | Card `rotation`: slight var | Image `scale`: 1→1.5 | Next Card `y`: 100%→0% | Scrub: 0.5.
**Logic Flow:**
1. Build Next.js structure: intro, card section, outro.
2. Style cards absolute, stacked, overflow hidden.
3. Init `ReactLenis` smooth scrolling.
4. Scope `useGSAP` to section container.
5. Set initial card states (Card 1: y:0, scale:1; Others: y:100%).
6. Create master pinned timeline linked to ScrollTrigger.
7. Loop through cards to append scale (current), zoom (image), and slide-up (next) simultaneously.

<a name="v3"></a>
## 3. Direction-Aware Grid Hover Highlight
**The Effect:** A white highlight rectangle smoothly glides across grid items following the cursor, adapting its size to the hovered cell and adopting a custom background color defined by that specific cell.
**Methods Used:** Pure JavaScript DOM manipulation (`getBoundingClientRect()`, `elementFromPoint()`, CSS `transition`). *Note: No GSAP.*
**CSS Animated:** `transform: translate(X, Y)`, `width`, `height`, `background-color`, `position: absolute`, `pointer-events: none`.
**Structure:** Single page (`use client`); Grid container with 2 flexbox rows of items; 1 absolute highlight div.
**Key Techniques:**
- `elementFromPoint()` grabs the exact DOM node under the cursor in real-time.
- Mathematical offset: Subtracting container bounds from item bounds calculates exact `translate` coordinates.
- `data-color` attribute on HTML items dynamically drives highlight styling.
- Hidden on mobile views.
**Logic Flow:**
1. Build flexbox grid and position an absolute highlight div over it.
2. In `useEffect`, map `data-color` attributes to grid items.
3. Build coordinate math helper using `getBoundingClientRect()`.
4. Create `moveHighlight()` driven by `mousemove` and `elementFromPoint()`.
5. Apply default position to the first grid cell on load.
6. Clean up event listeners on unmount.

<a name="v4"></a>
## 4. Scroll-Driven Page Transition with Dynamic Routes
**The Effect:** Scrolling to the bottom of a project pins the footer; further scrolling triggers a dynamic route change to the next project. The new page loads with the navbar and content seamlessly sliding/fading in.
**Methods Used:** `gsap.to()`, `gsap.fromTo()`, `ScrollTrigger.create()` (pin/scrub/onUpdate), `gsap.set()`.
**ScrollTrigger:** **Trigger:** Footer | **Start:** `"top top"` | **End:** Extended padding | **Pin:** `true` | Navbar scrub linked to page scroll progress.
**CSS Animated:** `scaleX` (nav progress bar), `x` (-100%→0% nav slide), `y` (bottom reveal), `height` (footer scroll extension).
**Structure:** `projects/[slug]/page.jsx` (Server: resolves data/circular linking) | `projects/[slug]/project-client.jsx` (Client: GSAP logic).
**Key Techniques:**
- **Server/Client Split:** Isolates Next.js routing logic from GSAP hooks, avoiding hydration mismatch.
- **Circular Navigation:** First links to last, last links to first.
- **Footer Runway:** Footer CSS height is manually extended to create scroll space *after* hitting the bottom to trigger the route push.
**Logic Flow:**
1. Setup dynamic routes with dummy project JSON.
2. Split server (data resolution) and client (animations).
3. Mount client: `gsap.fromTo()` slides navbar in.
4. Create ScrollTrigger to drive the navbar progress indicator via CSS variables.
5. Pin footer and monitor over-scroll; trigger `router.push()` to next project on threshold limit.

<a name="v5"></a>
## 5. Scroll-Driven Expanding Project Grid
**The Effect:** Grid rows start compressed (125% width) and expand outward to 500% as you scroll down, creating a beautiful cascading wave of project cards.
**Methods Used:** `gsap.ticker.add()`, `gsap.ticker.remove()`, `gsap.set()`. *Note: Custom math used instead of ScrollTrigger.*
**CSS Animated:** Inline `width` (125%→500% desktop, 250%→750% mobile). No CSS transitions used.
**Structure:** Client component generating 10 rows of 9 cards dynamically via arrays. Refs mapped to all rows.
**Key Techniques:**
- **GSAP Ticker over ScrollTrigger:** Updates width linearly based on precise per-frame viewport intersection math.
- **Lenis Sync:** Smooth scroll perfectly locked to GSAP's ~60fps ticker loop.
- **Dynamic Pre-Measurement:** Temporarily forces row 1 to max width, measures `offsetHeight`, sets section container height, then resets.
**Parameters:** Bounds: viewport entry to exit. Interpolation: Linear.
**Logic Flow:**
1. Generate massive nested grid layout.
2. Initialize Lenis synced to `gsap.ticker`.
3. On load, temporarily expand grid to calculate total required scroll height.
4. Define `onScrollUpdate()` checking every row's bounding rect against viewport.
5. Compute 0-1 progress per row; map to width values; apply directly as inline style.
6. Bind function to ticker; add window resize recalculations.

<a name="v5b"></a>
## 5b. SVG Stroke Page Transitions (Next Transition Router)
**The Effect:** Organic, hand-drawn SVG bezier strokes fill the screen to cover the old route, draw forward to reveal the new route, followed by a logo lock-in.
**Methods Used:** Next Transition Router (`leave`/`enter`), `gsap.timeline()`, `gsap.to()`, `gsap.set()`, SVG `getTotalLength()`.
**CSS Animated:** `stroke-dashoffset` (visibility), `stroke-width` (200→700 fill), `fill` (logo opacity).
**Structure:** `TransitionProvider.jsx` wrapping layout. SVG overlays (2 bezier paths + 1 logo path). Logo uses `forwardRef`.
**Key Techniques:**
- **SVG Dashoffset:** Reads exact path length on mount. Sets array/offset to this max value (hidden).
- **Forward Drawing (Negative Offset):** During `enter`, animates dashoffset to *negative* max length so the stroke continues moving forward off-screen rather than rewinding.
- **CSS Fallback:** Large max-values set in pure CSS prevents initial flashes of un-animated SVG.
**Parameters:** Stroke Width: 200→700 (cover) / 700→200 (reveal).
**Logic Flow:**
1. Wrap app in Transition Router provider.
2. Build full-screen SVG overlays with default large stroke values.
3. On load, read exact `getTotalLength()` of all paths.
4. Leave Timeline: Dashoffset→0, Width→700. Trigger `next()`.
5. Enter Timeline: Dashoffset→(Negative Length), Width→200.
6. Reset offset to positive for subsequent navigations.

<a name="v6"></a>
## 6. Parallax Image Scroll with Lenis
**The Effect:** Background images move at a slightly different vertical speed than page content, creating smooth depth.
**Methods Used:** Pure JS (`requestAnimationFrame`, linear interpolation), `useLenis()` hook. *Note: No GSAP.*
**CSS Animated:** `transform: translateY(value) scale(1.25)`, `will-change: transform`.
**Structure:** Reusable `<ParallaxImage>` component replacing all `<img>` tags inside overflow-hidden sections.
**Key Techniques:**
- **Lerp (Linear Interpolation):** Current position smoothly chases target position on every frame, eliminating scroll jitter.
- **Absolute Viewport Mapping:** Adds `scrollY` to `getBoundingClientRect().top` to track image bounds reliably.
- **Lenis Event Hook:** Updates target translation value in real-time off smooth-scroll coordinates.
**Logic Flow:**
1. Build reusable component initialized at `scale(1.25)` to prevent edge cropping.
2. In `useEffect`, map image bounds relative to total document height.
3. Build continuous `animate()` loop running a `lerp()` math function on `translateY`.
4. Capture Lenis scroll events to calculate the active target relative to scroll depth.
5. Recalculate bounds on window resize.

<a name="v7"></a>
## 7. Clip-Path Page Transitions with View Transition API
**The Effect:** The new page glides up from the bottom via an expanding clip-path rectangle; the old page fades/slides upward. A dark curtain drops at the end to seal it.
**Methods Used:** Web Animations API, View Transition API (`next-view-transitions`), `useGSAP()`, `gsap.to()`, `CustomEase`.
**CSS Animated:** `clip-path: inset()` (new page), `opacity` (to 0.2), `transform: translateY(-35%)` (old page), `scaleY` (curtain).
**Structure:** `next-view-transitions` layout wrapper, reusable `useRevealer` GSAP hook, CSS pseudo-element overrides (`::view-transition-*`).
**Key Techniques:**
- **Two-Phase Architecture:** View Transition handles the DOM swap (clip-path); GSAP handles the secondary curtain lift.
- **Z-Index Layering Override:** Forced CSS (`z-index: 10000` on `new`, `1` on `old`) ensures proper visual stacking.
- **Event Interception:** `handleNavigation()` checks if target equals current route to prevent redundant ghost animations.
**Parameters:** Curtain `scaleY`: 1→0 | Curtain Delay: 1s (waits for clip-path) | Ease: Custom cubic-bezier.
**Logic Flow:**
1. Add fixed dark `.revealer` curtain to all pages.
2. Build custom `useRevealer` hook to trigger GSAP `scaleY: 0` with a 1-sec delay.
3. Setup `next-view-transitions` router; bind clip-path animation to link clicks using native API.
4. Override View Transition pseudo-element CSS to disable default crossfades and fix stacking context.

<a name="v8"></a>
## 8. Multi-Phase Scroll Sequence (Parallax + Mask + Grid + Markers)
**The Effect:** Immersive scrubbing experience: 1) Parallax scroll, 2) SVG mask closes, image desaturates, grid overlays, 3) Location markers pop up, 4) Complete reversal.
**Methods Used:** `ScrollTrigger.create()` (onUpdate), `gsap.set()`, `gsap.useGSAP()`, Manual Easing Function.
**ScrollTrigger:** **Trigger:** Hero | **Start:** `"top top"` | **End:** Custom extended | **Pin:** `true` (with spacing) | **Scrub:** Small value.
**CSS Animated:** `translateY` (parallax), `scale` (SVG mask), `filter: saturate`, `opacity` (overlays/markers), CSS `--progress` variable.
**Structure:** Single component. Stacked absolute layers (Image, SVG Mask, Grid, Markers, Content). `ReactLenis` wrapper.
**Key Techniques:**
- **Single Master Progress Value:** The `self.progress` variable (0-1) from ScrollTrigger acts as the solitary clock driving all 6 parallel animations.
- **Phase Mapping:** Progress is segmented mathematically (e.g., parallax from 0–0.3, mask from 0.3–0.7).
- **Custom Mathematical Easing:** Re-shapes linear scroll progress into smooth deceleration curves without using GSAP's timeline logic.
- **CSS Variable Injection:** Progress drives a raw CSS property to fill a visual side-bar.
**Parameters:** Mask `scale`: 1→0.5→1 | Saturation: 100%→0%→100% | Marker opacity: staggered windows.
**Logic Flow:**
1. Stack all layers absolutely with correct z-indexes.
2. Calculate total travel constraints based on DOM heights.
3. Define custom math ease function.
4. Create pinned ScrollTrigger running `onUpdate`.
5. Map progress segments to manually trigger `gsap.set()` on translateY, scale, opacity, and saturation.

<a name="v9"></a>
## 9. Scroll-Driven Card/Text Reveal with Lenis
**The Effect:** Cards sweep into the viewport horizontally from opposite sides (rotating as they enter). Text clip-paths up, button fades in.
**Methods Used:** `gsap.utils.toArray()`, `gsap.to()`, `ScrollTrigger` (config objects), `ReactLenis`.
**ScrollTrigger:** **Trigger:** Main Section | **Start:** `"top 25%"` | **Toggle Actions:** `"play reverse play reverse"` (Discrete playback, no scrub).
**CSS Animated:** `x`, `rotation`, `scale`, `y`, `opacity`, `clipPath`.
**Structure:** Dynamic `generateRows()` building pairs of left/right cards. Wrapper divs around text elements for masking.
**Key Techniques:**
- **ToggleActions:** Overrides default play-once behavior, allowing smooth reversing when scrolling back up.
- **Predefined Transformation Arrays:** Hardcoded coordinate/rotation arrays mapped to card indices for organic, non-uniform positioning.
- **Text Clip-Path Divs:** Text sits inside a container with `clip-path` applied, sliding `y` to reveal itself cleanly.
**Parameters:** Logo `scale`: 0→1 | Text `y`: 100%→0 (staggered) | Card values: drawn from array.
**Logic Flow:**
1. Generate dynamic flex rows containing left/right card divs.
2. Initialize Lenis.
3. Map rows via `gsap.utils.toArray()`.
4. Apply discrete ScrollTrigger to trigger `gsap.to()` on left cards (x, rotation) and right cards (x, rotation).
5. Chain text, button, and logo reveals.

<a name="v10"></a>
## 10. Block Wipe Page Transition with Logo Stroke Draw
**The Effect:** 20 vertical blocks wipe screen left-to-right. Logo draws its SVG path, fills, and fades. On the new page, blocks peel right-to-left.
**Methods Used:** `gsap.timeline()`, `gsap.to()`, `gsap.set()`, `getTotalLength()`, `React.forwardRef`. *Note: Custom routing over View Transitions.*
**CSS Animated:** `scaleX`, `transform-origin` (left/right switch), `stroke-dashoffset`, `fill`, `opacity`.
**Structure:** `BaseTransition` wrapper component in layout. Generates 20 block divs via JS. `Logo` component exposes SVG via `forwardRef`.
**Key Techniques:**
- **Link Interception:** Prevents default `<a>` routing to play full out-animation timeline *before* triggering programmatic Next.js router push.
- **Transform-Origin Flipping:** Wiping right (`origin: left`) to cover, then peeling right (`origin: right`) to reveal creates directional momentum.
- **Anti-Spam State:** `isTransitioning` boolean strictly blocks overlapping transitions on rapid clicks.
**Parameters:** Blocks: 20 generated | Stagger: Small/Snappy | Stroke Draw: Long/Deliberate.
**Logic Flow:**
1. Wrap Layout in Transition provider.
2. Intercept nav links to trigger Cover timeline.
3. Setup Cover: Generate 20 blocks, set `origin: left`, scaleX: 0→1 (staggered).
4. Auto-draw Logo stroke via `dashoffset`, fade in fill.
5. Push Next.js route programmatically.
6. Trigger Reveal timeline: Swap to `origin: right`, scaleX: 1→0 (staggered).
7. Clean up states.

<a name="v11"></a>
## 11. Reusable Block Reveal Text Animation Component
**The Effect:** A colored block wipes left-to-right over a text line, making the text visible while covered, then wipes out right-to-left to unveil it.
**Methods Used:** `gsap.timeline()`, `gsap.to()`, `gsap.set()`, `SplitText.create()` (Lines), `ScrollTrigger.create()`, `useGSAP()`.
**ScrollTrigger:** **Trigger:** Container | **Start:** `"top 90%"` | **onEnter:** Play | **onLeaveBack:** Instant pause/snap back (no reverse).
**CSS Animated:** Block `scaleX`, `transform-origin` (left→right swap), Text `opacity`, `background-color`.
**Structure:** Configurable `<Copy>` wrapper component. Props: `onScroll`, `delay`, `blockColor`, `stagger`, `duration`. Uses `data-copy-wrapper` for multi-child check.
**Key Techniques:**
- **Dynamic DOM Injection:** For every text line created by SplitText, the script dynamically builds and injects an absolute block div.
- **Two-Phase Origin Animation:** Phase 1: `scaleX: 1` (`origin: left`). Phase 2: Switch to `origin: right`, `scaleX: 0`.
- **Hybrid Triggering:** Component props conditionally build either a paused ScrollTrigger timeline or an immediate auto-play timeline.
**Parameters:** Block `scaleX`: 0→1→0 | Text opacity snaps to 1 mid-animation.
**Logic Flow:**
1. Build reusable component; check for single/multi-child nodes.
2. Run SplitText (`type: lines`).
3. Loop lines: inject wrapper and block divs.
4. Setup GSAP timeline: Block scale in → Text opacity to 1 → Origin swap → Block scale out.
5. Apply ScrollTrigger or play immediately based on props.
6. Revert SplitText and strip injected DOM elements on unmount.

<a name="v12"></a>
## 12. 3D Interactive Image Gallery (Three.js)
**The Effect:** 30+ images arrayed dynamically on a 3D sphere. Freely rotatable and zoomable via mouse drag.
**Methods Used:** Three.js (Scene, PerspectiveCamera, WebGLRenderer, OrbitControls, TextureLoader). *Note: No GSAP.*
**Structure:** `<Orb>` React component accepting props (radius, total images, dimensions). Renders via standard `requestAnimationFrame` loop.
**Key Techniques:**
- **Spherical Coordinates:** Math converts Phi (vertical) and Theta (horizontal) to evenly distribute flat image planes into a perfect globe.
- **Dynamic Plane Geometry:** Image aspect ratios dictate plane dimensions so wide/tall images don't stretch.
- **LookAt Center:** Every plane automatically rotates to face the exact center of the 3D scene, ensuring they lay flat on the sphere surface.
- **MIP Mapping Disabled:** Texture optimization for rendering 30+ images simultaneously.
**Logic Flow:**
1. Setup WebGL renderer (anti-aliasing, alpha) and Camera.
2. Attach OrbitControls with damping for smooth rotational inertia.
3. Loop dataset to create Image Meshes.
4. Apply spherical coordinate math to place meshes; apply `.lookAt(0,0,0)`.
5. Run 60fps render loop; update aspect ratio on window resize.

<a name="v13"></a>
## 13. School/Slide Page Transition (View Transition API + Lenis)
**The Effect:** Old page fades/slides up, new page reveals bottom-to-top via clip-path. Headings stagger-animate per character, paragraphs per line.
**Methods Used:** View Transition API (`next-view-transitions`), `SplitType`, `gsap.useGSAP()`, `gsap.to()`.
**CSS Animated:** `clip-path: inset()` (new route), `opacity` / `translateY` (old route), text `y` (400px→0), text `opacity`.
**Structure:** ViewTransition layout wrapper; `SplitType` applied to standard H1s and paragraphs on individual pages.
**Key Techniques:**
- **SplitType vs SplitText:** Utilizing `split-type` package specifically to wrap lines/chars in `.line` divs for precise `overflow: hidden` masking.
- **Z-Index Layering Override:** Forced CSS (`z-index: 10000` on `new`, `1` on `old`) ensures proper View Transition stacking.
- **Standard Anchor Support:** Uses standard `<a>` tags with `useTransitionRouter` intercepts.
**Parameters:** Char `y`: 400→0 (1s duration, 1s delay) | Line `y`: 400→0 (2s duration, 2.5s delay).
**Logic Flow:**
1. Wrap app in View Transition context.
2. Apply CSS overrides to View Transition root elements.
3. Setup page logic: SplitType on H1 (chars) and paragraph (lines).
4. Run GSAP `y` transforms on split elements on mount.
5. Revert SplitType on unmount.

<a name="v14"></a>
## 14. Vinyl Player Text Animation (SVG Motion Path)
**The Effect:** Text infinitely orbits a continuously spinning vinyl record, creating a flowing ribbon effect via staggered delays.
**Methods Used:** GSAP Implicit MotionPath (`startOffset`), `gsap.to(repeat: -1)`.
**CSS Animated:** SVG `<textPath>` `startOffset` (0%→100%), Disc `rotation` (360°).
**Structure:** Standalone React component. SVG container matching vinyl dimensions. Uses `<defs>` to map text onto `<path>`.
**Key Techniques:**
- **Implicit Path Tracking:** Instead of GSAP's explicit MotionPath plugin, it manipulates the native SVG `startOffset` attribute.
- **Path Cloning:** Reads visual `<path>` `d` attributes on mount and copies them into `<defs>` references for identical text mapping.
- **Stagger via Infinite Loops:** Three identical text blocks on the same path, given stepped startup delays, naturally follow each other forever.
**Parameters:** Text orbit: 6s, linear ease, repeat -1 | Vinyl spin: 360°, 2s, linear ease, repeat -1.
**Logic Flow:**
1. Build SVGs with precise Bezier curves.
2. Structure HTML with `<path>` elements and `<textPath>` mapping.
3. In GSAP hook, duplicate `d` paths to `<defs>`.
4. Trigger infinite 0→100% `startOffset` tweens.
5. Trigger infinite 360° disc rotation.

<a name="v15"></a>
## 15. Reusable Text Line Reveal Component (SplitText + ScrollTrigger)
**The Effect:** Drop-in wrapper that automatically splits text, applies mask containers, and reveals it line-by-line sliding up on scroll.
**Methods Used:** `SplitText.create()` (`mask: lines`), `gsap.to()`, `gsap.set()`, `ScrollTrigger.create()`.
**ScrollTrigger:** **Trigger:** Container | **Start:** `"top 75%"` | **Once:** `true` (Plays once, no reverse).
**CSS Animated:** Text `.line` `y` (100%→0%). Mask wrappers have `overflow: hidden`.
**Structure:** Reusable `<Copy>` wrapper utilizing `React.cloneElement` to prevent DOM bloat.
**Key Techniques:**
- **React CloneElement:** Instead of wrapping text in a redundant `<div>`, cloning attaches the Ref and classes directly to the native `<h1>` or `<p>`.
- **Text-Indent Preservation:** SplitText natively destroys `text-indent`. The code reads `computedStyle`, deletes the indent, and re-applies it as physical `padding` to line 1.
- **Mask Property:** Utilizing SplitText's built-in `mask: "lines"` to automatically generate the `overflow: hidden` window divs.
**Parameters:** Line `y`: 100%→0 | Duration: 1s | Stagger: 0.1s.
**Logic Flow:**
1. Build component, use `cloneElement` to fetch refs.
2. Check for multi-node wrappers.
3. Pre-read and store `text-indent` CSS.
4. Run SplitText; inject indent back as padding.
5. Set lines hidden (y: 100%).
6. Link `gsap.to()` to ScrollTrigger `once: true`.
7. Revert on unmount.

<a name="v16"></a>
## 16. Advanced Sticky Card Stack with Overlay Fade
**The Effect:** Cards pin on scroll. Instead of fading out, cards scale down, tilt, and a dark shadow layer intensifies to mask them as the next card stacks on top.
**Methods Used:** `ScrollTrigger.create()` (pin), `ScrollTrigger.create()` (onUpdate progress), `gsap.set()`.
**ScrollTrigger:** **Pin Trigger:** Current card (`start: top top`, `end: Last card`, `pinSpacing: false`) | **Anim Trigger:** *Next* card (`onUpdate` progress tracker).
**CSS Animated:** `scale` (1→0.75), `rotation` (alternating tilt), CSS Variable `--overlay-opacity`.
**Structure:** `<StickyCards>` folder. Mapped array of card elements containing an `::after` pseudo-element for the dark shadow.
**Key Techniques:**
- **Pseudo-Element Shading:** Decreasing actual card opacity shows underlying cards (breaking illusion). Instead, a dark `::after` layer's opacity is increased via CSS variable.
- **Split Triggers:** The pin is triggered by the *current* card. The animation is triggered by the *next* card arriving over it.
- **Alternating Math:** Odd/Even index checks apply alternating CW/CCW rotations for a messy stacked look.
- **Terminal Exception:** The final card in the array never receives a pin trigger.
**Logic Flow:**
1. Map cards array. Add CSS variable to control pseudo-overlay.
2. In GSAP hook, map all cards except the final one.
3. Apply standard Pin ScrollTrigger to current element.
4. Apply onUpdate ScrollTrigger to next element.
5. Pipe progress directly into `scale`, `rotation`, and `--overlay-opacity` via `gsap.set()`.

<a name="v17"></a>
## 17. Section Tilt & Pin Scroll Experience
**The Effect:** Sections enter tilted, straighten out as you scroll, and pin in place to let the next section slide over. Smart pinning waits for tall content to fully scroll before pinning.
**Methods Used:** `gsap.to()`, `ScrollTrigger.create()` (Tilt scrub), `ScrollTrigger.create()` (Pin).
**ScrollTrigger:** **Tilt Trigger:** Section (`scrub: true`, `ease: "none"`) | **Pin Trigger:** Section (`start: bottom bottom`, `pinSpacing: false`).
**CSS Animated:** `rotation`, `transform-origin: bottom left`.
**Structure:** Six sections with an outer `.section` (handles pin) and an inner `.container` (handles rotation).
**Key Techniques:**
- **DOM Separation of Concerns:** Outer wrapper handles ScrollTrigger pinning; inner wrapper handles CSS transform rotation. Prevents catastrophic layout conflicts.
- **Smart Bottom-Pinning:** `start: "bottom bottom"` ensures sections taller than the viewport remain freely scrollable until the user reaches their true bottom, *then* it pins.
- **CSS Pre-Tilt:** Elements start rotated in standard CSS, GSAP scrubs them to 0.
**Logic Flow:**
1. Setup Next.js with Lenis synced to GSAP ticker.
2. Build Sections > Containers.
3. Pre-rotate containers via CSS.
4. Hook GSAP: Loop sections to apply rotational scrub.
5. Apply second ScrollTrigger loop for pinning (skipping final section).

<a name="v18"></a>
## 18. 3D Floating Card Spread & Flip
**The Effect:** Cards float idle in center. On scroll, they spread outward, then execute a 3D rotate flip to reveal text on the back.
**Methods Used:** `gsap.to()`, `ScrollTrigger.create()` (Spread), `ScrollTrigger.create()` (onUpdate 3D Flip).
**ScrollTrigger:** **Pin:** Container (`end: 300vh`) | **Spread:** Scrub 0.5 | **Flip:** onUpdate progress mapping.
**CSS Animated:** `left` (horizontal spread), CSS Float Keyframes, `rotateY` (0→-180), `rotateX`, `rotateZ`.
**Structure:** React `forwardRef` cards. Deep structure: Wrapper (float) → Inner (3D Transform) → Front/Back faces. `perspective: 1000px`.
**Key Techniques:**
- **Triple Trigger Phasing:** 1) Pin locks layout for 300vh. 2) Scrub spreads cards horizontally. 3) onUpdate explicitly calculates custom flip bounds per-card based on index.
- **CSS Preserve-3D:** Uses `transform-style: preserve-3d` and `backface-visibility: hidden` so `rotateY(-180)` perfectly reveals the backside text element.
- **CSS Float Bypass:** Idle floating uses standard CSS `@keyframes` on an outer wrapper, ensuring it doesn't conflict with GSAP's scroll transforms on the inner wrapper.
**Logic Flow:**
1. Build deeply nested card DOM + CSS 3D styling.
2. Apply CSS idle float animations.
3. Setup master 300vh Pin trigger.
4. Apply GSAP Scrub to map cards to pre-defined X/Rotation arrays.
5. Map onUpdate bounds per card index. Calculate local progress, push to `rotateY` via `gsap.set()`.

<a name="v19"></a>
## 19. Reusable Animated Header Component (3 Animation Modes)
**The Effect:** Skewed characters slide in. Controlled via 3 modes: Immediate load, Scroll-Triggered (snaps back when off-screen), or direct Scrub.
**Methods Used:** `SplitText.create()`, `gsap.timeline()`, `gsap.set()`, `ScrollTrigger.create()`.
**CSS Animated:** Character `x` (100px→0), `opacity` (0→1), `skewX` (20°→0).
**Structure:** Configurable component using `React.cloneElement` to inject classes into native DOM headers.
**Key Techniques:**
- **Per-Line Parallel Indexing:** Calculates character indices *relative to their line*, not globally. This ensures the first letter of line 1 and line 2 begin animating at the exact same time.
- **Instant Reverse Snap:** On ScrollTrigger `onLeaveBack`, calls `timeline.pause(0)` instead of reversing to instantly hide text without distracting visual rewind artifacts.
- **Multi-Mode Engine:** Switch statements check props to dynamically mount either a raw timeline, an onEnter trigger, or a scrub trigger.
**Logic Flow:**
1. Setup component; clone Ref to child.
2. Run SplitText (lines, words, chars).
3. Set initial states (x:100, op:0, skew:20).
4. Build metadata array tracking each character's line-relative index.
5. Construct master timeline using metadata for precise stagger multiplication.
6. Mount timeline to appropriate ScrollTrigger mode based on boolean props.

<a name="v20"></a>
## 20. Animated Image Trail with Clip-Path Masking
**The Effect:** Images spawn at cursor position and reveal via 10 sliced "Venetian blind" clip-paths opening outward from the center. Images fade/close automatically after a lifespan.
**Methods Used:** Pure JS (`requestAnimationFrame`, linear interpolation), CSS Transitions. *Note: No GSAP.*
**CSS Animated:** `clip-path: inset()` (slices opening/closing), `opacity`, `transform: translate()`.
**Structure:** Standalone component generating divs wrapping 10 absolute horizontal slice layers per image.
**Key Techniques:**
- **10-Slice Clip-Path System:** A single image is rendered 10 times in exact overlap. Each layer receives a distinct vertical clip-path slice.
- **Center-Outward Staggering:** Transition delays are mathematically mapped based on distance from slice #5, creating an organic ripple open/close.
- **Distance Threshold Throttling:** Spawns new image only when mouse `distance()` exceeds a set minimum, preventing clumped overlaps.
- **Garbage Collection:** Timestamp arrays automatically trigger exit transitions on expired images, then purge them from the DOM.
**Logic Flow:**
1. Setup config (Lifespan, Threshold, Stagger Math).
2. Establish continuous 60fps rAF loop and mouse lerp tracker.
3. Check mouse distance. If threshold met: Create parent div, inject 10 clip-path slice divs.
4. Mount image off-screen, translate to lerped cursor, trigger CSS class to open slices.
5. In same rAF loop: Check oldest image lifespan. If expired: toggle close class, setTimeout to `node.remove()`.

<a name="v21"></a>
## 21. Scroll-Driven Neon Text Color Sweep
**The Effect:** Text characters transition dynamically on scroll: Gray (Idle) → Bright Neon (Active) → Black (Final Settled).
**Methods Used:** `SplitType.create()`, `gsap.to()`, `gsap.set()`, `ScrollTrigger.create()` (onUpdate progress).
**ScrollTrigger:** **Trigger:** Container | **Start:** `"top 90%"` | **End:** `"top 10%"` | **Scrub:** `1` | **onUpdate:** Character logic loop.
**CSS Animated:** `color` (Initial → Accent → Final), `transition` (smooth blend).
**Structure:** Reusable `<AnimatedCopy>` wrapper. Flat array of character nodes.
**Key Techniques:**
- **Three-Phase State Machine:** Raw scroll progress calculates the active index. Triggers "Accent". A 100ms `setTimeout` triggers "Final", preventing harsh immediate swaps.
- **Directional Reversal:** Tracks previous progress vs current. If scrolling up, it explicitly clears timeouts, removes nodes from a `completedCharacters` Set, and forces them back to Gray.
- **Timer Map Memory-Leak Prevention:** Stores every active character timeout in a JS `Map()` to ensure rapid scroll direction changes can instantly kill pending state transitions.
**Logic Flow:**
1. Run SplitType (words → chars). Flatten chars into single array.
2. Initialize all chars to Gray. Setup Sets and Maps for memory.
3. Hook `onUpdate` progress. Calculate active character index.
4. Loop array: If scrolling up, revert to Gray. If scrolling down, apply Neon.
5. Fire `setTimeout` to convert Neon to Black.
6. Revert SplitType and purge Timeouts on unmount.

<a name="v22"></a>
## 22. Advanced Sticky Card Animation (Stacking with Pin)
**The Effect:** Cards pin at 30% viewport height. Inner card contents slowly animate upward (-14vh) to stack densely. Unpins all together at the end.
**Methods Used:** `ScrollTrigger.create()` (Intersection Pin), `ScrollTrigger.create()` (Per-card Pin), `gsap.to()`.
**ScrollTrigger:** **Intersection:** Triggers on Card 1, ends on Last Card. | **Per-Card:** Triggers at 35%, ends at Outro.
**CSS Animated:** `.card-inner` `y` (translates up via scrub).
**Structure:** Outer `.card` (handles pin lock) → Inner `.card-inner` (handles upward Y animation).
**Key Techniques:**
- **Critical Inner/Outer Separation:** Pinning and Y-transforming the *same* element causes fatal GSAP position resets on unpin. Separating DOM layers solves this.
- **Intersection Pinning:** A master ScrollTrigger locks the exact coordinates where the deck builds, preventing visual layout gaps between individual card pins.
- **Index-Based Scrub Math:** `index * -14vh` ensures Card 2 moves up 14vh, Card 3 moves 28vh, creating uniform overlapping.
**Logic Flow:**
1. Structure Card components with explicit outer/inner wrappers.
2. Create Master Intersection Pin (Card 1 → Outro).
3. Loop all cards (except final).
4. Apply Per-Card Pin to outer wrapper.
5. Apply Scrubbed `y` translate to inner wrapper based on array index multiplier.

<a name="v23"></a>
## 23. 3D Video Carousel (CSS 3D Transforms)
**The Effect:** Cards stack in 3D space. Clicking drops the front card down/out, moves it to the back of the DOM, and re-sorts the deck infinitely.
**Methods Used:** `gsap.to()`, `gsap.set()`. *Note: No ScrollTrigger, click-driven.*
**CSS Animated:** `translateY` (vertical spacing), `translateZ` (depth), `perspective` (175px).
**Structure:** Component dynamically imports `react-player` (`ssr: false`). Elements absolutely positioned.
**Key Techniques:**
- **SSR Bypass:** Forcing `ssr: false` prevents Content Security Policy/Hydration errors when loading raw Vimeo players.
- **Physical DOM Manipulation:** Moves the bottom card out of view, uses JS `prepend()` to force it to the top of the node list, then re-runs the initial sorting math.
- **Event Locking:** `isAnimating` boolean strictly blocks clicks until the 0.75s transition completes, preventing deck collapse.
**Parameters:** Y increment: 20% | Z increment: 15 units. Exit duration: 0.75s.
**Logic Flow:**
1. Render absolute video cards wrapped in 3D perspective container.
2. On mount, run `initializeCards()` to stagger Y/Z values based on node index.
3. On Click: check boolean lock.
4. Animate front card `y += 150%`.
5. On complete: `prepend()` card to DOM list, re-run `initializeCards()`, release boolean lock.

<a name="v24"></a>
## 24. Footer Image Explosion Animation (Pure Physics)
**The Effect:** Reaching the footer causes 15 images to explode outward from the center, applying realistic gravity, friction, and rotation as they fall off-screen.
**Methods Used:** Pure JavaScript (ES6 Classes, `requestAnimationFrame`, math physics). *Note: No GSAP.*
**CSS Animated:** `transform: translate(x, y) rotate()`.
**Structure:** Container injects 15 absolute image divs positioned at bottom-center.
**Key Techniques:**
- **OOP Particle System:** Each image acts as a distinct instance of a `Particle` class tracking unique X/Y positions, V/X velocities, and rotation speed.
- **Real Physics Math:** Each frame updates position by velocity, velocity by gravity (addition), and velocity by friction (multiplication/decay).
- **Intersection Optimization:** Scroll handler is debounced via `setTimeout` and relies on raw `getBoundingClientRect()` rather than heavy observers.
**Parameters:** Gravity: 25 | Friction: 0.99 | Horizontal Force Range: ±20.
**Logic Flow:**
1. Preload 15 images silently on mount to prevent missing textures.
2. Initialize ES6 Particle instances with randomized velocity vectors.
3. Track scroll limit. On trigger: lock boolean, mount DOM nodes.
4. Execute `requestAnimationFrame` loop calling `update()` on all particles.
5. Check if all Y coordinates exceed viewport. If yes: kill loop, unmount DOM, reset lock after 500ms delay.

<a name="v25"></a>
## 25. Block Pixelate Page Transition (Next Transition Router)
**The Effect:** A dynamically generated grid of small blocks fades in with random timing to cover the screen (pixel glitch effect), swapping routes, then randomly fading out.
**Methods Used:** Next Transition Router (`leave`/`enter`), `gsap.to()`, `gsap.set()`.
**CSS Animated:** `opacity` (0→1→0), `width`/`height` (dynamic inline block size), `background-color`.
**Structure:** Absolute fixed grid overlay (`pointer-events: none`, high z-index). JS populates hundreds of div blocks on load.
**Key Techniques:**
- **Dynamic Math Grid:** Auto-calculates `Math.ceil(windowWidth / blockSize)` to populate the exact number of squares needed, preventing DOM bloat.
- **Offset Centering:** Automatically calculates remainder padding to center the grid perfectly, hiding edge gaps.
- **GSAP Random Stagger:** Utilizing `stagger: { from: "random" }` applies the digital glitch/pixelated aesthetic effortlessly.
**Logic Flow:**
1. Wrap Next app in Transition Provider. Build static absolute Grid container.
2. On mount / resize: Calculate dimensions, generate block divs, apply absolute inline coordinates, push to Refs.
3. Leave Timeline: `opacity: 1`, stagger random. `onComplete: next()`.
4. Enter Timeline: `opacity: 0`, stagger random.
5. Clear refs and event listeners on unmount.

<a name="v26"></a>
## 26. Full-Screen Navigation Overlay (useGSAP Hook)
**The Effect:** A small clip-path rectangle bursts open to reveal a full-screen menu. Nav links slide up into view *before* the clip-path finishes (overlapping timeline).
**Methods Used:** `gsap.timeline()`, `gsap.to()`, `useGSAP()` (state dependency).
**CSS Animated:** `clip-path: inset()` (Rectangle → 0), `y` (offset→0).
**Structure:** Fixed overlay with menu bar and column grids. React `isMenuOpen` state controls playback.
**Key Techniques:**
- **State-Reactive Animation:** `useEffect` watches React state and physically fires `timeline.play()` or `timeline.reverse()` rather than recreating tweens.
- **Negative Timeline Staggering:** Passing `-0.2` to the links stagger parameter forces them to begin sliding up while the clip-path background is still expanding.
- **Pre-Clip Hiding:** Links begin translated downward physically behind the boundary of the un-opened clip-mask.
**Logic Flow:**
1. Build fixed overlay. Pre-set clip-path to small box via CSS.
2. Pre-set Links downward via GSAP hook to hide behind mask.
3. Build Master Timeline (paused): Clip-path to 100%, Links Y to 0 (staggered overlap).
4. Watch `isMenuOpen` in `useEffect` to toggle play/reverse.
5. Bind toggle state to link clicks and close buttons.

<a name="v27"></a>
## 27. Dynamic Displacement Hover Effect (Three.js Shaders)
**The Effect:** Hovering a 2D image creates a rippling, turbulent displacement mask around the cursor, revealing a grayscale-inverted version of the image underneath.
**Methods Used:** Three.js (OrthographicCamera, ShaderMaterial), WebGL GLSL Shaders. *Note: No GSAP.*
**Structure:** Full-screen 2D plane geometry running custom Vertex/Fragment strings. `IntersectionObserver` handles render toggling.
**Key Techniques:**
- **GLSL Turbulence:** Complex Fragment Shader layering Simplex Noise to generate organic, evolving, non-perfect circular edges.
- **Step Function Reveal:** Shader calculates cursor distance, applies noise, and mathematically blends the original color texture with a mathematical color-inversion.
- **Visibility Throttling:** `IntersectionObserver` completely disables the `requestAnimationFrame` render loop when the component scrolls off-screen to save GPU overhead.
**Logic Flow:**
1. Load image via `TextureLoader`.
2. Map uniform variables (Time, Mouse UVs, Aspect Ratio, Radii).
3. Build Scene with flat Orthographic camera and ShaderMaterial plane.
4. Track mouse coords, apply lerp smoothing, pipe into shader uniforms.
5. Run rAF loop updating Time (for fluid noise) and Mouse targeting.

<a name="v28"></a>
## 28. Scroll-Driven Clock Hand Rotation with Coordinated Reveals
**The Effect:** A massive pin area where scrolling rotates a clock hand 1800° (5 full cycles). Images/Text pop in on specific rotation cycles, then zoom out infinitely.
**Methods Used:** `ScrollTrigger.create()` (onUpdate), `gsap.set()`, `gsap.interpolate()`.
**ScrollTrigger:** **Trigger:** Section | **Pin:** `true` | **End:** `window.innerHeight * 8` (Massive extended runway).
**CSS Animated:** `rotation` (0→1800°), `opacity`, `x`, `scale` (1→20), `height` (50%→100%).
**Structure:** Sticky section housing Clock Hand, Dynamic H1, and injected content blocks. Array of texts mapping to rotation cycles.
**Key Techniques:**
- **Massive Pin Runway:** `800vh` end constraint provides the physical scroll space required to execute 5 full rotations without scrubbing too fast.
- **Cycle Math:** `Math.floor(totalRotation / 360)` allows the logic to swap header text exactly when the clock hand crosses the 12 o'clock threshold.
- **GSAP Interpolation Map:** Uses raw progress fractions (e.g., `progress 6/8 to 7/8`) to manually pipe `gsap.interpolate()` values into raw scale and opacity properties.
**Parameters:** Rotation: 0→1800° | Scale Zoom: 1→20 | Runaway: 8x Viewport.
**Logic Flow:**
1. Set DOM structure and 800vh pin limit.
2. Define array of Text Headers.
3. In `onUpdate`: Calculate raw scroll progress (0-1).
4. Apply 1800° math to hand. Check active cycle; update DOM header text if cycle changes.
5. Hardcode triggers: At Cycle 3 → Toggle image/paragraph opacity.
6. Hardcode triggers: At progress > 6/8 → Interpolate Scale to 20, fade container out, fade final content in.

---

### Quick Reference Guide

**Most Common Architecture Pattern:**
```javascript
// 1. Next.js "use client" directive
// 2. Import GSAP, ScrollTrigger, useGSAP
// 3. Register plugins (gsap.registerPlugin(ScrollTrigger))
// 4. Setup React Refs for Container (Scope) and Target Nodes
// 5. Wrap in useGSAP({ scope: containerRef })
// 6. Set initial states (gsap.set)
// 7. Generate timeline() / ScrollTrigger configuration
// 8. Return explicit cleanup function (kill triggers, revert SplitText)
```

**Common ScrollTrigger Parameter Baselines:**
| Property | Typical Value | Purpose |
| :--- | :--- | :--- |
| **start** | `"top top"` or `"top 75%"` | Trigger lock point. |
| **end** | `bottom top`, `+=500`, or `window.innerHeight * array.length` | Release point or scroll runway math. |
| **pin** | `true` | Locks element in viewport. |
| **pinSpacing** | `true` / `false` | False creates overlap stacking; True creates scroll space. |
| **scrub** | `true`, `0.5`, or `1` | Locks animation to scrollbar vs smooth interpolation. |
| **toggleActions** | `"play reverse play reverse"` | Allows reversing animations cleanly when scrolling up. |
