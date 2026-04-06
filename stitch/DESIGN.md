```markdown
# Design System Specification

## 1. Overview & Creative North Star: "The Neon Curator"

This design system is built for the creative technologist who sits at the intersection of high-end art and precision engineering. The **Creative North Star** is **"The Neon Curator"**—a philosophy that treats the digital screen as a gallery space in the dead of night. 

Unlike standard portfolios that rely on rigid grids and clinical borders, this system utilizes **Tonal Layering** and **Luminous Depth**. We break the "template" look by employing intentional asymmetry, where large-scale typography bleeds off-canvas, and glassmorphic modules appear to float over liquid-gradient "light leaks." The goal is an experience that feels atmospheric, expensive, and technologically superior.

---

## 2. Colors: The Depth of the Void

The palette is anchored in deep, ink-like foundations, allowing vibrant accent tokens to "pop" with neon-like intensity.

### The Foundation
- **Surface & Background:** Use `surface` (#131313) as the default. 
- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for defining sections. Boundaries must be defined solely through background shifts. For instance, a `surface-container-low` section should sit against a `surface` background to create a soft transition.
- **Surface Hierarchy:** Utilize the tier system for nesting.
    - **Base:** `surface-container-lowest` (#0e0e0e)
    - **Standard Section:** `surface` (#131313)
    - **Floating Elements:** `surface-container-high` (#2a2a2a) with backdrop-blur.

### The Accents (The "Soul")
- **Primary Gradient:** Transitioning from `primary` (#ffade5) to `primary-container` (#ff3cde). Use this for high-impact CTAs and hero typography masks.
- **Secondary Gradient:** Transitioning from `secondary` (#d1bcff) to `secondary-container` (#7000ff). Use for interactive states and "Tech-Forward" highlights.
- **Neon Highlights:** Use `tertiary` (#00dbe9) for ultra-thin functional indicators (like active nav states or scroll progress).

---

## 3. Typography: Editorial Impact

Typography is the primary visual driver. We contrast the technical precision of **Space Grotesk** with the clean, Swiss-inspired legibility of **Inter**.

- **Display & Headlines (Space Grotesk):** Use `display-lg` (3.5rem) for hero statements. Tighten letter-spacing (-0.04em) and use a mix of "Filled" and "Outline" (Ghost) text to create a rhythmic, editorial feel.
- **Body & Titles (Inter):** Use `body-lg` for project descriptions. We prioritize breathing room; line heights should be generous (1.6 - 1.8) to ensure the technical content feels approachable.
- **Hierarchy as Identity:** The contrast between a `display-lg` headline and a `label-sm` technical spec (in Space Grotesk) creates a "blueprint" aesthetic that reinforces the Technologist persona.

---

## 4. Elevation & Depth: Tonal Layering

We reject traditional drop shadows in favor of light-based depth.

- **The Layering Principle:** Depth is achieved by stacking surface tiers. To "lift" a card, place a `surface-container-highest` object onto a `surface-container-low` background. 
- **Glassmorphism:** For floating navigation or modal overlays, use a background color of `surface-variant` at 40% opacity with a `backdrop-filter: blur(24px)`. This "frosted glass" look allows background gradients to bleed through, softening the interface.
- **Ambient Shadows:** When shadows are necessary for high-z-index components, use a blur of 40px-60px with a 6% opacity, tinted with the `primary` token rather than black.
- **The Ghost Border:** If accessibility requires a container edge, use `outline-variant` at 15% opacity. Never use 100% opaque lines.

---

## 5. Components

### Buttons
- **Primary:** Rounded corner (`xl`: 1.5rem / 24px). Background: `primary-container` gradient. On hover, scale to 1.05 and increase the `backdrop-filter` brightness.
- **Tertiary (Ghost):** No background. `label-md` text with a 1px `outline-variant` at 20% opacity. Transition to 100% opacity on hover.

### Cards
- **Construction:** No borders. Use `surface-container-low`. 
- **Interactive State:** On hover, the background shifts to `surface-container-high`, and a subtle `primary` glow appears at the top-left corner.
- **Spacing:** Use 48px internal padding to ensure content feels "curated" rather than "stuffed."

### Inputs & Fields
- **Style:** Underline only (2px `outline-variant`). When focused, the underline transforms into a `tertiary` (#00dbe9) neon glow.
- **Error State:** Use `error` (#ffb4ab) for text, but keep the container background neutral to maintain the dark aesthetic.

### Chips (Tech Tags)
- Small, `full` rounded capsules using `surface-container-highest`. Use `label-sm` in `on-surface-variant` for a subtle, metadata-heavy look.

---

## 6. Do’s and Don’ts

### Do:
- **Embrace Asymmetry:** Align text to the left but place images/3D assets off-center to create visual tension.
- **Use "Mega-Margins":** Use 128px–160px of vertical space between major sections to let the high-end typography breathe.
- **Subtle Motion:** Every hover should feel like a physical interaction—use 400ms "Ease-Out" transitions for all surface color shifts.

### Don’t:
- **No Pure White:** Never use #FFFFFF for body text. Use `on-surface-variant` (#dcbed0) to reduce eye strain and maintain the "dark room" vibe.
- **No Dividers:** Never use a horizontal rule `<hr>` to separate content. Use a 120px gap or a shift from `surface` to `surface-container-lowest`.
- **No Sharp Corners:** Avoid the `none` or `sm` rounding scale. This system is modern and fluid; stick to `lg`, `xl`, and `full`.

---

## 7. Signature Element: The "Light Leak"
To truly separate this system from generic dark modes, place large, blurred radial gradients of `secondary-container` and `tertiary-container` (at 10% opacity) deep in the background layer. These should move slightly on mouse-scroll, mimicking the movement of light across a high-tech surface.```