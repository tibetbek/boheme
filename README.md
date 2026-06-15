# BOHÈME

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://gsap.com)
[![Three.js](https://img.shields.io/badge/Three.js-r168-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org)

> Advanced frontend showcase — cinematic wellness landing page with WebGL organic background, magnetic cursor, GSAP ScrollTrigger, liquid blob morphing, and horizontal scroll.

---

## Advanced Technical Features

| Feature | Implementation |
|---|---|
| **WebGL Organic Background** | Three.js `ShaderMaterial` with layered wave noise, mouse-reactive distortion |
| **Magnetic Cursor** | Framer Motion `useSpring` (stiffness 150, damping 15), `mix-blend-mode: difference`, "VIEW" label on product hover |
| **Liquid Blob Morph** | SVG cubic bezier path keyframes animated with Framer Motion, mouse parallax |
| **Horizontal Scroll** | CSS sticky + Framer Motion `useScroll` / `useTransform` — products scroll horizontally as page scrolls vertically |
| **Word Mask Reveals** | `overflow: hidden` + `translateY(100%→0%)` on each word with staggered delay |
| **Counter Animation** | `requestAnimationFrame` eased counters triggered by `useInView` |
| **Smooth Scroll** | Lenis (duration 1.2s) integrated with GSAP ticker |
| **Auto-scroll Carousel** | CSS `@keyframes` infinite drift — 5 testimonials, no JS needed |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sections

1. **Hero** — WebGL background + morphing blob + letter-stagger BOHÈME + word-mask tagline
2. **Philosophy** — Pull quote + two-column image/text with `whileInView` reveals
3. **Products** — Horizontal pinned scroll through 6 ritual objects
4. **Ritual** — 3-step morning ritual with hand-drawn SVG icons
5. **Ingredients** — Dark earth section with counting number stats
6. **Testimonials** — Auto-drifting editorial carousel
7. **Footer** — Newsletter + minimal nav

## Stack

- **Framework** — Next.js 14 App Router, TypeScript strict
- **Styling** — Tailwind CSS 3, custom brand tokens
- **Animation** — Framer Motion 11 (cursor, blob, reveals, scroll)
- **3D / WebGL** — Three.js r168 with custom GLSL shader
- **Smooth Scroll** — Lenis ^1.1
- **Scroll Triggers** — GSAP 3.12 ScrollTrigger
- **Fonts** — Playfair Display + DM Sans via `next/font/google`

---

*Built as part of an AI Builder portfolio.*
