# Project overview

## Purpose and scope

Personal portfolio at darwinmanalo.com, presenting projects, technical articles, and an about page. Supports light and dark themes and 11 languages, including Arabic with right-to-left layout.

## Stack and architecture

React 19, React Router 7, Vite 6, Tailwind CSS 4, Framer Motion, and i18next. Routes, translation bundles, and article bodies load on demand. Static assets live in `public/img`. GitHub Actions builds and deploys the site to GitHub Pages.

## Loading and language changes

- The About portrait uses a 768 × 752 WebP, loaded eagerly with high fetch priority and explicit dimensions to reserve space. A 150 ms fade begins when the image loads; reduced motion disables the transition. The hover and touch zoom use the same image, and the original PNG remains as the source asset.
- Page transitions are keyed by pathname and language. Language changes retain the original page fade and slide transitions and replay the homepage text entrance animation, as requested. The optimized portrait retains its shorter fade.
- Opening the language menu prefetches missing translation bundles in the background. Selection shares any in-flight load, and loaded bundles are reused throughout the visit. Background failures are isolated and failed loads can be attempted again. Startup still loads only English and the detected language.

## Homepage interactions

- Dark mode uses a neutral background at every screen size, including phones and tablets. The blue and orange backdrop remains available in light mode.
- Hero copy separates the introduction and invitation to connect into two paragraphs with a modest gap, and contains translated inline links to the about, projects, and articles pages. Desktop copy flows normally; balanced invitation wrapping and grouping of the two cat links apply only on mobile (640 px or less).
- The Manila location wraps naturally between words on narrow screens. Hover or keyboard focus on only the translated country name ("Philippines" in English) fades a waving Philippine flag into its letters over 250 ms; Manila does not trigger the effect. A stationary SVG text mask matches the original font and baseline while the cloth moves behind the letters; no flag floats above the text. Touch retains ordinary text, reduced motion uses a static fill, and normal text remains the loading/error fallback. Rendering pauses offscreen, in hidden tabs, and after the exit fade.
- A small orange tabby hangs from the articles link's dashed underline. Its 32-frame transparent sprite sheet has 16 idle poses and 16 play poses, with a subtle continuous sway between pose changes; pointer entry or keyboard focus triggers one playful tug with a 6 px dip and diminishing rebounds. The cat follows the underline's center throughout the bounce.
- A gray British Shorthair hangs belly-up by four paws from the projects underline, releases one paw for an air-swipe, and bounces with the underline through diminishing rebounds. Its separate 32-frame sheet has 16 idle and 16 play poses.
- The orange cat measures 32 × 40 px on desktop and 26 × 33 px at widths of 640 px or less. The projects and articles phrase inherits the surrounding text size. On mobile the links stay together when they fit and wrap between words when necessary; individual link labels remain unbroken at all sizes. Mobile hero copy uses the page's existing side padding without an additional inset. Paragraphs reserve room beneath the cats. Wrapped lines gain only the missing clearance where a cat would overlap following text, keeping ordinary line spacing when the cat hangs over empty space.
- The gray cat measures 40 × 36 px on desktop and 32 × 29 px on mobile. Both cats share the link, visibility, reduced-motion, and image-loading behavior, while keeping independent animation timing and artwork.
- Cat animation pauses offscreen and in hidden tabs. Reduced motion shows a static pose and responds to preference changes. Image-load failure retains an ordinary underlined link.
- The cat images are reusable static assets; the original sitting pose remains available.

## Status and validation

The homepage interaction and portrait/language performance improvements are implemented locally. No new dependencies, copy changes, or route changes were required. Validate changes with the production build, targeted lint, the local website-i18n-sync validator, and browser checks covering responsive layouts, themes, languages, keyboard navigation, motion preferences, and asset failure.

## Next steps and constraints

Review the homepage interaction before committing or publishing. Keep decoration non-interactive and hidden from assistive technology; preserve link navigation and translated labels. Future sprite replacements must retain the eight-column, four-row frame layout, their respective source-window settings in CSS, and consistent paw contact positions.
