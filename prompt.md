# TASK: Build the $LEGEND website from scratch (Framer)

You are building a premium, minimal, non-AI-slop memecoin site in **Framer** using modern motion + micro-interactions.

## Project Info (must be used exactly)
- Name: **LEGEND**
- Ticker: **$LEGEND**
- Contract Address (CA): **J4ixzSEG99FWNoHRYfoaE3y2e7T7e7KX8NKNPy96pump**
- X Community: **https://x.com/i/communities/2003523155730616378**
- Theme reference images: use the provided frog-in-tux visual as the brand anchor (dark, classy, slightly comedic, “gentleman legend” vibe).

## Hard requirements
- Build in **Framer** (desktop + mobile).
- Site must be **minimal** (few sections, lots of whitespace, strong typography, high contrast).
- Smooth scrolling using **Lenis** (where applicable in Framer via custom code / overrides).
- **Custom cursor** (Framer code component) with subtle hover states (links, buttons, CA copy).
- Use **Lordicon** animated icons sprinkled lightly (not clutter). Icons should match: classy, finance, community, “verified”, “spark”, “frog/gentleman” energy.
- Micro-interactions everywhere: hover, press, copy-to-clipboard, subtle parallax, soft reveal.
- No generic meme gradients, no busy backgrounds, no “web3 template” look.

## Visual direction
- Background: near-black / charcoal with soft vignette.
- Accent: muted gold or warm amber (very restrained).
- Typography: modern editorial + clean sans (example pairing: **Sora / Inter**, or **Neue Montreal-like** vibe if available). Use strong type scale.
- Imagery: frog-in-tux hero portrait as the central element (tasteful lighting, premium feel).

## Page structure (single page)
### 1) Hero (above the fold)
- Left: text stack
  - H1: “LEGEND” (big, confident)
  - Sub: “$LEGEND, built for the ones who don’t beg. They become.”
  - Two CTAs:
    - Primary: “Join the Community” -> X community link
    - Secondary: “Copy CA”
- Right: hero image (frog-in-tux). Add subtle motion (slow float or light parallax on cursor move).
- Add 2–3 tiny Lordicon accents around the hero (very subtle, low opacity, slow loop).

### 2) Proof / Signal strip (thin section)
Three minimal cards (small):
- “Community First”
- “Transparent CA”
- “Built to last (in spirit)”
Each card has a tiny Lordicon + hover lift + soft glow.

### 3) The Meme (short)
A tight paragraph explaining the vibe (no walls of text):
- “LEGEND is the calm flex. A gentleman frog in a space full of noise.”
Include a single pull-quote style line.

### 4) Contract (utility section)
- Show CA in a mono font pill.
- Copy button with:
  - haptic-like animation (scale down/up)
  - tooltip: “Copied”
- Optional: “View on Explorer” button (only add if you can reliably link, otherwise omit).

### 5) Community (final CTA)
- One strong closing line + button to join X community.
- Footer with:
  - “LEGEND”
  - CA (shortened)
  - Link to X community
  - Minimal disclaimer text (1 line max).

## Motion + interaction specs
- Use Framer scroll reveals (fade + slight y) with consistent easing and timings.
- Lenis smooth scroll: tuned, not floaty.
- Cursor:
  - Default: small dot + ring
  - Hover on links/buttons: ring expands + label (e.g., “OPEN”, “COPY”)
  - Hover on hero image: ring softens, subtle highlight
- Lordicon:
  - Only 4–7 total on the whole page.
  - Keep opacity low, size small-medium, and avoid visual noise.

## Content rules
- Don’t invent tokenomics, roadmaps, or promises.
- No fake metrics, no “revolutionary”, no buzzword paragraphs.
- Keep copy short, confident, and a little witty.

## Deliverables
- A finished Framer project with:
  - Responsive layout (mobile-first fixes, no cramped hero).
  - Polished interactions (cursor, copy, hover, reveals).
  - Clean naming of layers/components.
  - Performance sanity: optimize images, don’t spam animations.

## QA checklist (must pass)
- Mobile hero looks intentional (image + CTAs visible without awkward cropping).
- Copy-to-clipboard works reliably.
- Animations feel premium (subtle), not “template-y”.
- Spacing and type scale feel editorial, not Web3 boilerplate.
- All links correct:
  - X community link is correct
  - CA matches exactly