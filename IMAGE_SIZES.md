# Image Sizes Guide

All images should be prepared in **2x (retina)** resolution to avoid visible resampling.

## Hero block (background images)

### Desktop (heroImageDesktop)
- Usage: full-width background image with overlay.
- Recommended aspect ratio: **~2.4:1** (wide landscape).
- **2x size (recommended): 3840 × 1600 px**
- Minimum 2x size: 2560 × 1066 px

### Mobile (heroImageMobile)
- Usage: background image for mobile layout.
- Recommended aspect ratio: **4:5** (portrait).
- **2x size (recommended): 1440 × 1800 px**
- Minimum 2x size: 1080 × 1350 px

Notes:
- Keep safe margins on the left for text.
- Avoid placing key objects at the extreme edges (can be cropped on smaller screens).

## Car card image (single photo)
## Car card images

### Desktop (photoDesktop)
- Usage: top image inside the car card (desktop).
- Aspect ratio: **16:6.3** (approx 2.54:1)
- **2x size (recommended): 3840 × 1512 px**
- Minimum 2x size: 2560 × 1008 px

### Mobile (photoMobile)
- Usage: top image inside the car card (mobile).
- Recommended aspect ratio: **4:3**
- **2x size (recommended): 1920 × 1440 px**
- Minimum 2x size: 1280 × 960 px

Notes:
- Keep the car centered horizontally to avoid cropping.
- Avoid text baked into the image.

## Bottom CTA block (background images)

### Desktop (ctaBottomImageDesktop)
- Usage: background image for the bottom CTA block.
- Recommended aspect ratio: **~16:7** (wide landscape).
- **2x size (recommended): 3840 × 1680 px**
- Minimum 2x size: 2880 × 1260 px

### Mobile (ctaBottomImageMobile)
- Usage: background image for the bottom CTA block on mobile.
- Recommended aspect ratio: **4:5** (portrait).
- **2x size (recommended): 1440 × 1800 px**
- Minimum 2x size: 1080 × 1350 px

Notes:
- Leave space on the left for text and form.
- Avoid tiny text and logos inside the image.

## Animated logo (JS embed)

Use this prompt to generate a ready-to-paste JS file for the logo animation.
Replace only the LOGO_TEXT and STYLE words.

```
You are generating a single, self-contained JavaScript file (no build, no external libs).
Goal: render an animated text logo inside a container with id "maxa-logo".

Inputs:
- LOGO_TEXT_TOP: "<LOGO_TEXT>"
- LOGO_TEXT_BOTTOM: "<LOGO_TEXT>"
- STYLE: "<STYLE>" (short description like "metal chrome", "neon glow", "glass", etc.)

Requirements:
- Output must be a single IIFE that runs on DOMContentLoaded.
- Must inject all CSS into a <style> tag.
- Must create and append DOM nodes into #maxa-logo (do not require any existing HTML).
- Must be responsive (use clamp or similar for font size).
- Must use requestAnimationFrame or CSS animations for a subtle looping shine/sheen.
- Must respect prefers-reduced-motion (disable animation).
- Must avoid global variables except the IIFE.
- Use unique, randomized class names to avoid CSS conflicts.
- Must not rely on external fonts or files.
- Provide only the JS code, no explanations.
```
