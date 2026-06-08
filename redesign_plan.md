## Info gathered
- `index.html` currently shows the same hero/developer/ecosystem sections with similar typography + spacing.
- The wheel/touch pager exists (`data-page`), but there is no meaningful structural redesign: ecosystem remains a static grid.

## Goal
Make a **visibly different layout** while keeping the same texts/descriptions.

## Plan (implementation-level)
1. **Cinematic "Iris" Morph Transition**
   - Replace standard fade with a `clip-path` expansion that morphs from the center outward.
2. **Liquid Morph Splash Screen**
   - Add an SVG morphing blob with glow effects for a high-end intro.
3. **Interactive "Flee" Canvas**
   - Update particles to push away from the cursor.
4. **Floating Tech Orbs & Moving Graphics**
   - Add background decorative elements that float and glow in the Hero section.
2. **Add a “Timeline” band for “The Frog Project”**
   - Under the ecosystem heading, add 3–4 timeline steps as decorative cards (no text changes from existing content; use short labels like “Inception / Growth / Automation / Delivery”)
3. **Animated background using canvas**
   - Add a lightweight `<canvas id="bgCanvas">` covering viewport.
   - Render subtle particles/connecting lines in frog-accent color.
4. **Make the hero genuinely different in structure**
   - Add a “stat cluster” layout and move primary CTA buttons into a side panel.
   - Keep existing hero sentence + CTA labels.
5. **Redeploy**
   - Run `firebase deploy --only hosting` after code update.

## Dependent files
- `index.html`
- (optional) `TODO.md`

## Testing
- Open https://arch-frogproject.web.app and verify: rail layout, spotlight updates, canvas renders, pager still works.
