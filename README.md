# Portfolio — rebuild

A from-scratch rebuild in the visual direction from your screenshots:
warm cream/olive/clay palette, italic serif display type, mono
tracked-out labels — plus custom motion work throughout.

## Round four

- **Specimens hover — the actual bug, this time.** My previous "fix" (a
  plain CSS `:hover` class) couldn't have worked at all: Framer Motion
  sets that card's resting `y` position as an *inline style* (since it's
  driving the entrance animation), and inline styles always beat a CSS
  class's `:hover` rule, `:hover` matching or not. Reverted to Framer's
  own `whileHover` prop, which shares the same animation engine as the
  entrance animation instead of fighting it — this is the reliable fix.
- **Mascot** — redrawn closer to your reference image: softer head
  shape, hair swept up-left and flipped across to the right, rounded
  rectangular glasses, no beard, kept the earrings and broader shoulders.
- **Logo ticker** — logos now glow in their own brand color continuously
  (not grey-until-hover), and bloom further — scale, glow radius, and
  opacity all increase — on hover, instead of shifting color.
- **Nav** — a sliding pill now tracks whichever section is actually in
  view as you scroll (`hooks/useActiveSection.js`, an IntersectionObserver
  band through the vertical center of the screen), using the same
  shared-layout-animation idea as motion.dev's "Tab select" (their
  `animateLayout`; this uses `motion/react`'s `layout`/`layoutId` props,
  the React equivalent).
- **Page transitions between sections** — clicking a nav link (top nav or
  footer) now plays a brief curtain wipe, jumps the scroll position while
  hidden, then wipes away — reusing the intro curtain's visual language
  via `context/PageTransitionContext.jsx`, triggered on demand instead of
  just once on load.
- **Voices** — now a 4-testimonial carousel: one recommendation at a
  time, auto-advancing every ~6.5s, with dot navigation. Hovering a card
  does double duty — it pauses the auto-advance *and* expands the
  clamped quote, since if you're engaged enough to hover, you want both.
- **Hero panel** — the top-right image now assembles itself: a mosaic of
  tiles dissolves outward from the center on load (delay proportional to
  each tile's distance from center — the same "physical stagger" idea as
  motion.dev's staggered-grid example, applied here instead of on the
  Specimens grid) rather than the whole panel just fading in flat.

**On `motion-v`:** that's the *Vue* bindings for the Motion library —
it won't do anything in this React project (this uses `motion/react`,
already installed, which is what every effect above is built on). Worth
uninstalling (`npm uninstall motion-v`) so it's not sitting in
`package.json` unused; you don't need it here. The motion.dev examples
you've been linking show a Vue tab by default for some of them, which is
probably where the mix-up came from.

## Make it yours

Everything text-based lives in one file: **`src/data/content.js`**. Swap
in your real name, title, email, project write-ups, certifications,
testimonials, and publications from there — the rest of the site updates
automatically. A few things left as placeholders on purpose:

- **`profile.githubUsername`** — set this to your real handle so the
  activity graph pulls your real contribution history.
- **The mascot's likeness** (`src/components/Mascot.jsx`) — built from
  your description (side-swept wavy hair, rectangular glasses, trimmed
  beard, earrings, broader build), not traced from an actual photo, since
  I don't have image-tracing tools here. It's genuinely hard to judge
  fine facial detail at the 64–76px it renders at without a browser to
  check against — tell me if it reads as cluttered and I'll simplify it.
- **`voices[].photo`** in `content.js` — add a real headshot URL per
  testimonial and it replaces the initials fallback. Each avatar already
  links out to `voices[].linkedin`.
- **`publications`** in `content.js` — seeded with your actual MECS work
  (framed honestly as "in preparation," not a finished dated paper) plus
  one empty placeholder slot for the rest.
- **`public/resume.pdf`** — the "Resume.pdf" button links here.

## Setup

```bash
npm install
npm run dev
```

`npm install` matters even if you've run this project before — a couple
of rounds of changes added new dependencies (`simple-icons`, for the logo
ticker), so an old `node_modules` will be missing pieces.

**One thing worth knowing about testing this locally:** a few effects
(the intro curtain, the scramble-text email) only fire once per real page
load, on purpose — that's what makes them feel considered rather than
annoying on a real visit. If you're editing files and watching Vite's
hot-reload swap them in without ever doing a full browser refresh, you'll
only see those once and then never again in that tab. Do a hard refresh
(Cmd/Ctrl+R) whenever you want to see them replay. Scroll-triggered
reveals (Specimens, Voices, the trace lines) replay every time they
re-enter the viewport, so those are always testable by scrolling up and
down.

## Deploy to GitHub Pages

A workflow is already set up at `.github/workflows/deploy.yml` — it
builds and deploys automatically on every push to `main`:

1. Push this project to your GitHub repo.
2. In the repo, go to **Settings → Pages → Source** and select **GitHub
   Actions**.
3. Push to `main`.

`public/CNAME` is pre-filled with `aswinkumarj.com` (your current
domain) — delete it if you don't want a custom domain wired up, or
change it if you're moving domains. If you're deploying to a *project*
page instead (`username.github.io/repo-name`, no custom domain), add
`base: '/repo-name/'` to `vite.config.js`.

## The motion, section by section

- **Mascot** (`Mascot.jsx`) — small, fixed to the bottom-left corner of
  the viewport, travels with you for the whole scroll rather than living
  inside the hero. Holds one steaming cup the whole time; idle bobbing,
  a periodic wave, and a lean tied to scroll velocity. Fades in over the
  first ~300px of scroll so it's never competing with the hero's own
  content at the very top.
- **Trace lines** (`TraceLine.jsx`) — the bklit.com-style thin connector
  lines that draw themselves in once scrolled into view. There's also a
  persistent 1px progress line at the very top of the page tracing total
  scroll depth.
- **GitHub activity graph** (`GithubActivity.jsx` +
  `hooks/useGithubContributions.js`) — pulls real contribution history
  client-side via a public CORS-enabled mirror of GitHub's contribution
  data (`github-contributions-api.jogruber.de`, since GitHub doesn't
  expose this as a public API itself), rendered as a staggered-reveal
  heatmap. Falls back to a generated placeholder pattern if that request
  ever fails, so the section never looks broken.
- **Credentials ticker** (`CredentialsTicker.jsx`) — the band between
  "The Generative Garden" and "Technical Specimens": the certification
  *issuers'* actual logos (not cert names), muted into the background and
  brightening to the brand's real color on hover, via the MIT-licensed
  `simple-icons` package (`data/brandIcons.js`). AWS, Microsoft Azure,
  DeepLearning.AI, and EC-Council aren't in that icon set — AWS and Azure
  specifically are excluded from it over brand-guideline concerns — so
  those four fall back to a small monogram badge instead of a missing
  icon. Two rows move at different speeds in opposite directions, tied to
  scroll via `useScroll`/`useTransform`, with Motion's `wrap()` helper so
  the loop is seamless no matter how far the page scrolls.
- **Specimens** (`Specimens.jsx`) — the four cards stagger in by
  *physical distance* from the grid's top-left corner rather than a flat
  index-based delay, so the reveal sweeps diagonally. Hover lift is a
  plain CSS transition (not Framer's `whileHover`) for reliability.
- **Publications** (`Publications.jsx`) — new section between Specimens
  and Credentials, with a matching nav entry.
- **Certifications marquee + Voices** (`CredentialsSection.jsx`) — the
  full certification list still auto-scrolls vertically (pauses on
  hover). Each testimonial now clamps to 3 lines with a native ellipsis
  and expands smoothly on hover/tap to show the full quote; the avatar is
  a real link to that person's LinkedIn.
- **Footer** — a real, always-reachable last section (so "Connect" in the
  nav always has somewhere to land) that fades in as it scrolls into
  view. The email uses a hand-rolled scramble-decode effect: random
  characters settling into place left to right, via a plain
  `requestAnimationFrame` loop.

**On Motion+:** several of the effects you referenced from motion.dev
(Curtains: Clip wipe, Scramble text, the specific Scroll Text Lines
component, the literal sticky Footer reveal) are built on **Motion+**, a
separate paid UI kit on top of the free `motion` package this project
uses. Everything above is a from-scratch equivalent built on free APIs,
so nothing here requires buying it — that's only worth doing if you'd
rather have the officially-maintained originals instead of these custom
versions.

## Stack

Vite + React 19 + Tailwind CSS + [Motion](https://motion.dev)
(`motion/react`) + `simple-icons`. No component libraries, no template —
every section is bespoke to this design.
