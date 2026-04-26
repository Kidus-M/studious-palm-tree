# 90s-Ethiopia Series Streaming Application — Implementation Plan

A Next.js 16 streaming platform for a client's series set in 90s Ethiopia. The app features a bilingual (Amharic/English) landing experience, subscription-based episode access via **Chapa** payments, and layered content-protection to deter piracy.

---

## User Review Required

> [!IMPORTANT]
> **Database choice**: This plan uses **Prisma + PostgreSQL** for the data layer. If you prefer a different DB (e.g. MongoDB, Supabase/Postgres-as-a-Service), let me know before execution.

> [!IMPORTANT]
> **Video hosting**: The plan assumes you will self-host video files (stored on your server or a private cloud bucket like AWS S3 / Cloudflare R2). For production-grade DRM (Widevine L1 / FairPlay), a managed platform like **VdoCipher**, **Mux**, or **Bunny.net Stream** is recommended — these handle encryption, adaptive bitrate, and multi-DRM out of the box. Which approach do you prefer?

> [!IMPORTANT]
> **Chapa keys**: You'll need to provide your Chapa **Secret Key** and configure a **webhook URL**. This plan uses environment variables (`CHAPA_SECRET_KEY`, `CHAPA_WEBHOOK_SECRET`).

> [!WARNING]
> **Absolute screen-record prevention is impossible** on the open web. Our layered approach (EME/DRM, CSS overlay tricks, visibility-API pause, watermarking, signed URLs) raises the piracy bar significantly but cannot guarantee 100% protection. Hardware capture devices, for example, bypass all software measures.

> [!IMPORTANT]
> **Series details needed**: To build the real content, I'll need the series name, episode list, cast member names/photos, trailer video, and synopsis text (in both Amharic & English). For now I'll scaffold with placeholder content.

---

## Proposed Changes

### 1. Project Foundation & Dependencies

#### [MODIFY] [package.json](file:///c:/Users/hp/Desktop/work/personal/studio-palm-tree/package.json)

Install the following packages:

| Package | Purpose |
|---|---|
| `better-auth` | Authentication (email/password, sessions, roles) |
| `@prisma/client` + `prisma` | ORM + database |
| `next-intl` | Internationalization (Amharic/English) |
| `video.js` + `@types/video.js` | Video player |
| `axios` | HTTP client (Chapa API calls) |
| `uuid` + `@types/uuid` | Unique transaction references |
| `jsonwebtoken` + `@types/jsonwebtoken` | Signed video tokens |
| `zod` | Schema validation |
| `gsap` + `@gsap/react` | Animations & timeline effects for the 90s cinematic theme |
| `lucide-react` | Icon set |

#### [MODIFY] [next.config.ts](file:///c:/Users/hp/Desktop/work/personal/studio-palm-tree/next.config.ts)

- Add `next-intl` plugin config
- Configure `headers()` for security (CSP, X-Frame-Options, Referrer-Policy)
- Add remote image domains if needed

#### [NEW] .env.local

```
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
CHAPA_SECRET_KEY=CHASECK_TEST-...
CHAPA_WEBHOOK_SECRET=...
VIDEO_SIGNING_SECRET=...
```

---

### 2. Database Schema

#### [NEW] prisma/schema.prisma

Tables:

| Model | Key Fields |
|---|---|
| `User` | id, email, phone, passwordHash, name, role (USER/ADMIN), locale |
| `Subscription` | id, userId, plan (FREE/EPISODE/FULL_SEASON), status, expiresAt |
| `Episode` | id, seasonNumber, episodeNumber, title_en, title_am, synopsis_en, synopsis_am, videoUrl, thumbnailUrl, durationSec, isFree |
| `Payment` | id, userId, chapaRef, amount, currency, status, plan, createdAt |
| `CastMember` | id, name_en, name_am, role_en, role_am, photoUrl, bio_en, bio_am |

---

### 3. Design System — 90s Ethiopia Theme

#### [MODIFY] [globals.css](file:///c:/Users/hp/Desktop/work/personal/studio-palm-tree/app/globals.css)

Define CSS custom properties and Tailwind theme extensions:

- **Color palette**: Warm earth tones — deep brown (`#3B2314`), gold (`#D4A843`), burnt orange (`#C45228`), ivory (`#F5F0E8`), muted green (`#4A6741`), dark charcoal (`#1A1A1A`)
- **Typography**: Google Fonts — *Outfit* (headings), *Inter* (body), *Noto Sans Ethiopic* (Amharic)
- **Texture**: Subtle grain/noise overlay for retro feel
- **Glassmorphism cards**: Semi-transparent with backdrop blur
- **Micro-animations**: Fade-in on scroll, hover scale, parallax hero

---

### 4. Internationalization (i18n)

#### [NEW] messages/en.json & messages/am.json

Translation keys for all static text (nav, buttons, hero copy, cast page headings, error messages, etc.)

#### [NEW] i18n/request.ts

`next-intl` server config — detect locale from cookie/header.

#### [NEW] app/[locale]/layout.tsx

Locale-aware root layout wrapping the `NextIntlClientProvider`.

---

### 5. Authentication

#### [NEW] lib/auth.ts

Better Auth server config with `emailAndPassword` plugin enabled, `prismaAdapter` for DB, and `nextCookies()` plugin for Next.js cookie handling.

#### [NEW] lib/auth-client.ts

Client-side auth instance using `createAuthClient` from `better-auth/react` — exposes `signIn.email()`, `signUp.email()`, `useSession()`, etc.

#### [NEW] app/api/auth/[...all]/route.ts

Catch-all route using `toNextJsHandler(auth)` to expose all Better Auth endpoints.

#### [NEW] app/[locale]/(auth)/login/page.tsx

Login page — form with email & password, link to register.

#### [NEW] app/[locale]/(auth)/register/page.tsx

Registration page — name, email, phone, password. Creates DB user with bcrypt hash.



---

### 6. Public Pages

#### [NEW] app/[locale]/(public)/page.tsx — Landing Page

Sections (top to bottom):
1. **Hero** — Full-bleed banner with series poster/trailer loop, title in Amharic & English, CTA button
2. **About the Series** — Synopsis, era context, genre tags
3. **Trailer** — Embedded video player (free to watch)
4. **Cast Carousel** — Horizontal scroll of cast cards → links to full cast page
5. **Episodes Preview** — Grid of episode thumbnails with lock icons for paid content
6. **Pricing / Subscribe CTA** — Tier cards → links to subscription page
7. **Footer** — Social links, legal, language toggle

#### [NEW] app/[locale]/(public)/cast/page.tsx — Cast Page

Grid of cast member cards with photo, name (bilingual), character name, short bio. Click to expand.

#### [NEW] app/[locale]/(public)/trailer/page.tsx — Trailer Page

Full-page cinematic trailer player with behind-the-scenes gallery below.

---

### 7. Subscription & Chapa Payment

#### [NEW] app/[locale]/(auth)/subscribe/page.tsx — Pricing Page

Tier cards:

| Plan | Price | Access |
|---|---|---|
| **Free** | 0 ETB | Trailer + first episode only |
| **Per Episode** | X ETB | Unlock individual episodes |
| **Full Season** | Y ETB | All episodes in the season |

#### [NEW] app/api/payment/initialize/route.ts

Server-side route that calls Chapa's `POST /v1/transaction/initialize`. Generates unique `tx_ref`, saves pending `Payment` record, returns checkout URL.

#### [NEW] app/api/payment/verify/route.ts

Called after user returns from Chapa checkout. Verifies via `GET /v1/transaction/verify/{tx_ref}`. On success, upgrades user's `Subscription` record.

#### [NEW] app/api/payment/webhook/route.ts

Chapa webhook listener. Validates signature, idempotently updates payment status, activates subscription. This ensures payment confirmation even if the user closes the browser.

---

### 8. Video Streaming & Player

#### [NEW] app/[locale]/(protected)/watch/[episodeId]/page.tsx

Subscription-gated episode player:
- Checks user's subscription against the episode's access requirements
- Generates a **signed, time-limited video URL** (JWT token with expiry + user ID)
- Renders a Video.js player with HLS support

#### [NEW] app/api/stream/[token]/route.ts

Validates the signed token, streams the video file using `ReadableStream` with range-request support (seeking). Returns appropriate `Content-Range` headers. **Never exposes the raw file path to the client**.

---

### 9. Content Protection (Layered)

| Layer | Implementation | Deters |
|---|---|---|
| **Signed URLs** | JWT-based, time-limited video tokens | IDM, wget, direct URL sharing |
| **Range-only streaming** | API route streams bytes; no direct file link | Download managers |
| **Referer / Origin check** | API route rejects requests not from our domain | Hotlinking, external fetchers |
| **CSP headers** | `Content-Security-Policy` restricting media sources | Embedding on other sites |
| **Disable right-click & dev-tools hints** | JS event listeners (contextmenu, keyboard shortcuts) | Casual users |
| **CSS overlay on video** | Transparent div over `<video>` to interfere with naive screen capture | Basic screen recorders |
| **Visibility API** | Pause playback when tab/window loses focus | Tab-based recording workflows |
| **Dynamic watermark** | User's email rendered as semi-transparent overlay on the player | Leak traceability |
| **EME / Encrypted Media Extensions** | If using a DRM-capable hosting provider (VdoCipher/Mux) | Professional rippers |

#### [NEW] lib/content-protection.ts

Utility functions: `generateVideoToken()`, `verifyVideoToken()`, `validateReferer()`.

#### [NEW] components/SecureVideoPlayer.tsx

Wraps Video.js with all client-side protections (overlay, right-click block, visibility pause, watermark).

#### [NEW] middleware.ts

Next.js middleware for:
- Auth-gating `/watch/*` routes (using Better Auth session check)
- Adding security headers globally
- Rate-limiting API routes (basic)

---

### 10. Shared Components

#### [NEW] components/Navbar.tsx
Top nav with logo, nav links, language toggle (🇬🇧/🇪🇹), auth buttons.

#### [NEW] components/Footer.tsx
Footer with links, copyright, social icons.

#### [NEW] components/EpisodeCard.tsx
Thumbnail, title, duration, lock/unlock badge.

#### [NEW] components/CastCard.tsx
Photo, bilingual name, role.

#### [NEW] components/PricingCard.tsx
Plan name, price, features list, CTA button.

#### [NEW] components/LanguageToggle.tsx
Switch between English ↔ Amharic, updates cookie/locale.

---

## File Structure (Summary)

```
app/
├── [locale]/
│   ├── (public)/
│   │   ├── page.tsx            # Landing page
│   │   ├── cast/page.tsx       # Cast page
│   │   └── trailer/page.tsx    # Trailer page
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── subscribe/page.tsx  # Pricing & checkout
│   ├── (protected)/
│   │   └── watch/[episodeId]/page.tsx
│   └── layout.tsx              # Locale-aware layout
├── api/
│   ├── auth/[...all]/route.ts
│   ├── payment/
│   │   ├── initialize/route.ts
│   │   ├── verify/route.ts
│   │   └── webhook/route.ts
│   └── stream/[token]/route.ts
components/
├── Navbar.tsx
├── Footer.tsx
├── SecureVideoPlayer.tsx
├── EpisodeCard.tsx
├── CastCard.tsx
├── PricingCard.tsx
└── LanguageToggle.tsx
lib/
├── auth.ts           # Better Auth server config
├── auth-client.ts    # Better Auth client instance
├── prisma.ts
├── content-protection.ts
└── chapa.ts
prisma/
└── schema.prisma
messages/
├── en.json
└── am.json
middleware.ts
```

---

## Verification Plan

### Automated (Dev Server)

1. **`npm run dev`** — Confirm the app compiles and loads at `http://localhost:3000`
2. **`npx prisma db push`** — Confirm schema applies cleanly to the database
3. **Browser test (via browser tool)**:
   - Navigate landing page → verify hero, cast carousel, trailer embed, pricing section render
   - Switch language toggle → verify Amharic text appears
   - Register a new user → verify redirect to login
   - Login → verify session, nav updates to show user name
   - Visit `/subscribe` → verify pricing cards render
   - Attempt `/watch/1` without subscription → verify redirect / access-denied
4. **Content protection test (via browser)**:
   - Right-click on video player → verify context menu is suppressed
   - Check video `<source>` tag → verify URL is a signed token, not a raw file path
   - Open Network tab → verify video requests include referer check
   - Copy video URL and open in new tab → verify token-expired / unauthorized

### Manual Verification (User)

1. **Chapa payment flow**: Since Chapa test mode requires valid phone numbers and their sandbox, the user should test with Chapa test credentials after providing their API keys. Steps:
   - Go to `/subscribe`, select a plan, click "Pay with Chapa"
   - Complete test payment on Chapa's hosted checkout
   - Return to app → verify subscription is active
   - Navigate to `/watch/1` → verify video plays
2. **Visual / theme review**: User visually inspects the 90s Ethiopia theme, color palette, Amharic typography, and overall design quality
3. **Content with real assets**: User provides series images, cast photos, trailer video, and episode video files, then verifies they display correctly
